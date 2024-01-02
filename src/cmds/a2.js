import {mutate, sansPrefix, withPrefix, currentUser} from "@onflow/fcl"
import {yup, nope} from "../util"
import { ec as EC } from "elliptic";
import { Buffer } from "buffer";
import { sha256 } from '@noble/hashes/sha256'; 
const ec = new EC("p256");

const signWithKey = (privateKey, msg) => {
    const key = ec.keyFromPrivate(Buffer.from(privateKey, "hex"));
    const messageHash = sha256(
      Buffer.from(msg, "hex")
    );
    const sig = key.sign(messageHash);
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
};

const keyPair = () => {
    const pk = localStorage.getItem("pk");
    if (!pk) {
        var key = ec.genKeyPair();
        localStorage.setItem("pk", key.getPrivate().toString('hex'));
        return key
    }
    return ec.keyFromPrivate(Buffer.from(pk, "hex"));
}

const dAppAuthz = async (account) => {
    const address = '0xc6de0d94160377cd'
    const keyIndex = 0
    const pk = 'c9c0f04adddf7674d265c395de300a65a777d3ec412bba5bfdfd12cffbbb78d9';

    return {
        ...account,
        tempId: `${address}-${keyIndex}`,
        addr: sansPrefix(address),
        keyId: keyIndex,
        signingFunction: (signable) => {
            return {
                addr: withPrefix(address),
                keyId: keyIndex,
                signature: signWithKey(pk, signable.message),
                };
            },
    }
  };

const kp = keyPair()
console.log("keyPair ->", kp);
const pubk = kp.getPublic()
const pubkHex = pubk.getX().toString('hex') + pubk.getY().toString('hex')
console.log("privateKey ->", kp.getPrivate().toString('hex'));
console.log("publicKey ->", pubkHex);

export const LABEL = "Publish Child Account"
export const CMD = async () => {
  // prettier-ignore
  return mutate({
    cadence: `
    #allowAccountLinking

    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868
    import MetadataViews from 0x631e88ae7f1d7c20

    import HybridCustody from 0x294e44e1ec6993c6
    import CapabilityFactory from 0x294e44e1ec6993c6
    import CapabilityDelegator from 0x294e44e1ec6993c6
    import CapabilityFilter from 0x294e44e1ec6993c6

    transaction(
        pubKey: String,
        initialFundingAmt: UFix64,
        factoryAddress: Address,
        filterAddress: Address,
        name: String, 
        desc: String, 
        thumbnailURL: String
    ) {
        prepare(parent: AuthAccount, app: AuthAccount) {
            /* --- Account Creation --- */
            //
            // Create the child account, funding via the signing app account
            let newAccount = AuthAccount(payer: app)
            // Create a public key for the child account from string value in the provided arg
            // **NOTE:** You may want to specify a different signature algo for your use case
            let key = PublicKey(
                publicKey: pubKey.decodeHex(),
                signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
            )
            // Add the key to the new account
            // **NOTE:** You may want to specify a different hash algo & weight best for your use case
            newAccount.keys.add(
                publicKey: key,
                hashAlgorithm: HashAlgorithm.SHA3_256,
                weight: 1000.0
            )
    
            /* --- (Optional) Additional Account Funding --- */
            //
            // Fund the new account if specified
            if initialFundingAmt > 0.0 {
                // Get a vault to fund the new account
                let fundingProvider = app.borrow<&FlowToken.Vault{FungibleToken.Provider}>(
                        from: /storage/flowTokenVault
                    )!
                // Fund the new account with the initialFundingAmount specified
                newAccount.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
                    .borrow()!
                    .deposit(
                        from: <-fundingProvider.withdraw(
                            amount: initialFundingAmt
                        )
                    )
            }
    
            /* Continue with use case specific setup */
            //
            // At this point, the newAccount can further be configured as suitable for
            // use in your dapp (e.g. Setup a Collection, Mint NFT, Configure Vault, etc.)
            // ...
    
            /* --- Link the AuthAccount Capability --- */
            //
            var acctCap = newAccount.linkAccount(HybridCustody.LinkedAccountPrivatePath)
                ?? panic("problem linking account Capability for new account")
    
            // Create a OwnedAccount & link Capabilities
            let ownedAccount <- HybridCustody.createOwnedAccount(acct: acctCap)
            newAccount.save(<-ownedAccount, to: HybridCustody.OwnedAccountStoragePath)
            newAccount
                .link<&HybridCustody.OwnedAccount{HybridCustody.BorrowableAccount, HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(
                    HybridCustody.OwnedAccountPrivatePath,
                    target: HybridCustody.OwnedAccountStoragePath
                )
            newAccount
                .link<&HybridCustody.OwnedAccount{HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(
                    HybridCustody.OwnedAccountPublicPath, 
                    target: HybridCustody.OwnedAccountStoragePath
                )
    
            // Get a reference to the OwnedAccount resource
            let owned = newAccount.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath)!

            // Set metadata
            let thumbnail = MetadataViews.HTTPFile(url: thumbnailURL)
            let display = MetadataViews.Display(name: name, description: desc, thumbnail: thumbnail)
            owned.setDisplay(display)
    
            // Get the CapabilityFactory.Manager Capability
            let factory = getAccount(factoryAddress)
                .getCapability<&CapabilityFactory.Manager{CapabilityFactory.Getter}>(
                    CapabilityFactory.PublicPath
                )
            assert(factory.check(), message: "factory address is not configured properly")
    
            // Get the CapabilityFilter.Filter Capability
            let filter = getAccount(filterAddress).getCapability<&{CapabilityFilter.Filter}>(CapabilityFilter.PublicPath)
            assert(filter.check(), message: "capability filter is not configured properly")
    
            // Configure access for the delegatee parent account
            owned.publishToParent(parentAddress: parent.address, factory: factory, filter: filter)
    
            /* --- Add delegation to parent account --- */
            //
            // Configure HybridCustody.Manager if needed
            if parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath) == nil {
                let m <- HybridCustody.createManager(filter: filter)
                parent.save(<- m, to: HybridCustody.ManagerStoragePath)
            }
    
            // Link Capabilities
            parent.unlink(HybridCustody.ManagerPublicPath)
            parent.unlink(HybridCustody.ManagerPrivatePath)
            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPrivate, HybridCustody.ManagerPublic}>(
                HybridCustody.ManagerPrivatePath,
                target: HybridCustody.ManagerStoragePath
            )
            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPublic}>(
                HybridCustody.ManagerPublicPath,
                target: HybridCustody.ManagerStoragePath
            )
            
            // Claim the ChildAccount Capability
            let inboxName = HybridCustody.getChildAccountIdentifier(parent.address)
            let cap = parent
                .inbox
                .claim<&HybridCustody.ChildAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>(
                    inboxName,
                    provider: newAccount.address
                ) ?? panic("child account cap not found")
            
            // Get a reference to the Manager and add the account
            let managerRef = parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
                ?? panic("manager no found")
            managerRef.addAccount(cap: cap)

            // managerRef.setChildAccountDisplay(address: newAccount.address, display)
        }
    }
    `,
    args: (arg, t) => [
        arg("f524f06419c71dffa40919221c2c39979b1691536abc44a096ee3d4b16729743184000ebc95dfe63e9ada762468d23ee3e4e8035812c60999982116b167ff5cc", t.String),
        arg("0.0", t.UFix64),
        arg("0x4b69a89e2b97c93a", t.Address),
        arg("0x998a57a4aacdaff4", t.Address),
        arg("Lilico Test Account", t.String),
        arg("Lilico Test Description", t.String),
        arg("https://image.pbs.org/video-assets/pbs/nature/243518/images/mezzanine_904.jpg?crop=384x215&?format=jpg", t.String),
    ],
    authorizations: [currentUser, dAppAuthz],
    limit: 9999,
  }).then(yup("M-1"))
    .catch(nope("M-1"))
}
