import { Request, Response } from "express";
import { getRpcUrl } from "common/utils/rpcUtil";
import { ethers } from "ethers";

export const faucetController = async (req: Request, res: Response) => {
  const { address } = req.body;
  const { chain } = req.params;
  const rpcUrl = getRpcUrl(chain);

//   const provider = new ethers.JsonRpcProvider(rpcUrl);

//   const faucet = new ethers.Contract(CONTRACT_ADDRESS, FaucetABI, provider);

//   const tx = await faucet.requestTokens(address);

//   res.json({ tx });
};
