import { useGlobal } from "../contexts/Globals";

export const getDisabled = () => {
  const { amount, receiverAddress, selectedToken } = useGlobal();
  return !amount || !receiverAddress || !selectedToken;
};
