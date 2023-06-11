import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ERC20Token } from "../../generated/schema"
import { IERC20Metadata as ERC20Contract } from "../../generated/ERC20/IERC20Metadata"
import { BIGINT_ZERO, GALA_CAP, GALA_V2, SILK, SILK_CAP, TOWN, TOWN_CAP } from "../common/constants"


export function getOrCreateERC20Token(address: Address): ERC20Token {
  let token = ERC20Token.load(address)
  if (token == null) {
    let tokenContract = ERC20Contract.bind(address)
    token = new ERC20Token(address)
    token.name = tokenContract.name()
    token.symbol = tokenContract.symbol()
    token.decimals = tokenContract.decimals()
    token.totalSupply = BIGINT_ZERO
    token.save()
  }
  return token as ERC20Token
}

/**
 * getERC20Cap
 * Gets the cap of an ERC20 token
 * @param address: The address of the ERC20 token
 * @returns BigInt
 */
export function getERC20Cap(address: Address): BigInt {
  if (address == GALA_V2) {
    return GALA_CAP
  }

  if (address == TOWN) {
    return TOWN_CAP
  }

  if (address == SILK) {
    return SILK_CAP
  }

  return ERC20Contract.bind(address).totalSupply()
}