import {reauthenticate, config} from "@onflow/fcl"

export const LABEL = "Log In with Passkey"
export const CMD = async() => {

  config()
  .put("discovery.wallet.method", "POP/RPC")
  .put("discovery.wallet", "https://passkey.lilico.dev")
  
  await reauthenticate()
} 
