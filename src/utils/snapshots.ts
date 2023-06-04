import { PaymentBurnExecuted } from "../../generated/Contract/Contract";
import { ERC20BurnDailySnapShot, ERC20BurnHourlySnapShot, ERC20Token } from "../../generated/schema";
import { BIGINT_ZERO, SECONDS_PER_DAY, SECONDS_PER_HOUR } from "../common/constants";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { getOrCreateERC20Token } from "./erc20";
import { Transfer } from "../../generated/ERC20/IERC20Metadata";


/**
 * createERC20BurnHourlySnapshot
 * Creates a new ERC20BurnHourlySnapShot entity
 * @param token: The token to create an hourly snapshot for
 * @param block: The block that triggered the update 
 * @returns ERC20BurnHourlySnapShot entity
 */
function createERC20BurnHourlySnapshot(token: ERC20Token, block: ethereum.Block): ERC20BurnHourlySnapShot {
    const snapshot = new ERC20BurnHourlySnapShot(block.timestamp.toI32() / SECONDS_PER_HOUR + "")
    snapshot.token = token.id
    snapshot.total = BIGINT_ZERO
    snapshot.numberOfBurns = 0
    snapshot.timestamp = block.timestamp
    snapshot.blockNumber = block.number
    snapshot.save()

    return snapshot
}

/**
 * getOrCreateERC20BurnHourlySnapshot
 * Gets or creates a new ERC20BurnHourlySnapShot entity
 * @param event PaymentBurnExecuted event that triggered the update
 * @returns ERC20BurnHourlySnapShot entity
 */
export function getOrCreateERC20BurnHourlySnapshotFromPayBurn(event: PaymentBurnExecuted): ERC20BurnHourlySnapShot {
    let id = event.block.timestamp.toI32() / SECONDS_PER_HOUR + ""
    let snapshot = ERC20BurnHourlySnapShot.load(id)
    if (snapshot == null) {
        snapshot = createERC20BurnHourlySnapshot(getOrCreateERC20Token(event.params.token), event.block)
    }
    return snapshot

}

/**
 * getOrCreateERC20BurnHourlySnapshotFromTransfer
 * Gets or creates a new ERC20BurnHourlySnapShot entity
 * @param event Transfer event that triggered the update
 * @returns ERC20BurnHourlySnapShot entity
 */
export function getOrCreateERC20BurnHourlySnapshotFromTransfer(event: Transfer): ERC20BurnHourlySnapShot {
    let id = event.block.timestamp.toI32() / SECONDS_PER_HOUR + ""
    let snapshot = ERC20BurnHourlySnapShot.load(id)
    if (snapshot == null) {
        snapshot = createERC20BurnHourlySnapshot(getOrCreateERC20Token(event.address), event.block)
    }
    return snapshot
}



/**
 * updateERC20BurnHourlySnapshot
 * @param event: The event that triggered the update
 */
export function updateERC20BurnHourlySnapshotFromPayBurn(event: PaymentBurnExecuted): void {
    updateERC20BurnHourlySnapshot(
        getOrCreateERC20BurnHourlySnapshotFromPayBurn(event), 
        event.block, 
        event.params.amount
    )
}

/**
 * updateERC20BurnHourlySnapshotFromTransfer
 * @param event: The event that triggered the update
 */
export function updateERC20BurnHourlySnapshotFromTransfer(event: Transfer): void {
    updateERC20BurnHourlySnapshot(
        getOrCreateERC20BurnHourlySnapshotFromTransfer(event), 
        event.block, 
        event.params.value
    )
}

/**
 * updateERC20BurnHourlySnapshot
 * Updates the an hourly snapshot
 * @param snapshot: The snapshot to update
 * @param block: The block that triggered the update
 * @param amount: The amount to add to the snapshot
 */
function updateERC20BurnHourlySnapshot(snapshot: ERC20BurnHourlySnapShot, block: ethereum.Block, amount: BigInt): void {
    snapshot.total = snapshot.total.plus(amount)
    snapshot.numberOfBurns = snapshot.numberOfBurns + 1
    snapshot.timestamp = block.timestamp
    snapshot.blockNumber = block.number
    snapshot.save()
}

/**
 * createERC20BurnDailySnapshot
 * Creates a new ERC20BurnDailySnapShot entity
 * @param token: The token to create an Daily snapshot for
 * @param block: The block that triggered the update 
 * @returns ERC20BurnDailySnapShot entity
 */
function createERC20BurnDailySnapshot(token: ERC20Token, block: ethereum.Block): ERC20BurnDailySnapShot {
    const snapshot = new ERC20BurnDailySnapShot(block.timestamp.toI32() / SECONDS_PER_DAY + "")
    snapshot.token = token.id
    snapshot.total = BIGINT_ZERO
    snapshot.numberOfBurns = 0
    snapshot.timestamp = block.timestamp
    snapshot.blockNumber = block.number
    snapshot.save()

    return snapshot
}

/**
 * getOrCreateERC20BurnDailySnapshot
 * Gets or creates a new ERC20BurnDailySnapShot entity
 * @param event PaymentBurnExecuted event that triggered the update
 * @returns ERC20BurnDailySnapShot entity
 */
export function getOrCreateERC20BurnDailySnapshotFromPayBurn(event: PaymentBurnExecuted): ERC20BurnDailySnapShot {
    let id = event.block.timestamp.toI32() / SECONDS_PER_DAY + ""
    let snapshot = ERC20BurnDailySnapShot.load(id)
    if (snapshot == null) {
        snapshot = createERC20BurnDailySnapshot(getOrCreateERC20Token(event.params.token), event.block)
    }
    return snapshot

}

/**
 * getOrCreateERC20BurnDailySnapshotFromTransfer
 * Gets or creates a new ERC20BurnDailySnapShot entity
 * @param event Transfer event that triggered the update
 * @returns ERC20BurnDailySnapShot entity
 */
export function getOrCreateERC20BurnDailySnapshotFromTransfer(event: Transfer): ERC20BurnDailySnapShot {
    let id = event.block.timestamp.toI32() / SECONDS_PER_DAY + ""
    let snapshot = ERC20BurnDailySnapShot.load(id)
    if (snapshot == null) {
        snapshot = createERC20BurnDailySnapshot(getOrCreateERC20Token(event.address), event.block)
    }
    return snapshot
}



/**
 * updateERC20BurnDailySnapshot
 * @param event: The event that triggered the update
 */
export function updateERC20BurnDailySnapshotFromPayBurn(event: PaymentBurnExecuted): void {
    updateERC20BurnDailySnapshot(
        getOrCreateERC20BurnDailySnapshotFromPayBurn(event), 
        event.block, 
        event.params.amount
    )
}

/**
 * updateERC20BurnDailySnapshotFromTransfer
 * @param event: The event that triggered the update
 */
export function updateERC20BurnDailySnapshotFromTransfer(event: Transfer): void {
    updateERC20BurnDailySnapshot(
        getOrCreateERC20BurnDailySnapshotFromTransfer(event), 
        event.block, 
        event.params.value
    )
}

/**
 * updateERC20BurnDailySnapshot
 * Updates the an Daily snapshot
 * @param snapshot: The snapshot to update
 * @param block: The block that triggered the update
 * @param amount: The amount to add to the snapshot
 */
function updateERC20BurnDailySnapshot(snapshot: ERC20BurnDailySnapShot, block: ethereum.Block, amount: BigInt): void {
    snapshot.total = snapshot.total.plus(amount)
    snapshot.numberOfBurns = snapshot.numberOfBurns + 1
    snapshot.timestamp = block.timestamp
    snapshot.blockNumber = block.number
    snapshot.save()
}