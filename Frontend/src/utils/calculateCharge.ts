import { apiUrl } from "../config/apiUrl";

export interface Message {
  owner: string;
  value: bigint;
  charge: bigint;
  deadline: bigint;
  recipient: string;
}

export const calculateCharge = async (
  amount: number,
  signature: string,
  message: Message,
  chain: string,
  tokenAddress: string
) => {
  // Convert BigInt values in the message to strings
  const messageCopy = {
    ...message,
    value: message.value.toString(),
    charge: message.charge.toString(),
    deadline: message.deadline.toString(),
  };

  const response = await fetch(`${apiUrl}/calculate-gas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      signature,
      message: messageCopy,
      tokenAddress,
      chain,
    }),
  });

  return response.json();
};
