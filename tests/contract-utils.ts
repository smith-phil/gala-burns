import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  BlockMaxThresholdSet,
  GalaWalletAddressSet,
  ImportantAddressSet,
  Initialized,
  OwnershipTransferred,
  Paused,
  PaymentBurnErc1155Executed,
  PaymentBurnExecuted,
  PaymentExecuted,
  PaymentTransferExecuted,
  Unpaused,
  Upgraded
} from "../generated/Contract/Contract"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createBlockMaxThresholdSetEvent(
  blockMaxThreshold: BigInt
): BlockMaxThresholdSet {
  let blockMaxThresholdSetEvent = changetype<BlockMaxThresholdSet>(
    newMockEvent()
  )

  blockMaxThresholdSetEvent.parameters = new Array()

  blockMaxThresholdSetEvent.parameters.push(
    new ethereum.EventParam(
      "blockMaxThreshold",
      ethereum.Value.fromUnsignedBigInt(blockMaxThreshold)
    )
  )

  return blockMaxThresholdSetEvent
}

export function createGalaWalletAddressSetEvent(
  galaWalletAddress: Address
): GalaWalletAddressSet {
  let galaWalletAddressSetEvent = changetype<GalaWalletAddressSet>(
    newMockEvent()
  )

  galaWalletAddressSetEvent.parameters = new Array()

  galaWalletAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "galaWalletAddress",
      ethereum.Value.fromAddress(galaWalletAddress)
    )
  )

  return galaWalletAddressSetEvent
}

export function createImportantAddressSetEvent(
  importantAddress: Address
): ImportantAddressSet {
  let importantAddressSetEvent = changetype<ImportantAddressSet>(newMockEvent())

  importantAddressSetEvent.parameters = new Array()

  importantAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "importantAddress",
      ethereum.Value.fromAddress(importantAddress)
    )
  )

  return importantAddressSetEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPaymentBurnErc1155ExecutedEvent(
  orderId: string,
  token: Address,
  baseId: BigInt,
  amount: BigInt,
  transBlock: BigInt
): PaymentBurnErc1155Executed {
  let paymentBurnErc1155ExecutedEvent = changetype<PaymentBurnErc1155Executed>(
    newMockEvent()
  )

  paymentBurnErc1155ExecutedEvent.parameters = new Array()

  paymentBurnErc1155ExecutedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromString(orderId))
  )
  paymentBurnErc1155ExecutedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  paymentBurnErc1155ExecutedEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromUnsignedBigInt(baseId))
  )
  paymentBurnErc1155ExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentBurnErc1155ExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "transBlock",
      ethereum.Value.fromUnsignedBigInt(transBlock)
    )
  )

  return paymentBurnErc1155ExecutedEvent
}

export function createPaymentBurnExecutedEvent(
  orderId: string,
  token: Address,
  amount: BigInt,
  transBlock: BigInt
): PaymentBurnExecuted {
  let paymentBurnExecutedEvent = changetype<PaymentBurnExecuted>(newMockEvent())

  paymentBurnExecutedEvent.parameters = new Array()

  paymentBurnExecutedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromString(orderId))
  )
  paymentBurnExecutedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  paymentBurnExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentBurnExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "transBlock",
      ethereum.Value.fromUnsignedBigInt(transBlock)
    )
  )

  return paymentBurnExecutedEvent
}

export function createPaymentExecutedEvent(
  orderId: string,
  amount: BigInt,
  transBlock: BigInt
): PaymentExecuted {
  let paymentExecutedEvent = changetype<PaymentExecuted>(newMockEvent())

  paymentExecutedEvent.parameters = new Array()

  paymentExecutedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromString(orderId))
  )
  paymentExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "transBlock",
      ethereum.Value.fromUnsignedBigInt(transBlock)
    )
  )

  return paymentExecutedEvent
}

export function createPaymentTransferExecutedEvent(
  orderId: string,
  token: Address,
  amount: BigInt,
  transBlock: BigInt
): PaymentTransferExecuted {
  let paymentTransferExecutedEvent = changetype<PaymentTransferExecuted>(
    newMockEvent()
  )

  paymentTransferExecutedEvent.parameters = new Array()

  paymentTransferExecutedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromString(orderId))
  )
  paymentTransferExecutedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  paymentTransferExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentTransferExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "transBlock",
      ethereum.Value.fromUnsignedBigInt(transBlock)
    )
  )

  return paymentTransferExecutedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
