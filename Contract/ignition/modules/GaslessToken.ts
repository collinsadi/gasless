// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const tokenName = "GaslessToken";
const tokenSymbol = "GLT";
const initialSupply = ethers.parseEther("1000000"); // 1000000 GLT

const GaslessTokenModule = buildModule("GaslessTokenModule", (m) => {
  const token = m.contract("GaslessToken", [
    tokenName,
    tokenSymbol,
    initialSupply,
  ]);

  return { token };
});

export default GaslessTokenModule;
