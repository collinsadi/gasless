import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ethers } from "ethers";
import { Address } from "viem";

interface SignatureData {
  v: number;
  r: string;
  s: string;
  deadline: bigint;
  value: bigint;
}

const PERMIT_ABI = [
  "function nonces(address owner) view returns (uint256)",
] as const;

export function usePermitSign() {
  const { address, chain } = useAccount();
  const [signature, setSignature] = useState<SignatureData | null>(null);

  // Contract configuration
  //   const tokenAddress = "0x0605DE20f52B8b5f850A234c170Dcbd032381BA7" as Address;
  const spender = "0x0A69d334038863Cd4EF9f2c07a22396883fB6AC3" as Address;

  const signPermit = async (
    tokenAddress: Address,
    value: bigint,
    name: string
  ): Promise<SignatureData> => {
    // Get nonce for the current user
    const { data: nonce } = useReadContract({
      address: tokenAddress,
      abi: PERMIT_ABI,
      functionName: "nonces",
      args: address ? [address] : undefined,
    });

    console.log(nonce);

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
