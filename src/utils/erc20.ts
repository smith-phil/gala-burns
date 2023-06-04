import { Address } from "@graphprotocol/graph-ts"
import { ERC20Token } from "../../generated/schema"
import { IERC20Metadata as ERC20Contract } from "../../generated/ERC20/IERC20Metadata"


export function getOrCreateERC20Token(address: Address): ERC20Token {
  let token = ERC20Token.load(address.toHexString())
  if (token == null) {
    let tokenContract = ERC20Contract.bind(address)
    token = new ERC20Token(address.toHexString())
    token.name = tokenContract.name()
    token.symbol = tokenContract.symbol()
    token.decimals = tokenContract.decimals()
    token.totalSupply = tokenContract.totalSupply()
    token.save()
  }
  return token as ERC20Token
}