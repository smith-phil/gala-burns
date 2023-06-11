import { PaymentBurnExecuted } from "../generated/Contract/Contract"
import { TOKEN_WHILTETLIST } from "./common/constants"
import { 
  updateERC20BurnDailySnapshotFromPayBurn, 
  updateERC20BurnHourlySnapshotFromPayBurn 
} from "./utils/snapshots"
import { 
  updateERC20BurnFromPayBurn,
  updateERC20TotalBurnedFromPayBurn, 
  updateERC20TotalSupply 
} from "./utils/burn"
import { ERC20Burn } from "../generated/schema"

export function handlePaymentBurnExecuted(event: PaymentBurnExecuted): void {
  
  if(!TOKEN_WHILTETLIST.includes(event.params.token)) {
    // Token is not currently supported in the subgraph
    return
  }

  /* Check to see if we already have a burn, maybe from a transfer event */
  let burn = ERC20Burn.load(event.transaction.hash.toHexString());
  if(burn != null) {
      // burn already exists so we can ignore this event
      return
  }
  
  // Update the ERC20 burn entity
  updateERC20BurnFromPayBurn(event)

  // Update hourly snapshot
  updateERC20BurnHourlySnapshotFromPayBurn(event)

  // Update daily snapshot
  updateERC20BurnDailySnapshotFromPayBurn(event)

  // Update total burned
  updateERC20TotalBurnedFromPayBurn(event)  

  // Update total supply
  updateERC20TotalSupply(event.params.token, event.params.amount)
}

