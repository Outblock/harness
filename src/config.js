import * as fcl from "@onflow/fcl"
import {send as httpSend} from "@onflow/transport-http"

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("sdk.transport", httpSend)
  .put("env", "testnet")
  .put("discovery.wallet.method", "EXT/RPC")
  .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")


// fcl.config()
//   .put("accessNode.api", "https://rest-mainnet.onflow.org")
//   .put("sdk.transport", httpSend)
//   .put("env", "mainnet")
//   .put("discovery.wallet.method", "EXT/RPC")
//   .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

