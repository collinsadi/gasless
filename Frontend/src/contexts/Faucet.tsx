import React, { createContext, useContext, useState } from "react";
import { tokens, Token } from "../config/token";

export const FaucetContext = createContext<any>(null);

export function useFaucet() {
  return useContext(FaucetContext);
}

export function FaucetProvider({ children }: React.PropsWithChildren) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(tokens[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <FaucetContext.Provider
      value={{
        selectedToken,
        setSelectedToken,
        isLoading,
        setIsLoading,
        amount,
        setAmount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </FaucetContext.Provider>
  );
}
