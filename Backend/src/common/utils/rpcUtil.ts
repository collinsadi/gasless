export const getRpcUrl = (chain: string) => {
  return process.env[`RPC_URL_${chain}`];
};
