import { useState, useEffect, useCallback } from 'react'

// components
import Image from 'next/image'
import { Text, Modal, Input } from 'components/uikit'
import { Flex, Box, Button, Link, useThemeUI } from 'theme-ui'
import { Svg } from 'components/uikit'
import { icons } from 'components/uikit/Svg/types'

// hooks and actions
import useDebounce from 'hooks/useDebounce'
import { useSetLhdAuth } from 'state/lhd/hooks'
import { fetchIsPasswordVerified } from 'state/lhd/actions'

const SOCIAL_LINKS: { icon: icons; href: string }[] = [
  { icon: icons.TWITTER, href: 'https://twitter.com/ape_swap' },
  { icon: icons.TELEGRAM, href: 'https://t.me/ape_swap' },
  { icon: icons.DISCORD, href: 'https://apeswap.click/discord' },
]

const LHDModal = ({ isLhdAuthModalOpen }: { isLhdAuthModalOpen: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isLhdAuthModalOpen)
  const [password, setPassword] = useState<string>('')
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const { setLhdAuth } = useSetLhdAuth()
  const debouncedPassword = useDebounce(password, 1000)
  const { colorMode } = useThemeUI()

  const passwordStatus =
    !password.length || isLoading || isTyping ? 'default' : isPasswordVerified ? 'success' : 'error'

  const getLiquidityIcon = (): string => {
    switch (passwordStatus) {
      case 'error':
        return '/images/lhd/liquidity-red.svg'
      case 'success':
        return '/images/lhd/liquidity-green.svg'
      default:
        return colorMode === 'dark' ? '/images/lhd/liquidity-white.svg' : '/images/lhd/liquidity-gray.svg'
    }
  }

  const handleVerifyPassword = useCallback(async (): Promise<void> => {
    const isPasswordVerified = await fetchIsPasswordVerified(debouncedPassword)
    setIsPasswordVerified(!!isPasswordVerified)
    setIsLoading(false)
  }, [debouncedPassword])

  useEffect(() => {
    setIsTyping(false)
    if (debouncedPassword.length > 0) {
      setIsLoading(true)
      handleVerifyPassword()
    }
  }, [debouncedPassword, handleVerifyPassword])

  useEffect(() => {
    setIsModalOpen(isLhdAuthModalOpen)
  }, [isLhdAuthModalOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const password = e.target.value
    setPassword(password)
    setIsTyping(true)
  }

  const handleSubmit = (): void => {
    setLhdAuth(isPasswordVerified)
    setIsModalOpen(false)
  }

  return (
    <Modal
      open={isModalOpen}
      backdrop={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(5px)' }}
      sx={{ height: ['100%', '100%', '515px'], width: ['100%', '100%', '841px'], fontWeight: 'light' }}
    >
      <Flex
        sx={{
          height: '100%',
          flexDirection: ['column', 'column', 'row-reverse'],
          gap: ['20px', '20px', '20px'],
        }}
      >
        <Box
          sx={{
            height: ['30%', '30%', '100%'],
            width: ['100%', '100%', '60%'],
            borderRadius: '25px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image src="/images/lhd/ape-pool.png" alt="ape-pool" fill sx={{ objectFit: 'cover' }} />
        </Box>
        <Flex sx={{ width: 'auto', flex: 1, flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <Box sx={{ px: '10px' }}>
            <Flex
              sx={{
                flexDirection: ['row', 'row', 'column'],
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: ['0', '0', '20px'],
              }}
            >
              <Box sx={{ width: ['32px', '32px', '53px'], height: ['46px', '46px', '76px'], position: 'relative' }}>
                <Image src={getLiquidityIcon()} alt="liquidity-icon" fill />
              </Box>
              <Text
                weight="bold"
                sx={{
                  fontSize: ['21px', '21px', '28px'],
                  textAlign: 'center',
                  lineHeight: ['25px', '25px', '34px'],
                }}
              >
                Liquidity Health Dashboard
              </Text>
            </Flex>
            <Box sx={{ textAlign: 'center', marginTop: ['10px', '10px', '15px'] }}>
              <Text sx={{ fontSize: ['12px', '12px'], lineHeight: '15px' }}>
                ApeSwap’s data visualization tool provides insights into the liquidity levels and sustainability of
                cryptocurrency projects.
              </Text>
            </Box>
          </Box>
          <Flex sx={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Input
              onChange={handleChange}
              placeholder="Password"
              value={password}
              variant="password"
              status={passwordStatus}
              isLoading={isLoading}
              sx={{ padding: '5px 10px', fontSize: '12px' }}
            />
            <Button sx={{ padding: '5px 10px' }} onClick={handleSubmit} disabled={!isPasswordVerified}>
              ACCESS BETA
            </Button>
          </Flex>
          <Text sx={{ fontStyle: 'italic', fontSize: '12px' }}>Check our socials to find a password</Text>
          <Flex sx={{ gap: '20px' }}>
            {SOCIAL_LINKS.map(({ icon, href }) => {
              return (
                <Link
                  sx={{
                    height: '20px',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  key={icon}
                  as={Link}
                  href={href}
                  target="_blank"
                >
                  <Svg icon={icon} color="text" />
                </Link>
              )
            })}
          </Flex>
          <Flex
            sx={{
              mb: ['0', '0', '10px'],
              mt: 'auto',
              gap: '7px',
              fontSize: '10px',
            }}
          >
            <Svg icon="caret" color="text" height={'6px'} width={'6px'} direction="left" />
            <Link href="/" sx={{ textDecoration: 'underline' }}>
              Back to homepage
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default LHDModal
