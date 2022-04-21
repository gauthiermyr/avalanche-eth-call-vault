# @stakedao/opyn-perp-vault

StakeDaoPerpVault Solidity smart contracts


## Prerequisites

- [NodeJS](https://nodejs.org/en/)
  -  v12.22.4 <=

## Installation

To install all necessary dependencies, from project root run:

```shell
npm i
```

add a `.env` file containing your pk at the project root folder.

## Compiling contracts

To compile the contracts, from project root run:

```shell
npm run compile
```

## Deploy contracts
```shell
npx hardhat run --network avalanche scripts/deploy.js
```