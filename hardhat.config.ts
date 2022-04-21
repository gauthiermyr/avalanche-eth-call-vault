import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';

import "dotenv/config"
import "hardhat-contract-sizer"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';

require('dotenv').config()

const snowtraceAPI = process.env.SNOWTRACE_KEY;
const privateKey = process.env.PK;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
	networks: {
		hardhat: {
			forking: {
				enabled: true,
				url: `https://api.avax.network/ext/bc/C/rpc`,
			},
			initialBaseFeePerGas: 0 // workaround for eip-1559 (solidity-coverage)
		},
		avalanche: {
			url: `https://api.avax.network/ext/bc/C/rpc`,
			accounts: [privateKey]
		},
	},
	solidity: {
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			},
		},
		version: '0.7.6',
	},
	typechain: {
		outDir: 'typechain',
		target: 'ethers-v5'
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: process.env.COVERAGE ? false : true,
		disambiguatePaths: false,
	},
	gasReporter: {
		currency: 'USD',
		gasPrice: 43,
		enabled: true,
	},
	etherscan: {
		apiKey: snowtraceAPI
	},
	mocha: {
		timeout: 40000
	}
} as HardhatUserConfig;
