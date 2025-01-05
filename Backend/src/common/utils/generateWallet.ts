import { ethers } from "ethers";

export const generateWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
};
