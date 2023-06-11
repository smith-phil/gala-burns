import { 
    Approval as ApprovalEvent,
    Transfer as TransferEvent
} from "../../generated/ERC20/IERC20Metadata";
import { ERC20Burn } from "../../generated/schema";
import { addToERC20TotalSupply, createERC20Burn, updateERC20BurnFromTransfer, updateERC20TotalBurnedFromTransfer, updateERC20TotalSupply } from "../utils/burn";
import { getOrCreateERC20Token } from "../utils/erc20";
import { 
    updateERC20BurnDailySnapshotFromTransfer, 
    updateERC20BurnHourlySnapshotFromTransfer 
} from "../utils/snapshots";
import { ADDRESS_ZERO, TOKEN_WHILTETLIST } from "./constants";

export function handleApproval(event: ApprovalEvent): void {
    return
}

/**
 * Handles a Transfer event for an ERC20 Token
 * @param event the Transfer event that triggered the update
 */
export function handleTransfer(event: TransferEvent): void {
    
    // TODO: If from address zero then add value to total supply, just to see if it works
    if(event.params.from == ADDRESS_ZERO) {
        addToERC20TotalSupply(event.address, event.params.value);
        return
    }

    if(event.params.to != ADDRESS_ZERO) {
        // Not a burn event so we can ignore it
        return 
    }

    if(!TOKEN_WHILTETLIST.includes(event.address)) {
        // Token is not currently supported in the subgraph
        return
    }

    /* 
     * Instead of using updateERC20BurnFromTransfer we have to see if a burn already exists
     * from a PaymentBurnExecuted event. If it does then we can ignore this event
     */
    let burn = ERC20Burn.load(event.transaction.hash.toHexString());
    if(burn != null) {
        // burn already exists so we can ignore this event
        return
    }
    updateERC20BurnFromTransfer(event);

    updateERC20BurnHourlySnapshotFromTransfer(event);

    updateERC20BurnDailySnapshotFromTransfer(event);

    updateERC20TotalBurnedFromTransfer(event);

    updateERC20TotalSupply(event.address, event.params.value);

}