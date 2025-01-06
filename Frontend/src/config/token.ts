import { Address } from "viem";

export interface Token {
  name: string;
  symbol: string;
  image: string;
  chain: string;
  address: Address;
}

export const tokens: Token[] = [
  {
    name: "USD Coin",
    symbol: "USDC",
    image: "/usdc_base.webp",
    chain: "Base",
    address: "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7",
  },
  {
    name: "Lisk",
    symbol: "LSK",
    image: "/lisk_lisk.webp",
    chain: "Lisk",
    address: "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7",
  },
  {
    name: "Optimism",
    symbol: "OP",
    image: "/optimism_opptimism.png",
    chain: "Optimism",
    address: "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7",
  },
];
