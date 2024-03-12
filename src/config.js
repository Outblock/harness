import * as fcl from "@onflow/fcl"
import {send as httpSend} from "@onflow/transport-http"

fcl.config()
  .put("flow.network", "testnet")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  // .put("flow.network", "mainnet")
  // .put("accessNode.api", "https://rest-mainnet.onflow.org")
  .put("sdk.transport", httpSend)
  .put("env", "testnet")
  .put("app.detail.title", "Random dApp on Flow")
  .put("app.detail.icon", "https://i1.sndcdn.com/avatars-000216424319-pvx44j-t500x500.jpg")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")


// fcl.config()
//   .put("accessNode.api", "https://rest-mainnet.onflow.org")
//   .put("sdk.transport", httpSend)
//   .put("env", "mainnet")
//   .put("discovery.wallet.method", "EXT/RPC")
//   .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

