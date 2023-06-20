import { Currency, CurrencyAmount, Percent, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { ZAP_ADDRESS } from '@ape.swap/v2-zap-sdk'
import { ZAP_ADDRESS as ZAP_V2_ADDRESS } from '@ape.swap/zap-tx-builder'
import { ChainId } from '@ape.swap/zap-tx-builder/dist/src/constants'
import { useWeb3React } from '@web3-react/core'
import { useApproval } from 'lib/hooks/useApproval'

// wraps useApproveCallback in the context of a swap
export default function useZapApproval(
  zap: any,
  allowedSlippage: Percent,
  useIsPendingApproval: (token?: Token, spender?: string) => boolean,
) {
  const { chainId } = useWeb3React()

  const inAmount = zap?.currencyIn?.currency
    ? CurrencyAmount.fromRawAmount(zap?.currencyIn?.currency, zap?.currencyIn?.inputAmount)
    : undefined

  // TODO: Fix supported chain id
  let spender
  if (zap.zapV2) {
    spender = chainId ? ZAP_V2_ADDRESS[chainId as ChainId] : undefined
  } else {
    spender = chainId ? ZAP_ADDRESS[chainId as SupportedChainId] : undefined
  }

  return useApproval(inAmount, spender, useIsPendingApproval)
}
