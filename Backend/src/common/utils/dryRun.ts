import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { Message } from "../interfaces/Imessage";

// the private key used in the deployer of the gasless transfer contract (OWNER)
const SPENDER_PRIVATE_KEY = process.env.PRIVATE_KEY as string;

if (!SPENDER_PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

interface DryRunResult {
  willSucceed: boolean;
  error?: string;
  gasEstimate?: bigint;
}

export const dryRunGaslessTransfer = async (
  signature: string,
  message: Message,
  contractAddress: string,
  rpcUrl: string
): Promise<DryRunResult> => {
  try {
    // Create provider
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const spenderWallet = new ethers.Wallet(SPENDER_PRIVATE_KEY, provider);

    // Extract v, r, s from signature
    const { v, r, s } = ethers.Signature.from(signature);

    // GaslessTransfer Contract ABI
    const gaslessTransferAbi = [
      {
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_value", type: "uint256" },
          { name: "_deadline", type: "uint256" },
          { name: "_v", type: "uint8" },
          { name: "_r", type: "bytes32" },
          { name: "_s", type: "bytes32" },
          { name: "_to", type: "address" },
          { name: "_charge", type: "uint256" },
        ],
        name: "transfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    // Create contract instance
    const gaslessTransferContract = new ethers.Contract(
      contractAddress,
      gaslessTransferAbi,
      spenderWallet
    );

    // Try to estimate gas first
    const gasEstimate = await gaslessTransferContract.transfer.estimateGas(
      message.owner,
      message.value,
      message.deadline,
      v,
      r,
      s,
      message.recipient,
      message.charge
    );

    // Perform static call
    await gaslessTransferContract.transfer.staticCall(
      message.owner,
      message.value,
      message.deadline,
      v,
      r,
      s,
      message.recipient,
      message.charge
    );

    // If we get here, the transaction will succeed
    return {
      willSucceed: true,
      gasEstimate,
    };
  } catch (error: any) {
    // Extract relevant error message
    let errorMessage = "Unknown error";
    if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    // Check for common error conditions
    if (errorMessage.includes("insufficient allowance")) {
      errorMessage = "Insufficient allowance for transfer";
    } else if (errorMessage.includes("insufficient balance")) {
      errorMessage = "Insufficient balance for transfer";
    } else if (errorMessage.includes("deadline")) {
      errorMessage = "Transfer deadline has expired";
    }

    return {
      willSucceed: false,
      error: errorMessage,
    };
  }
};
