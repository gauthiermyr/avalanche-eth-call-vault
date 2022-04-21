import { run, ethers } from "hardhat";

async function main() {
    await run("compile");

    // contracts 
    const wETH = '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab'
    const swap = '0x62069ff3b5127742b0d86b5ff5c6c21cf5e44154'
    const controller = '0x9e3b94819aaf6de606c4aa844e3215725b997064'
    const whitelist = '0xe9963affc9a53e293c9bb547c52902071e6087c9'
    const vaultType = 0

    const [deployer,] = await ethers.getSigners();
    console.log(deployer)
    // Deploy the PerpVault contract first
    const OpynPerpVault = await ethers.getContractFactory('OpynPerpVault');
    const vault = await OpynPerpVault.deploy();

    await vault.deployed();

    console.log(`🍩 Vault deployed at ${vault.address}`)

    const ShortAction = await ethers.getContractFactory('ShortOTokenActionWithSwap');
    const action = await ShortAction.deploy(
        vault.address,
        swap,
        whitelist,
        controller,
        vaultType,
        wETH,
        1,
    );

    console.log(`🍣 ShortOTokenActionWithSwap deployed at ${action.address}`)

    await vault.init(
        wETH, // underlying asset (wETH)
        deployer.address, // owner.address,
        deployer.address, // feeRecipient
        18,
        'StakeDAO ETH Covered Call Strategy',
        'sdETHCoveredCall',
        [action.address]
    )


    // verify contracts at the end, so we make sure etherscan is aware of their existence
    // verify the vault
    await run("verify:verify", {
        address: vault.address,
        network: ethers.provider.network
    })

    // verify the action
    await run("verify:verify", {
        address: action.address,
        network: ethers.provider.network,
        constructorArguments: [
            vault.address,
            wETH,
            swap,
            controller,
            vaultType
        ]
    })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
