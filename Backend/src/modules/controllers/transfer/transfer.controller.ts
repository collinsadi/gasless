import { Request, Response } from "express";
import { transferGasless } from "../../services/transfer.service";
import { Message } from "../../../common/interfaces/Imessage";
import { dryRunGaslessTransfer } from "../../../common/utils/dryRun";
import { getRpcUrl } from "../../../common/utils/rpcUtil";
import { ETHToLSK, ETHToOP, ETHToUSDC } from "../../../common/utils/ratePairs";
import { calculateGas } from "../../../common/utils/calculateGas";
import { getContract } from "../../../common/config/contracts";
import { mintTokens } from "../../../common/utils/claimUtil";

export const transferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { signature, message, tokenAddress, chain } = req.body;

  console.log(chain);

  try {
    const rpcUrl = getRpcUrl(String(chain).toUpperCase());
    const CONTRACT_ADDRESS = getContract(String(chain).toLowerCase());

    if (!rpcUrl) {
      res.status(500).json({
        status: false,
        message: "Contract address or RPC URL not found",
      });
      return;
    }

    if (!signature) {
      res.status(400).json({
        status: false,
        message: "Signature not found",
      });
      return;
    }

    if (!message) {
      res.status(400).json({
        status: false,
        message: "Message not found",
      });
      return;
    }

    if (!tokenAddress) {
      res.status(400).json({
        status: false,
        message: "Token address not found",
      });
      return;
    }

    if (!chain) {
      res.status(400).json({
        status: false,
        message: "Chain not found",
      });
      return;
    }

    const messageObject = message as Message;

    const result = await dryRunGaslessTransfer(
      signature,
      messageObject,
      CONTRACT_ADDRESS,
      rpcUrl
    );

    if (result.willSucceed) {
      await transferGasless(
        signature,
        messageObject,
        rpcUrl,
        String(chain).toLowerCase()
      );

      res
        .status(200)
        .json({ status: true, message: "Transaction will succeed" });

      return;
    } else {
      res.status(400).json({ status: false, message: "Transaction will fail" });
      return;
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }
};

export const calculateGasCost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { signature, message, tokenAddress, chain } = req.body;

  console.log(signature, message, tokenAddress, chain);

  try {
    const rpcUrl = getRpcUrl(String(chain).toUpperCase());

    if (!rpcUrl) {
      res.status(500).json({
        status: false,
        message: "Contract address or RPC URL not found",
      });
      return;
    }

    if (!signature) {
      res.status(400).json({
        status: false,
        message: "Signature not found",
      });
      return;
    }

    if (!message) {
      res.status(400).json({
        status: false,
        message: "Message not found",
      });
      return;
    }

    if (!tokenAddress) {
      res.status(400).json({
        status: false,
        message: "Token address not found",
      });
      return;
    }

    if (!chain) {
      res.status(400).json({
        status: false,
        message: "Chain not found",
      });
      return;
    }

    const messageObject = message as Message;

    const estimatedGas = await calculateGas(
      signature,
      messageObject,
      rpcUrl,
      String(chain).toLowerCase()
    );
    const gasCostETH = estimatedGas;
    const gasCostWithMarkup = Number(gasCostETH);

    let gas;

    if (chain === "Base") {
      gas = await ETHToUSDC(gasCostWithMarkup);
    } else if (chain === "Optimism") {
      gas = await ETHToOP(gasCostWithMarkup);
    } else if (chain === "Lisk") {
      gas = await ETHToLSK(gasCostWithMarkup);
    }

    res.status(200).json({
      status: true,
      gas: Math.ceil(Number(gas)),
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }
};

export const claimTokens = async (req: Request, res: Response) => {
  const { to, amount, tokenAddress } = req.body;

  try { 
    await mintTokens(to, amount, tokenAddress);
    res.status(200).json({ status: true, message: "Tokens claimed" });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }
};
