import * as fcl from "@onflow/fcl"
import {send as httpSend} from "@onflow/transport-http"

fcl.config()
  // .put("flow.network", "mainnet")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("flow.network", "testnet")
  // .put("flow.network", "mainnet")
  // .put("accessNode.api", "https://rest-mainnet.onflow.org")
  .put("sdk.transport", httpSend)
  .put("env", "testnet")
  .put("discovery.wallet.method", "IFRAME/RPC")
  .put("app.detail.title", "Random dApp on Flow")
  .put("app.detail.icon", "https://i1.sndcdn.com/avatars-000216424319-pvx44j-t500x500.jpg")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/mainnet/authn")
  .put('app.detail.description', 'A test harness for FCL')
  .put('app.detail.url', 'https://outblock.github.io/harness/')
  .put('walletconnect.projectId', 'c284f5a3346da817aeca9a4e6bc7f935')
  // .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")


// fcl.config()
//   .put("accessNode.api", "https://rest-mainnet.onflow.org")
//   .put("sdk.transport", httpSend)
//   .put("env", "mainnet")
//   .put("discovery.wallet.method", "EXT/RPC")
//   .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")