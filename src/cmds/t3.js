import {tx} from "@onflow/fcl"
import {yup, nope} from "../util"

export const LABEL = "Get TX"
export const CMD = async () => {
  // prettier-ignore
  const txId = "8b6c54f959a38c57be020bbb34ba620da4730321f6501a6d845dffa7a09496fd"
  return await tx(txId)
  .onceExecuted()
  .then(yup("T-3"))
  .catch(nope("Q-1"))
}