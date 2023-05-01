import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'
import ConvertCard from './components/ConvertCard'
import ReturnCard from './components/ReturnCard'
import {
  PaddedCard,
  TopCon,
  CenterCard,
  OuterContent,
  OuterContentText,
  InnerContent,
  InnerContentText,
  Cards,
  ReadMore,
  WarningHeader,
} from './styles'
import SwiperProvider from '../../contexts/SwiperProvider'
import { Flex } from 'components/uikit'
import dynamic from 'next/dynamic'

const GnanaUtility = dynamic(() => import('./components/GnanaUtility/GnanaUtility'), {
  ssr: false,
})

const Zone = () => {
  const [readingMore, setReadingMore] = useState(false)
  const { t } = useTranslation()

  const toggleReadMore = () => {
    setReadingMore(!readingMore)
  }

  return (
    <Flex sx={{ flexDirection: 'column', margin: '30px 0px' }}>
      <Banner
        banner="gnana"
        link="?modal=tutorial"
        title={t('Golden Banana')}
        margin="0px 0px 20px 0px"
        maxWidth={1130}
      />
      <PaddedCard>
        <TopCon>
          <CenterCard>
            <WarningHeader as="h1">{t('HEADS UP, APES!')}</WarningHeader>
            {!readingMore && <ReadMore onClick={toggleReadMore}>{t('Read More')}</ReadMore>}

            <InnerContent readingMore={readingMore}>
              <InnerContentText>
                {t(
                  'Converting from BANANA to GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30% per conversion. For every 1 BANANA you convert, you will receive 0.7 GNANA.',
                )}
              </InnerContentText>
            </InnerContent>
          </CenterCard>
        </TopCon>

        <OuterContent readingMore={readingMore}>
          <OuterContentText>
            {t(
              'Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA',
            )}
          </OuterContentText>
        </OuterContent>
      </PaddedCard>

      <Cards id="convert">
        <ConvertCard fromToken="BANANA" toToken="GNANA" />
        <ReturnCard fromToken="GNANA" toToken="BANANA" />
      </Cards>

      <SwiperProvider>
        <GnanaUtility />
      </SwiperProvider>
      <GnanaDisclaimers />
    </Flex>
  )
}
export default React.memo(Zone)
