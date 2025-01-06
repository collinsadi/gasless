const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

interface CoinGeckoResponse {
  ethereum: {
    usd: number;
  };
}

export const convertGasToUSD = async (gasCostInWei: string): Promise<number> => {
  try {
    const response = await fetch(coinGeckoAPI);
    const data = await response.json() as CoinGeckoResponse;

    console.log(data);
    
    // Convert gas cost from wei to ETH
    const gasCostInEth = Number(gasCostInWei) / 1e18;
    
    // Convert to USD
    const totalUSDCost = gasCostInEth * data.ethereum.usd;
    
    console.log({
      ethPrice: data.ethereum.usd,
      gasCostInWei,
      gasCostInEth,
      totalUSDCost
    });

    return totalUSDCost;
  } catch (error: any) {
    console.error("Error converting gas to USD:", error);
    throw error;
  }
};
