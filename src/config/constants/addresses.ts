import { SupportedChainId } from '@ape.swap/sdk-core'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@ape.swap/v3-sdk'

type AddressMap = { [chainId: number]: string }

export const BANANA_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
  [SupportedChainId.BSC]: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
  [SupportedChainId.POLYGON]: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
  [SupportedChainId.MAINNET]: '0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2',
  [SupportedChainId.TLOS]: '0x667fd83e24ca1d935d36717d305d54fa0cac991c',
}

export const V2_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
  [SupportedChainId.POLYGON]: '0xCf083Be4164828f00cAE704EC15a36D711491284',
  [SupportedChainId.POLYGON_MUMBAI]: '0xe145a77c21437e3FD32ce2731833114F0B53405b',
  [SupportedChainId.BSC]: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
  [SupportedChainId.BSC_TESTNET]: '0x152349604d49c2af10adee94b918b051104a143e',
  [SupportedChainId.TLOS]: '0x411172Dfcd5f68307656A1ff35520841C2F7fAec',
}

export const V2_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x5f509a3C3F16dF2Fba7bF84dEE1eFbce6BB85587',
  [SupportedChainId.POLYGON]: '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607',
  [SupportedChainId.POLYGON_MUMBAI]: '0x8fCf4B197A9Df7ab4ed511932cA6c8E1a8fe2F1d',
  [SupportedChainId.BSC]: '0xcf0febd3f17cef5b47b0cd257acf6025c5bff3b7',
  [SupportedChainId.BSC_TESTNET]: '0x3380ae82e39e42ca34ebed69af67faa0683bb5c1',
  [SupportedChainId.TLOS]: '0xb9667Cf9A495A123b0C43B924f6c2244f42817BE',
}

// TODO: Change this to actual addresses
export const V3_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [SupportedChainId.BSC]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [SupportedChainId.POLYGON]: '0x86A2Ad3771ed3b4722238CEF303048AC44231987',
  [SupportedChainId.MAINNET]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [SupportedChainId.TLOS]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [SupportedChainId.POLYGON]: '0x01B8f5B6647E57607D8d5E323EdBDb3C7Efe86b6',
}

export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
  [SupportedChainId.POLYGON]: '0x644a417cea95fcad595edb00db170c7bb5cc490d',
}

export const QUOTER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [SupportedChainId.POLYGON]: '0x76F310F6e1d2D7d24827212762D0b68c1e367968',
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x0EED0E9723385c2584Ba0a38CDBc175072b42708',
  [SupportedChainId.BSC]: '0x0EED0E9723385c2584Ba0a38CDBc175072b42708',
  [SupportedChainId.POLYGON]: '0x352Aa8320b2F381AeBa358A7a7467035921de7Fd',
  [SupportedChainId.MAINNET]: '0x0EED0E9723385c2584Ba0a38CDBc175072b42708',
  [SupportedChainId.TLOS]: '0x0EED0E9723385c2584Ba0a38CDBc175072b42708',
}

export const PRICE_GETTER_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x85d2C626E28a42E184cF8e32db1461013D23331D',
  [SupportedChainId.BSC]: '0x85d2C626E28a42E184cF8e32db1461013D23331D',
  [SupportedChainId.POLYGON]: '0xe68e1dfD20Cb57978B7c70d2cB0d9E9b05bFCab4',
  [SupportedChainId.MAINNET]: '0x85d2C626E28a42E184cF8e32db1461013D23331D',
  [SupportedChainId.TLOS]: '0x85d2C626E28a42E184cF8e32db1461013D23331D',
}
