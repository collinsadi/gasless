import axios from "axios";

const CHARGE_AMOUNT = 2; // $2 for every transfer

// Convert ETH to LSK
export const ETHToLSK = async (ethAmount: number) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=lisk,ethereum&vs_currencies=usd"
    );
    const liskUSD = response.data.lisk.usd;
    const ethUSD = response.data.ethereum.usd;
    const rate = ethUSD / liskUSD; // Calculate ETH to LSK rate
    const amountInUSD = ethAmount * rate;

    // Calculate $CHARGE_AMOUNT worth of LSK
    const extraLSK = CHARGE_AMOUNT / liskUSD; // $CHARGE_AMOUNT worth of LSK
    return amountInUSD + extraLSK * liskUSD; // Adding extra LSK worth $CHARGE_AMOUNT
  } catch (error) {
    console.error("Error fetching Ethereum to Lisk price:", error);
    throw new Error("Failed to fetch ETH to LSK conversion rate.");
  }
};

// Convert ETH to OP
export const ETHToOP = async (ethAmount: number) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=optimism,ethereum&vs_currencies=usd"
    );
    const opUSD = response.data.optimism.usd;
    const ethUSD = response.data.ethereum.usd;
    const rate = ethUSD / opUSD; // Calculate ETH to OP rate
    const amountInUSD = ethAmount * rate;

    // Calculate $CHARGE_AMOUNT worth of OP
    const extraOP = CHARGE_AMOUNT / opUSD; // $CHARGE_AMOUNT worth of OP
    return amountInUSD + extraOP * opUSD; // Adding extra OP worth $CHARGE_AMOUNT
  } catch (error) {
    console.error("Error fetching Ethereum to Optimism price:", error);
    throw new Error("Failed to fetch ETH to OP conversion rate.");
  }
};

// Convert ETH to USDC
export const ETHToUSDC = async (ethAmount: number) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd"
    );
    const ethUSD = response.data.ethereum.usd; // Ethereum price in USD
    const usdcUSD = response.data["usd-coin"].usd; // USDC price in USD (should always be 1)
    const rate = ethUSD / usdcUSD; // Calculate ETH to USDC rate (1 ETH in USD equals 1 ETH in USDC)
    const amountInUSD = ethAmount * rate;

    // Calculate $CHARGE_AMOUNT worth of USDC
    const extraUSDC = CHARGE_AMOUNT / usdcUSD; // $CHARGE_AMOUNT worth of USDC (which is basically 2 units of USDC)
    return amountInUSD + extraUSDC * usdcUSD; // Adding extra USDC worth $CHARGE_AMOUNT
  } catch (error) {
    console.error("Error fetching Ethereum to USDC price:", error);
    throw new Error("Failed to fetch ETH to USDC conversion rate.");
  }
};
