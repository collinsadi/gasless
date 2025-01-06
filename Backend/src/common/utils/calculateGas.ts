import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { convertGasToUSD } from "./convertGas";
import { Message } from "../interfaces/Imessage";
import { getContract } from "../config/contracts";
// the address of the gasless transfer contract

// the private key used in the deployer of the gasless transfer contract (OWNER)
const SPENDER_PRIVATE_KEY = process.env.PRIVATE_KEY as string;

// check if all the required environment variables are set
if (!SPENDER_PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

// the function to transfer the token using the gasless transfer contract
export const calculateGas = async (
  signature: string,
  message: Message,
  rpcUrl: string,
  chain: string
) => {

  const GASLESS_TRANSFER_CONTRACT_ADDRESS = getContract(chain);

  // extract the v, r, s from the signature
  const { v, r, s } = ethers.Signature.from(signature);

  // create a provider
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // create a wallet with the private key
  const spenderWallet = new ethers.Wallet(SPENDER_PRIVATE_KEY, provider);

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

  // Create contract instance with signer directly
  const gaslessTransferContract = new ethers.Contract(
    GASLESS_TRANSFER_CONTRACT_ADDRESS,
    gaslessTransferAbi,
    spenderWallet
  );

  // Call the `transfer` function
  try {
    const estimatedGas = await gaslessTransferContract.transfer.estimateGas(
      message.owner,
      message.value,
      message.deadline,
      v,
      r,
      s,
      message.recipient,
      message.charge
    );
    console.log("Estimated Gas:", estimatedGas.toString());

    // Updated for ethers v6
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    if (!gasPrice) {
      throw new Error("Gas price not found");
    }
    const totalGasCost = estimatedGas * gasPrice;
    console.log("Total Gas Cost (in wei):", totalGasCost.toString());
    console.log(
      "Total Gas Cost (in eth):",
      ethers.formatUnits(totalGasCost, "ether")
    );

    const gasCostInEth = ethers.formatUnits(totalGasCost, "ether");

    const gasCostInUSD = await convertGasToUSD(totalGasCost.toString());
    console.log("Gas Cost in USD:", gasCostInUSD);

    // return { estimatedGas, gasPrice, gasCostInUSD };
    return gasCostInEth;
  } catch (error: any) {
    console.error("Gasless transfer failed:", error);
    throw error;
  }
};
