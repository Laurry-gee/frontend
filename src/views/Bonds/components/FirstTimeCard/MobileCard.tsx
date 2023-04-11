/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import {
  BillDiagramContainer,
  BillGifContainer,
  DescriptionContainer,
  FirstTimeCardContainer,
} from '../UserBillsView/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'contexts/Localization'
import { Flex, Svg, Text } from 'components/uikit'
import BillsDiagram from 'components/MarketingModals/Bills/BillsDiagram'
import Image from 'next/image'

const MobileCard = () => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()
  return (
    <FirstTimeCardContainer onClick={() => setExpanded(!expanded)}>
      <BillGifContainer>
        <Image
          src="/images/bills/bill-nfts.gif"
          alt="bill-img"
          width={800}
          height={800}
          sx={{ width: '100%', height: 'auto' }}
        />{' '}
      </BillGifContainer>
      <DescriptionContainer>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text fontSize="22px" bold sx={{ margin: '0 0 5px 10px' }}>
            {t('Tips for buying bonds')}
          </Text>
          <span style={{ marginRight: '10px', transform: 'translate(0, -3px)' }}>
            <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
          </span>
        </Flex>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'fit-content' }}
              transition={{ opacity: { duration: 0.2 } }}
              exit={{ opacity: 0, height: 0 }}
              sx={{ position: 'relative', overflow: 'hidden' }}
            >
              <BillDiagramContainer>
                <BillsDiagram />
              </BillDiagramContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default MobileCard
