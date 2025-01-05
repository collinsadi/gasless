// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7";

const GaslessTransferModule = buildModule("GaslessTransferModule", (m) => {
  const gaslessTransfer = m.contract("GaslessTransfer", [tokenAddress]);

  return { gaslessTransfer };
});

export default GaslessTransferModule;

// 0x53aAeed4F7b4BFF096E073371227780D5CcDAf71
// npx hardhat verify --network base-sepolia 0x53aAeed4F7b4BFF096E073371227780D5CcDAf71 "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7"
