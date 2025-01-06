type ContractConfig = {
    [chain: string]: {
      address: string;
      abi: never[];
    };
  };
  
  export const contract: ContractConfig = {
    base: {
      address: "0xf8B985e7C8108bF2d3F88384D8657327b0712c0e",
      abi: [],
    },
  
    lisk: {
      address: "0xD639d939Dfc7E27Dd5DeF5B9878134b13524e4A2",
      abi: [],
    },
  
    optimism: {
      address: "0x5563058c55d35ff64447bb0ABec4173e3771e1FB",
      abi: [],
    },
  };
  
  export const getContract = (chain: string) => {
    return contract[chain].address;
  };
  