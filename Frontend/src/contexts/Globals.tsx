import React, { createContext, useContext, useState } from "react";
import { Address } from "viem";
import { tokens, Token } from "../config/token";

export const GlobalContext = createContext<any>(null);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [tokenAddress, setTokenAddress] = useState<Address | null>(
    tokens[0].address
  );
  const [selectedToken, setSelectedToken] = useState<Token | null>(tokens[0]);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [fee, setFee] = useState<BigInt>(BigInt(0));
  const [total, setTotal] = useState<BigInt>(BigInt(0));
  const [showFee, setShowFee] = useState<boolean>(false);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isSending, setIsSending] = useState<boolean>(false);
  // const [calculatingFee, setCalculatingFee] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showTransactionDetails, setShowTransactionDetails] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        tokenAddress,
        setTokenAddress,
        selectedToken,
        setSelectedToken,
        userBalance,
        setUserBalance,
        fee,
        setFee,
        total,
        setTotal,
        showFee,
        setShowFee,
        receiverAddress,
        setReceiverAddress,
        isLoading,
        setIsLoading,
        amount,
        setAmount,
        isOpen,
        setIsOpen,
        showTransactionDetails,
        setShowTransactionDetails,
        error,
        setError,
        isSuccess,
        setIsSuccess,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
