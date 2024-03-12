import * as fcl from "@onflow/fcl"
import { yup, nope, serviceOfType } from "../util"

export const LABEL = "Log In with Flow Wallet Extension"
export const CMD = async() => {

  fcl.config()
  .put("discovery.wallet.method", "EXT/RPC")
  .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")

  await fcl
  .reauthenticate()
  .then(yup("US-1"))
  .then(res => res)
  .catch(nope("US-1"))
} 
