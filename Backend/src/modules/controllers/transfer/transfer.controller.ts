import { Request, Response } from "express";
import { transferGasless } from "../../services/transfer.service";
import { Message } from "../../../common/interfaces/Imessage";
import { dryRunGaslessTransfer } from "../../../common/utils/dryRun";
import { ENVIRONMENT } from "../../../common/config/environment";
import { getRpcUrl } from "common/utils/rpcUtil";
import { ETHToLSK, ETHToOP, ETHToUSDC } from "../../../common/utils/ratePairs";
import { calculateGas } from "common/utils/calculateGas";

const { CONTRACT_ADDRESS } = ENVIRONMENT.GASLESS_TRANSFER;

const GAS_PERCENTAGE = 0.08; // 8%

export const transferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { signature, message, tokenAddress, chain } = req.body;

  console.log(chain);

  const rpcUrl = getRpcUrl(String(chain).toUpperCase());

  if (!CONTRACT_ADDRESS || !rpcUrl) {
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
    rpcUrl,
    tokenAddress
  );

  if (result.willSucceed) {
    await transferGasless(signature, messageObject, rpcUrl, tokenAddress);

    res.status(200).json({ status: true, message: "Transaction will succeed" });

    return;
  } else {
    res.status(400).json({ status: false, message: "Transaction will fail" });
    return;
  }
};

export const calculateGasCost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { signature, message, tokenAddress, chain } = req.body;

  console.log(signature, message, tokenAddress, chain);

  const rpcUrl = getRpcUrl(String(chain).toUpperCase());

  if (!CONTRACT_ADDRESS || !rpcUrl) {
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
    tokenAddress
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
};
