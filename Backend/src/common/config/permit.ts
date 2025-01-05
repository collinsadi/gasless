export const permitConfig = {
  chainId: 84532,
  domainSeparator: "GaslessToken",
  version: "1",

  types: {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  },
};
