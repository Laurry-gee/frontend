import { Currency } from '@ape.swap/sdk-core'
import { Flex, Modal, Svg } from 'components/uikit'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from 'theme-ui'
import { isAddress } from 'utils'
import List from './components/List'

const TokenListModal = ({
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases,
  showCurrencyAmount,
  disableNonToken,
}: {
  onDismiss: () => void
  onCurrencySelect: (currency: Currency) => void
  selectedCurrency?: Currency | null
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])
  return (
    <Modal title="Tokens" onDismiss={onDismiss} zIndex={110}>
      <Flex sx={{ position: 'relative', margin: '10px 5px' }}>
        <Input
          onChange={handleInput}
          sx={{
            background: 'white3',
            height: '45px',
            border: 'none',
            pl: '10px',
            borderRadius: '10px',
            ':focus': { outline: 'none' },
          }}
          placeholder="Name or Address"
        />
        <Flex sx={{ position: 'absolute', right: 5, justifyContent: 'center', height: '100%' }}>
          <Svg icon="search" />
        </Flex>
      </Flex>
      <Flex sx={{ maxWidth: '100%', width: '450px', maxHeight: '65vh', mb: '10px' }}>
        <List
          searchQuery={searchQuery}
          onCurrencySelect={onCurrencySelect}
          onDismiss={onDismiss}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
          showCurrencyAmount={showCurrencyAmount}
          disableNonToken={disableNonToken}
        />
      </Flex>
    </Modal>
  )
}

export default React.memo(TokenListModal)
