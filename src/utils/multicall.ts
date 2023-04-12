import { Interface } from '@ethersproject/abi'
import multicallV2Abi from 'config/abi/multicallv2.json'
import { ethers } from 'ethers'
import { chunk, flatten } from 'lodash'
import { RPC_URLS } from 'config/constants/networks'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { MULTICALL_V2 } from 'config/constants/addresses'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

// This is the legacy multicall
// Try to use multicall hooks
const multicall = async (chainId: number, abi: any[], calls: Call[], batch?: boolean, batchSize?: number) => {
  console.log(calls)
  const multicallAddress = MULTICALL_V2[chainId]
  const provider = new ethers.providers.JsonRpcProvider(RPC_URLS[chainId as SupportedChainId][0], chainId)
  const multi = new ethers.Contract(multicallAddress, multicallV2Abi, provider)
  console.log(multi)
  const itf = new Interface(abi)
  console.log(itf)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  if (batch) {
    const chunkedCalls = chunk(calldata, batchSize)
    const chunkedCallNames = chunk(calls, batchSize)
    const chunkedData = chunkedCalls.flatMap(async (chunkedCallSet, i) => {
      const { returnData } = await multi.aggregate(chunkedCallSet)
      return returnData.map((call: any, j: number) => itf.decodeFunctionResult(chunkedCallNames[i][j].name, call))
    })
    const resolveCall = await Promise.all(chunkedData)
    const flattenCalls = flatten(resolveCall)
    return flattenCalls
  } else {
    const { returnData } = await multi.aggregate(calldata)
    console.log(returnData)
    console.log(returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call)))
    return returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))
  }
}

export default multicall
