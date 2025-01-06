import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ethers } from "ethers";

import { useGlobal } from "../contexts/Globals";
import { getContract } from "../config/contract";

interface SignatureData {
  v: number;
  r: string;
  s: string;
  deadline: bigint;
  value: bigint;
  signature: string;
}

const PERMIT_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export function usePermitSign() {
  const { tokenAddress } = useGlobal();
  const { address, chain } = useAccount();
  const [signature, setSignature] = useState<SignatureData | null>(null);
  const spender = getContract(chain?.id as number).address;

  // Get nonce for the current user, i want this to run anytime the user changes chain or completes a transaction

  const { data: nonce } = useReadContract({
    address: tokenAddress,
    abi: PERMIT_ABI,
    functionName: "nonces",
    args: address ? [address] : undefined,
  });

  const signPermit = async (
    value: bigint,
    name: string
  ): Promise<SignatureData> => {
    if (!address || !window.ethereum) {
      throw new Error("Wallet not connected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const formartedValue = ethers.parseUnits(value.toString(), 18);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now

    const domain = {
      name: name,
      version: "1",
      chainId: chain?.id,
      verifyingContract: tokenAddress,
    };

    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const message = {
      owner: address,
      spender,
      value: formartedValue,
      nonce: nonce || 0n,
      deadline,
    };

    try {
      const signatureHex = await signer.signTypedData(domain, types, message);
      const sig = ethers.Signature.from(signatureHex);

      const signatureData = {
        v: sig.v,
        r: sig.r,
        s: sig.s,
        deadline,
        value,
        signature: signatureHex,
      };

      setSignature(signatureData);
      return signatureData;
    } catch (error) {
      // console.error("Error signing permit:", error);
      throw error;
    }
  };

  return {
    signPermit,
    signature,
  };
}
