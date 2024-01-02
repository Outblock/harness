import * as fcl from "@onflow/fcl"
import {send as httpSend} from "@onflow/transport-http"

fcl.config()
  .put("flow.network", "testnet")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("sdk.transport", httpSend)
  .put("env", "testnet")
  .put("app.detail.title", "Lilico Test App")
  .put("app.detail.icon", "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F19285956-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCqw72ZIu4wNI7q40hHbt%252Ficon%252FbEL3Raa81lKMLOk4d1cu%252Flogo.png%3Falt%3Dmedia%26token%3D21ed7b3a-44e0-4f9a-9d76-0a7c9f20d669")
  // .put("discovery.wallet.method", "EXT/RPC")
  // .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  .put("discovery.wallet", "https://fcl-discovery-git-add-fcw-onflow.vercel.app/")


// fcl.config()
//   .put("accessNode.api", "https://rest-mainnet.onflow.org")
//   .put("sdk.transport", httpSend)
//   .put("env", "mainnet")
//   .put("discovery.wallet.method", "EXT/RPC")
//   .put("discovery.wallet", "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

