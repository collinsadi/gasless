import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ethers } from "ethers";
import { Address } from "viem";
import { useGlobal } from "../contexts/Globals";

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

  //   Contract configuration
  //   const tokenAddress = "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7" as Address;
  const spender = "0x53aAeed4F7b4BFF096E073371227780D5CcDAf71" as Address;

  // Get nonce for the current user
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
      name: "GaslessToken",
      version: "1",
      chainId: chain?.id,
      verifyingContract: tokenAddress,
    };

    console.log(domain);

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

    console.log(message);

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
      console.error("Error signing permit:", error);
      throw error;
    }
  };

  return {
    signPermit,
    signature,
  };
}

// interface ButtonProps {
//   className?: string;
//   onSignature?: (sig: SignatureData) => void;
// }

// export function PermitButton({ className, onSignature }: ButtonProps) {
//   const { signPermit } = usePermitSign();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSign = async () => {
//     setError(null);
//     setIsLoading(true);
//     try {
//       const sig = await signPermit();
//       onSignature?.(sig);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to sign");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <button
//         onClick={handleSign}
//         disabled={isLoading}
//         className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
//           disabled:bg-gray-400 disabled:cursor-not-allowed ${className || ""}`}
//       >
//         {isLoading ? "Signing..." : "Sign Permit"}
//       </button>

//       {error && <div className="text-red-500">{error}</div>}
//     </div>
//   );
// }
