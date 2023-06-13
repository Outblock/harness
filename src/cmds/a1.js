import {mutate} from "@onflow/fcl"
import {yup, nope} from "../util"

export const LABEL = "Setup Account Metadata"
export const CMD = async () => {
  // prettier-ignore
  return mutate({
    cadence: `
    #allowAccountLinking

    import HybridCustody from 0x96b15ff6dfde11fe
    import CapabilityFactory from 0x96b15ff6dfde11fe
    import CapabilityProxy from 0x96b15ff6dfde11fe
    import CapabilityFilter from 0x96b15ff6dfde11fe
    import MetadataViews from 0x631e88ae7f1d7c20

    transaction(name: String, desc: String, thumbnailURL: String) {
        prepare(acct: AuthAccount) {
            var acctCap = acct.getCapability<&AuthAccount>(HybridCustody.LinkedAccountPrivatePath)
            if !acctCap.check() {
                acctCap = acct.linkAccount(HybridCustody.LinkedAccountPrivatePath)!
            }

            if acct.borrow<&HybridCustody.ChildAccount>(from: HybridCustody.ChildStoragePath) == nil {
                let ChildAccount <- HybridCustody.createChildAccount(acct: acctCap)
                acct.save(<-ChildAccount, to: HybridCustody.ChildStoragePath)
            }

            // check that paths are all configured properly
            acct.unlink(HybridCustody.ChildPrivatePath)
            acct.link<&HybridCustody.ChildAccount{HybridCustody.BorrowableAccount, HybridCustody.ChildAccountPublic, HybridCustody.ChildAccountPrivate}>(HybridCustody.ChildPrivatePath, target: HybridCustody.ChildStoragePath)

            acct.unlink(HybridCustody.ChildPublicPath)
            acct.link<&HybridCustody.ChildAccount{HybridCustody.ChildAccountPublic}>(HybridCustody.ChildPublicPath, target: HybridCustody.ChildStoragePath)

            let child = acct.borrow<&HybridCustody.ChildAccount>(from: HybridCustody.ChildStoragePath)!

            let thumbnail = MetadataViews.HTTPFile(url: thumbnailURL)
            let display = MetadataViews.Display(name: name, description: desc, thumbnail: thumbnail)
            child.setDisplay(display)
        }
    }
    `,
    args: (arg, t) => [
        arg("Lilico Test Account", t.String),
        arg("Lilico Test Description", t.String),
        arg("https://image.pbs.org/video-assets/pbs/nature/243518/images/mezzanine_904.jpg?crop=384x215&?format=jpg", t.String),
      ],
    limit: 1000,
  }).then(yup("M-1"))
    .catch(nope("M-1"))
}
