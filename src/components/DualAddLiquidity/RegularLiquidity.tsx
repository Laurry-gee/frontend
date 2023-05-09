import React, { useCallback, useEffect, useState } from 'react'
import { Field, resetMintState } from 'state/mint/v2/actions'
import AddLiquiditySign from 'views/V2/AddLiquidityV2/components/AddLiquiditySign'
import PoolInfo from 'views/V2/AddLiquidityV2/components/PoolInfo'
import AddLiquidityActions from 'views/V2/AddLiquidityV2/components/Actions'
import { useSwapState } from 'state/swap/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/v2/hooks'
import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { Flex, Text } from 'components/uikit'
import DexPanel from 'components/DexPanel'

interface RegularLiquidityProps {
  currencyIdA?: string
  currencyIdB?: string
  handleCurrenciesURL?: (Field: any, Currency: Currency, otherCurrency: string) => void
}

const RegularLiquidity: React.FC<RegularLiquidityProps> = ({ currencyIdA, currencyIdB, handleCurrenciesURL }) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const { INPUT, OUTPUT } = useSwapState()

  // Set either param currency or swap currency
  const setCurrencyIdA = (currencyIdA || INPUT.currencyId) ?? ''
  const setCurrencyIdB = (currencyIdB || OUTPUT.currencyId) ?? ''

  // Set currencies
  const [currencyA, setCurrencyA] = useState(useCurrency(setCurrencyIdA))
  const [currencyB, setCurrencyB] = useState(useCurrency(setCurrencyIdB))

  // Handle currency selection
  const handleCurrencySelect = useCallback(
    (field: Field, currency: Currency) => {
      const newCurrencyId = currency
      if (handleCurrenciesURL) {
        if (field === Field.CURRENCY_A) {
          handleCurrenciesURL(field, currency, setCurrencyIdB)
        } else {
          handleCurrenciesURL(field, currency, setCurrencyIdA)
        }
      }
      if (field === Field.CURRENCY_A) {
        setCurrencyA(newCurrencyId)
      }
      if (field === Field.CURRENCY_B) {
        setCurrencyB(newCurrencyId)
      }
    },
    [setCurrencyIdA, setCurrencyIdB, handleCurrenciesURL],
  )

  // Check to reset mint state
  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Token> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        {noLiquidity && (
          <Flex sx={{ ...styles.warningMessageContainer }}>
            <Text size="14px" weight={700} mb="10px" color="primaryBright">
              {t('You are the first liquidity provider.')}
            </Text>
            <Text size="12px" weight={500} color="primaryBright" sx={{ textAlign: 'center' }}>
              {t(
                'The ratio of tokens you add will set the price of this pool. Once you are happy with the rate click supply to review.',
              )}
            </Text>
          </Flex>
        )}
        <Flex sx={{ marginTop: '30px' }}>
          <DexPanel
            value={formattedAmounts[Field.CURRENCY_A]}
            panelText="Token 1"
            currency={currencyA}
            otherCurrency={currencyB}
            fieldType={Field.CURRENCY_A}
            onCurrencySelect={(cur: Currency) => handleCurrencySelect(Field.CURRENCY_A, cur)}
            onUserInput={onFieldAInput}
            handleMaxInput={() => {
              onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
            }}
            showCommonBases
          />
        </Flex>
        <AddLiquiditySign />
        <DexPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          panelText="Token 2"
          currency={currencyB}
          otherCurrency={currencyA}
          fieldType={Field.CURRENCY_B}
          onCurrencySelect={(cur: Currency) => handleCurrencySelect(Field.CURRENCY_B, cur)}
          onUserInput={onFieldBInput}
          handleMaxInput={() => {
            onFieldAInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
          showCommonBases
        />
        <PoolInfo
          currencies={currencies}
          poolTokenPercentage={poolTokenPercentage}
          noLiquidity={noLiquidity}
          price={price}
          chainId={chainId}
          liquidityMinted={liquidityMinted}
        />
        <AddLiquidityActions
          currencies={currencies}
          error={error}
          parsedAmounts={parsedAmounts}
          noLiquidity={noLiquidity}
          liquidityMinted={liquidityMinted}
          poolTokenPercentage={poolTokenPercentage}
          price={price}
        />
      </Flex>
    </div>
  )
}

export default React.memo(RegularLiquidity)
