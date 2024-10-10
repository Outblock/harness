import * as fcl from "@onflow/fcl"
import { yup, nope, serviceOfType } from "../util"

const resolver = async () => ({
  appIdentifier: "Awesome App (v0.0)",
  nonce: "3037366134636339643564623330316636626239323161663465346131393662",
})

export const LABEL = "Log In with Account Proof"
export const CMD = async() => {

  fcl.config()
  // .put("discovery.wallet.method", "POP/RPC")
  // .put("discovery.wallet", "http://localhost:3000")
  .put("fcl.accountProof.resolver", resolver)
  // .put("discovery.wallet", "https://testnet.passkey.lilico.dev")
    .put("discovery.wallet.method", "EXT/RPC")
  .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")

  let res = await fcl
  .reauthenticate()
  .then(yup("US-1"))
  .then(res => res)
  .catch(nope("US-1"))

  const accountProofService = serviceOfType(res.services, "account-proof")
  if (accountProofService) {
    const fclCryptoContract =
      (await fcl.config.first(["env", "flow.network"])) === "local"
        ? process.env.NEXT_PUBLIC_FCL_CRYPTO_CONTRACT
        : null

    const verified = await fcl.AppUtils.verifyAccountProof(
      "Awesome App (v0.0)",
      accountProofService.data,
      { fclCryptoContract: '0x74daa6f9c7ef24b1' }
    )

    // testnet: "0x74daa6f9c7ef24b1",
    // mainnet: "0xb4b82a1c9d21d284",
    // previewnet: "0x40b5b8b2ce81ea4a
    
    console.log("verified client:", verified)

    // const res = await fetch("/api/verify", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(accountProofService.data),
    // })

    // const verified = await fcl.AppUtils.verifyAccountProof(APP_IDENTIFIER, body, {
    //   fclCryptoContract,
    // })
    // console.log("verified server:", await res.json())
  }
  return res
} 
