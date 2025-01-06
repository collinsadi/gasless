// Import required packages
import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import { getToken } from "../config/token";
import { getRpcUrl } from "../utils/rpcUtil";

// Load the private key and RPC URL from the .env file
const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error(
    "Please ensure PRIVATE_KEY, RPC_URL, and CONTRACT_ADDRESS are set in the .env file."
  );
  process.exit(1);
}

// Define a minimal ABI for the mint function
const ABI: string[] = ["function mint(address to, uint256 amount) external"];

// Mint function
export const mintTokens = async (
  to: string,
  amount: string,
  tokenAddress: string
): Promise<void> => {
  try {
    console.log(`Minting ${amount} tokens to address ${to}...`);

    const token = getToken(tokenAddress);

    const CONTRACT_ADDRESS: string | undefined = token?.address;
    const RPC_URL: string | undefined = getRpcUrl(
      String(token?.chain).toUpperCase()
    );

    if (!RPC_URL) {
      console.error(`RPC URL not found for ${token?.chain}`);
      throw new Error(`RPC URL not found for ${token?.chain}`);
    }

    if (!CONTRACT_ADDRESS) {
      console.error(`Token address not found for ${tokenAddress}`);
      throw new Error(`Token address not found for ${tokenAddress}`);
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);

    // Connect to the contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const decimals = 18;
    const amountInWei = ethers.parseUnits(amount.toString(), decimals);

    // Send the transaction
    const tx = await contract.mint(to, amountInWei);
    console.log("Transaction sent. Waiting for confirmation...");

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed!", receipt);
    return receipt;
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
};
