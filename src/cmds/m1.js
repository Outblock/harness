import {mutate} from "@onflow/fcl"
import {yup, nope} from "../util"

export const LABEL = "Mutate 1 (no args)"
export const CMD = async () => {
  // prettier-ignore
  return mutate({
    cadence: `
    import FungibleToken from 0xa0225e7000ac82a9
    import FlowToken from 0x4445e7ad11568276
    import EVM from 0xb6763b4399a888c8
    
    transaction() {
        let auth: auth(IssueStorageCapabilityController, IssueStorageCapabilityController, PublishCapability, SaveValue, UnpublishCapability) &Account
    
        prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue, UnpublishCapability) &Account) {
            let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
                    from: /storage/flowTokenVault
                ) ?? panic("Could not borrow reference to the owner's Vault!")
    
            self.auth = signer
        }
    
        execute {
            let coa <- EVM.createCadenceOwnedAccount()
            let storagePath = StoragePath(identifier: "evm")!
            let publicPath = PublicPath(identifier: "evm")!
            self.auth.storage.save<@EVM.CadenceOwnedAccount>(<-coa, to: storagePath)
            let addressableCap = self.auth.capabilities.storage.issue<&EVM.CadenceOwnedAccount>(storagePath)
            self.auth.capabilities.unpublish(publicPath)
            self.auth.capabilities.publish(addressableCap, at: publicPath)
        }
    }
    `,
    limit: 50,
  }).then(yup("M-1"))
    .catch(nope("M-1"))
}
