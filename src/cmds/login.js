import {reauthenticate, config} from "@onflow/fcl"

export const LABEL = "Log In"
export const CMD = async () => {

    config()
    .put("discovery.wallet.method", "IFRAME/RPC")
    // .put("discovery.wallet.method", "IFRAME/RPC")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
    // .delete("discovery.wallet.method")
    // .put("discovery.wallet", "https://fcl-discovery-git-add-fcw-onflow.vercel.app")

    reauthenticate()
}
