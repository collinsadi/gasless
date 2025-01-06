import { useGlobal } from "../../contexts/Globals";
import { getDisabled } from "../../utils/appUtils";
import { usePermitSign } from "../../hooks/signMessage";
import { calculateCharge } from "../../utils/calculateCharge";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

export const SendButton = () => {
  const { address } = useAccount();
  const {
    isLoading,
    amount,
    selectedToken,
    receiverAddress,
    fee,
    setFee,
    setIsLoading,
    setShowTransactionDetails,
    setError,
  } = useGlobal();
  const { signPermit } = usePermitSign();

  const handlePermit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const signature = await signPermit(
        BigInt(amount),
        selectedToken?.name as string
      );
      // console.log(signature);

      const message = {
        owner: address?.toString() || "",
        value: ethers.parseUnits(amount.toString(), 18),
        charge: ethers.parseUnits(fee.toString(), 18),
        deadline: signature.deadline,
        recipient: receiverAddress,
      };

      // console.log(selectedToken?.chain.toString());

      const charge = await calculateCharge(
        amount,
        signature.signature,
        message,
        selectedToken?.chain.toString() || "",
        selectedToken?.address.toString() || ""
      );
      // console.log(charge);

      if (charge.status) {
        setShowTransactionDetails(true);
        setFee(Math.ceil(charge.gas));
      } else {
        setShowTransactionDetails(false);
        setError("Unable to initiate transaction");
      }
    } catch (error) {
      // console.log(error);
      setError("Unable to initiate transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <button
          disabled={getDisabled()}
          className="w-[90%] bg-[#46DE8C] p-4 rounded-xl font-bold disabled:cursor-not-allowed disabled:bg-[#272727] disabled:text-[#767676]"
          onClick={handlePermit}
        >
          Send
        </button>
      ) : (
        <button className=" bg-[#46DE8C] p-4 rounded-xl w-fit">
          <div className="spinner"></div>
        </button>
      )}
    </>
  );
};
