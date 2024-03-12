import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

window.addEventListener("FLOW::TX", d => {
  console.log("FLOW::TX", d.detail.delta, d.detail.txId)
  fcl.config()
  // .put("flow.network", "testnet")
  // .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("flow.network", "mainnet")
  .put("accessNode.api", "https://rest-mainnet.onflow.org")
  fcl
    .tx(d.detail.txId)
    .subscribe(txStatus => console.log("TX:STATUS", d.detail.txId, txStatus))
})

window.addEventListener("message", d => {
  console.log("Harness Message Received", d.data)
})
