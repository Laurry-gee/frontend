import { useState } from 'react'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'
import { chunk } from 'lodash'

// Components
import { Flex, SwiperDots, Text } from 'components/uikit'
import ListCard from '../ListCard'

// Hooks
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'

// Utils
import { getDotPos } from 'utils/getDotPos'

// Types
import { FarmDTO } from 'utils/types/homepage'

interface FarmsListProps {
  farms: FarmDTO[]
}

const FarmsList = ({ farms }: FarmsListProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  const chunkedFarms = chunk(farms, 4)

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, 2)
    setActiveSlide(slideNumber)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const renderListCard = (item: FarmDTO, itemIndex: number): JSX.Element => {
    const { name, chainId, apr } = item
    const [firstToken, secondToken] = name.split('-')
    return (
      <ListCard
        key={`${name}${itemIndex}`}
        name={name}
        chainId={chainId}
        serviceTokenProps={{ token1: firstToken, token2: secondToken, token3: secondToken, stakeLp: true }}
        rightContent={
          <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
            <Text sx={{ opacity: '0.6', fontSize: ['10px', '10px', '12px'], fontWeight: 'light' }}>{t('APY')}</Text>
            <Box
              sx={{
                fontSize: ['12px', '12px', '16px'],
                fontWeight: 'bold',
                color: 'success',
              }}
            >
              {apr}%
            </Box>
          </Flex>
        }
      />
    )
  }

  const slides = chunkedFarms.map((chunk, index) => (
    <Grid key={index} sx={{ width: '100%' }} columns="1fr">
      {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
    </Grid>
  ))

  return (
    <>
      {/* Mobile view starts */}
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: ['flex', 'flex', 'none'],
          mt: '30px',
        }}
      >
        <Swiper
          id="farmsListSwiper"
          onSwiper={setSwiper}
          slidesPerView="auto"
          centeredSlides
          lazy
          preloadImages={false}
          onSlideChange={handleSlide}
          style={{ width: '100%' }}
        >
          {slides.map((slide, index) => {
            return (
              <SwiperSlide
                style={{
                  width: '100%',
                  padding: '1px',
                  height: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                key={index}
              >
                {slide}
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Flex
          sx={{
            position: 'relative',
            width: '95vw',
            maxWidth: '1412px',
            justifyContent: ['center', 'center', 'center', 'flex-start'],
          }}
        >
          <Flex sx={{ mt: '50px' }}>
            {[...Array(slides.length)].map((_, i) => {
              return <SwiperDots isActive={i === activeSlide} onClick={() => slideTo(i)} key={i} />
            })}
          </Flex>
        </Flex>
      </Flex>
      {/* Desktop view starts */}
      <Grid
        columns="1fr 1fr"
        sx={{
          gridGap: '10px',
          mt: '70px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {chunkedFarms.map((chunk, index) => (
          <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
            {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
          </Flex>
        ))}
      </Grid>
    </>
  )
}

export default FarmsList
