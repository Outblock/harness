import * as fcl from "@onflow/fcl"
import { yup, nope, serviceOfType } from "../util"

export const LABEL = "Log In with Passkey"
export const CMD = async() => {

  fcl.config()
  .put("discovery.wallet.method", "POP/RPC")
  // .put("discovery.wallet", "http://localhost:3000")
  .put("discovery.wallet", "https://testnet.passkey.lilico.dev")

  console.log("Log In with Passkey")

  await fcl
  .reauthenticate()
  .then(yup("US-1"))
  .then(res => res)
  .catch(nope("US-1"))
}
