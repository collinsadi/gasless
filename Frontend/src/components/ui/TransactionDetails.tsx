import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useGlobal } from "../../contexts/Globals";
import { useAccount } from "wagmi";
import { usePermitSign } from "../../hooks/signMessage";
import { apiUrl } from "../../config/apiUrl";
import { ethers } from "ethers";

//#272727

export const TransactionDetails = () => {
  const { signPermit } = usePermitSign();
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(true);
  const {
    selectedToken,
    receiverAddress,
    fee,
    amount,
    setReceiverAddress,
    setFee,
    setAmount,
    setShowTransactionDetails,
    setError,
    setIsLoading,
    isLoading,
    setIsSuccess,
  } = useGlobal();

  const handleClose = () => {
    setIsOpen(false);
    setShowTransactionDetails(false);
    setReceiverAddress("");
    setFee(BigInt(0));
    setAmount("");
    setIsLoading(false);
  };

  const maskAddress = (address: string) => {
    if (!address) return "";
    return address?.slice(0, 6) + "..." + address?.slice(-4);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const signature = await signPermit(
        BigInt(amount) + BigInt(fee),
        selectedToken?.name as string
      );
      console.log(signature);

      const message = {
        owner: address?.toString() || "",
        value: ethers.parseUnits(amount.toString(), 18).toString(),
        charge: ethers.parseUnits(fee.toString(), 18).toString(),
        deadline: signature.deadline.toString(),
        recipient: receiverAddress,
      };

      console.log(message);

      const response = await fetch(`${apiUrl}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: signature.signature,
          message,
          tokenAddress: selectedToken?.address.toString() || "",
          chain: selectedToken?.chain.toString() || "",
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.status) {
        setIsSuccess(true);
        setShowTransactionDetails(false);
      } else {
        setError("Could not finish transaction");
        setShowTransactionDetails(false);
      }
    } catch (error) {
      console.log(error);
      setError("Could not finish transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`absolute left-0 bottom-0 w-full h-full overflow-y-hidden rounded-xl bg-black/60 backdrop-blur-sm z-10 flex items-end transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full h-[95%] rounded-xl bg-[#141416] transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between p-5">
            <div></div>
            <div>
              {/* <h3 className="text-xl text-white">Transaction Details</h3> */}
            </div>
            <div>
              <span
                onClick={handleClose}
                className="text-[#838798] text-2xl cursor-pointer"
              >
                <IoClose />
              </span>
            </div>
          </div>

          <div className="mt-5 w-full  flex-col justify-between max-h-full overflow-y-auto p-3 flex">
            <div className="w-full">
              {/* top card */}
              <div className="w-full h-[150px]">
                <div className="w-full h-full bg-[#272727] rounded-xl relative p-3 flex items-center justify-center flex-col">
                  {/* token Image */}
                  <div className="w-full flex items-center justify-center absolute top-[-10px]">
                    <img
                      src={selectedToken?.image}
                      className="w-[30px] h-[30px]"
                      alt=""
                    />
                  </div>

                  {/* Title */}

                  <div className="w-full text-center">
                    <h3 className="text-md font-semiBold text-white">
                      {selectedToken?.symbol} Transfer
                    </h3>
                  </div>

                  {/* amount */}

                  <div className="w-full mt-2 text-center">
                    <h3 className="text-2xl font-bold text-white">
                      {formatNumber(Number(amount) + Number(fee))}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-full mt-5">
                <div className="w-full h-full bg-[#272727] rounded-xl relative p-3 flex items-center justify-center flex-col">
                  <div className="w-full text-white">
                    <h3 className="font-bold">Transaction Details</h3>
                  </div>

                  <div className="w-full mt-2">
                    <div className="w-full flex items-center justify-between text-white">
                      <p className="font-thin">from</p>
                      <p>{maskAddress(address?.toString() || "")}</p>
                    </div>

                    <div className="w-full flex items-center justify-between text-white mt-2">
                      <p className="font-thin">to</p>
                      <p>{maskAddress(receiverAddress)}</p>
                    </div>

                    <div className="w-full flex items-center justify-between text-white mt-2">
                      <p className="font-thin">Amount</p>
                      <p>
                        {formatNumber(Number(amount))} {selectedToken?.symbol}
                      </p>
                    </div>

                    <div className="w-full flex items-center justify-between text-white mt-2">
                      <p className="font-thin">fee</p>
                      <p>
                        {formatNumber(Number(fee))} {selectedToken?.symbol}
                      </p>
                    </div>

                    <div className="w-full flex items-center justify-between text-white mt-2">
                      <p className="font-thin">Network</p>
                      <p>{selectedToken?.chain}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center mt-10">
              {!isLoading ? (
                <button
                  className="w-[90%] bg-[#46DE8C] p-4 rounded-xl font-bold disabled:cursor-not-allowed disabled:bg-[#272727] disabled:text-[#767676]"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              ) : (
                <button className=" bg-[#46DE8C] p-4 rounded-xl w-fit">
                  <div className="spinner"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
