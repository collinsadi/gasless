// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const tokenName = "Optimism";
const tokenSymbol = "OP";
const initialSupply = ethers.parseEther("1000000"); // 1000000 OP

const OptimismModule = buildModule("OptimismModule", (m) => {
  const token = m.contract("Optimism", [tokenName, tokenSymbol, initialSupply]);

  return { token };
});

export default OptimismModule;
