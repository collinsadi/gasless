export const tokenAbi = [
  "function nonces(address owner) view returns (uint256)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
];

export interface Token {
  name: string;
  symbol: string;
  image: string;
  chain: string;
  address: string;
}

export const tokens: Token[] = [
  {
    name: "USD Coin",
    symbol: "USDC",
    image: "/usdc_base.webp",
    chain: "Base",
    address: "0x70112865C27d11E855aD45a3BAA10207C036BD1E",
  },
  {
    name: "Lisk",
    symbol: "LSK",
    image: "/lisk_lisk.webp",
    chain: "Lisk",
    address: "0x5B885850E3F332a13460f48369b2464735005C1B",
  },
  {
    name: "Optimism",
    symbol: "OP",
    image: "/optimism_opptimism.png",
    chain: "Optimism",
    address: "0xDd340267A5C8B6DB5A3f3154f2Fd6674b5500452",
  },
];

export const getToken = (address: string) => {
  return tokens.find((token) => token.address === address);
};
