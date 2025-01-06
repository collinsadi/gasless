import { useGlobal } from "../contexts/Globals";
import { ethers } from "ethers";

export const getDisabled = () => {
  const { amount, receiverAddress, selectedToken } = useGlobal();
  return (
    !amount ||
    !receiverAddress ||
    !selectedToken ||
    !ethers.isAddress(receiverAddress) ||
    !Number(amount) ||
    Number(amount) <= 0
  );
};
