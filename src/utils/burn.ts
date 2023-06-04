import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts"
import { PaymentBurnExecuted } from "../../generated/Contract/Contract"
import { ERC20Burn, ERC20TotalBurned } from "../../generated/schema"
import { BIGINT_ZERO } from "../common/constants"
import { getOrCreateERC20Token } from "./erc20"
import { Transfer } from "../../generated/ERC20/IERC20Metadata"


/**
 * createERC20Burn
 * Creates a new ERC20Burn entity
 * @param event the event that triggered the update
 * @param token: The token to create the ERC20Burn for
 * @returns ERC20Burn entity
 */
export function createERC20Burn(event: ethereum.Event, token: Address): ERC20Burn {
    const burn = new ERC20Burn(event.transaction.hash.toHexString())
    burn.amount = BIGINT_ZERO
    burn.orderId = ""
    burn.token = token
    burn.blockNumber = BIGINT_ZERO
    burn.save()
    return burn as ERC20Burn
}

/**
 * updateERC20BurnFromTransfer
 * Updates an ERC20Burn entity
 * @param event: The transfer event that triggered the update
 */
export function updateERC20BurnFromTransfer(event: Transfer): void {
    const burn = getOrCreateERC20Burn(event, event.address)
    burn.amount = event.params.value;
    burn.token = getOrCreateERC20Token(event.address).id;
    burn.blockNumber = event.block.number;
    burn.transactionHash = event.transaction.hash;
    burn.save();
}

/**
 * updateERC20BurnFromPayBurn
 * Updates an ERC20Burn entity
 * @param event: The PaymentBurnExecuted event that triggered the update
 */
export function updateERC20BurnFromPayBurn(event: PaymentBurnExecuted): void {
    const burn = getOrCreateERC20Burn(event, event.params.token)
    burn.amount = event.params.amount;
    burn.orderId = event.params.orderId;
    burn.token = getOrCreateERC20Token(event.params.token).id;
    burn.blockNumber = event.block.number;
    burn.transactionHash = event.transaction.hash;
    burn.save();
}

/**
 * getOrCreateERC20Burn
 * Gets or creates a new ERC20Burn entity
 * @param event: The event that triggered the update
 * @returns ERC20Burn entity
 */
export function getOrCreateERC20Burn(event: ethereum.Event, token: Address): ERC20Burn {
    let burn = ERC20Burn.load(event.transaction.hash.toHexString())
    if (burn == null) {
        burn = createERC20Burn(event, token)
    }
    return burn as ERC20Burn
}

/**
 * createERC20TotalBurned
 * creates a new ERC20TotalBurned entity
 * @param event 
 * @param tokenAddress 
 * @returns ERC20TotalBurned entity
 */
function createERC20TotalBurned(event: ethereum.Event, tokenAddress: Address): ERC20TotalBurned {
    const totalBurned = new ERC20TotalBurned(tokenAddress)
    totalBurned.token = getOrCreateERC20Token(tokenAddress).id
    totalBurned.totalBurned = BIGINT_ZERO
    totalBurned.timestamp = event.block.timestamp
    totalBurned.blockNumber = event.block.number
    totalBurned.save()

    return totalBurned
}

/**
 * getOrCreateERC20TotalBurned
 * @param event: The event that triggered the update
 * @returns ERC20TotalBurned entity
 */
function getOrCreateERC20TotalBurned(event: ethereum.Event, tokenAddress: Address): ERC20TotalBurned {
    let totalBurned = ERC20TotalBurned.load(tokenAddress)
    if (totalBurned == null) {
        totalBurned = createERC20TotalBurned(event, tokenAddress)
    }
    return totalBurned
}

/**
 * updateERC20TotalBurnedFromPayBurn 
 * Updates TotalBurned for ERC20 tokens from PaymentBurnExecuted events
 * @param event: The event that triggered the update
 */
export function updateERC20TotalBurnedFromPayBurn(event: PaymentBurnExecuted): void {
    updateERC20TotalBurned(
        getOrCreateERC20TotalBurned(event, event.params.token),
        event.block,
        event.params.amount
    )
}

/**
 * updateERC20TotalBurnedFromTransfer
 * Updates TotalBurned for ERC20 tokens from Transfer events
 * @param event: The event that triggered the update
 */
export function updateERC20TotalBurnedFromTransfer(event: Transfer): void {
    updateERC20TotalBurned(
        getOrCreateERC20TotalBurned(event, event.address), 
        event.block, 
        event.params.value
    )
}

/**
 * updateERC20TotalBurned
 * Updates TotalBurned for ERC20 tokens
 * @param totalBurned: ERC20TotalBurned entity
 * @param amount: Amount to update totalBurned by
 */
function updateERC20TotalBurned(totalBurned: ERC20TotalBurned, block: ethereum.Block, amount: BigInt): void {
    totalBurned.totalBurned = totalBurned.totalBurned.plus(amount)
    totalBurned.blockNumber = block.number
    totalBurned.timestamp = block.timestamp
    totalBurned.save()
}

/**
 * Updates total supply for ERC20 tokens
 * @param event: The event that triggered the update
 */
export function updateERC20TotalSupply(token: Address, amount: BigInt): void {
    const erc20Token = getOrCreateERC20Token(token)
    erc20Token.totalSupply = erc20Token.totalSupply.minus(amount)
    erc20Token.save()
}