import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

export const GALA_V2 = Address.fromString('0xD1D2eb1b1E90b638588728B4130137D262C87cae')
export const TOWN = Address.fromString('0x3DD98C8a089DbCfF7E8fc8d4F532BD493501AB7f')
export const SILK = Address.fromString('0xB045F7f363fe4949954811b113bD56d208c67B23')

export const TOKEN_WHILTETLIST = [
   GALA_V2,
   TOWN,
   SILK
]

export const SECONDS_PER_DAY = 60 * 60 * 24
export const SECONDS_PER_HOUR = 60 * 60

export const BIGINT_ZERO = BigInt.fromI32(0)
export const BIGINT_ONE = BigInt.fromI32(1)
export const BIGINT_TWO = BigInt.fromI32(2)
export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO)
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE)
export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')