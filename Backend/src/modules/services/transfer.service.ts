import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { Message } from "../../common/interfaces/Imessage";
import { getContract } from "common/config/contracts";

// the private key used in the deployer of the gasless transfer contract (OWNER)
const SPENDER_PRIVATE_KEY = process.env.PRIVATE_KEY as string;

// check if all the required environment variables are set
if (!SPENDER_PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

// the function to transfer the token using the gasless transfer contract
export const transferGasless = async (
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

  console.log("Preparing to call GaslessTransfer contract...");
  console.log("Owner:", message.owner);
  console.log("Recipient:", message.recipient);
  console.log("Value:", message.value);
  console.log("Charge:", message.charge);
  console.log("Deadline:", message.deadline);
  console.log("Spender:", GASLESS_TRANSFER_CONTRACT_ADDRESS);
  console.log("v:", v);
  console.log("r:", r);
  console.log("s:", s);

  // GaslessTransfer Contract ABI
  const gaslessTransferAbi = [
    "function transfer(address _owner, uint256 _value, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s, address _to, uint256 _charge) external",
  ];

  // Create contract instance with signer directly
  const gaslessTransferContract = new ethers.Contract(
    GASLESS_TRANSFER_CONTRACT_ADDRESS,
    gaslessTransferAbi,
    spenderWallet
  );

  // Call the `transfer` function
  try {
    const tx = await gaslessTransferContract.transfer(
      message.owner,
      message.value,
      message.deadline,
      v,
      r,
      s,
      message.recipient,
      message.charge
    );
    console.log("Transaction sent, waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Gasless transfer successful:", receipt.transactionHash);
    return receipt.transactionHash;
  } catch (error: any) {
    console.error("Gasless transfer failed:", error);
    throw error;
  }
};
