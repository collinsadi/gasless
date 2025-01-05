interface Chain {
  id: number;
  name: string;
  unsupported: boolean;
}


//chain ids are all sepolia chain ids of the respective chains

export const chains: Chain[] = [
  { id: 84532, name: "Base", unsupported: false },
  { id: 4202, name: "Lisk", unsupported: false },
  { id: 11155420, name: "Optimism", unsupported: false },
];

export const getChainName = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId)?.name;
};

export const getChainByName = (chainName: string) => {
  return chains.find(
    (chain) => chain.name.toLowerCase() === chainName.toLowerCase()
  );
};

export const getChainById = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId);
};
