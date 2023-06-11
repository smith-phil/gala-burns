# Gala Burns Subgraph
This subgraph is published on thegraph.com's distributed service. Primarily it tracks burns of the Gala (v2) ERC20 token. It also tracksn burns of Gala's Town and Silk tokens. 

## Example Queries
The following queries demonstrate how to query the subgraph through thegraph.com's Playground query editor. 

### Largest Gala Burns
```
query LargestBurns {
  erc20Burns(where: {amount_gt: "50000000000000", token_: {symbol: "GALA"}}) {
    id
    amount
    transactionHash
    token {
      symbol
    }
  }
}
```
