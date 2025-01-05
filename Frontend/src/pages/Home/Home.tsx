import { FaEthereum } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TokenModal } from "../../components/ui/TokenModal";
import { useState } from "react";
import { MdHistoryToggleOff } from "react-icons/md";
import { usePermitSign } from "../../hooks/signMessage";
import { Address } from "viem";
import { tokens, Token } from "../../config/token";


export const Home = () => {
  const { signPermit } = usePermitSign();
  const [amount, setAmount] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(tokens[0]);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [fee, setFee] = useState<number>(0.5);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isSending, setIsSending] = useState<boolean>(false);
  // const [calculatingFee, setCalculatingFee] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [showFee, setShowFee] = useState<boolean>(false);

  const handlePermit = async () => {
    const signature = await signPermit(
      selectedToken?.address as Address,
      BigInt(amount),
      selectedToken?.name as string
    );
    console.log(signature);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-white items-center justify-center flex ">
        <div className="w-[400px] h-[650px] bg-[#141416] max-w-full max-h-full rounded-xl main-cont flex flex-col justify-between relative">
          <TokenModal
            isOpen={isOpen}
            handleClose={handleClose}
            setSelectedToken={setSelectedToken}
          />

          <div className="w-full">
            {/* Header */}

            <div className="w-full p-5 flex items-center justify-between">
              <div className="text-3xl text-white">
                <span>
                  <FaEthereum />
                </span>
              </div>

              <div className="text-white text-center">
                <h3 className="text-2xl font-bold">ZeroETH</h3>
                {/* <p className="by-collins-adi">by Collins Adi</p> */}
              </div>

              <div className="text-3xl text-white">
                <span>
                  <MdHistoryToggleOff />
                </span>
              </div>
            </div>

            {/* amount and token */}

            <div className="mt-5 w-full flex items-center justify-center">
              <div className="w-[90%] bg-[#272727] h-[110px] rounded-xl px-4 border border-[#272727] py-2 hover:border hover:border-[#3F3F43]">
                <div className="w-full">
                  <h3 className="text-md text-white">Amount</h3>
                </div>

                <div className="w-full mt-2 flex items-center justify-between">
                  {/* input */}

                  <div className="w-[65%]">
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-transparent text-2xl py-2 px-2 border-none outline-none text-white font-bold"
                      placeholder="100"
                      type="text"
                    />
                  </div>

                  <div onClick={handleOpen} className="w-[35%]">
                    <div className="w-full cursor-pointer h-[40px] bg-[#3F3F43] rounded-xl border border-[#3F3F43] py-2 hover:border hover:border-[#545459] px-2 flex items-center justify-between">
                      <img
                        src={selectedToken?.image}
                        className="w-5 h-5"
                        alt=""
                      />

                      <h3 className="text-lg font-semiBold text-white mx-2">
                        {selectedToken?.symbol}
                      </h3>

                      <span className="text-xl text-white">
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Address */}

            <div className="mt-5 w-full flex items-center justify-center">
              <div className="w-[90%] bg-[#272727] h-[110px] rounded-xl px-4 border border-[#272727] py-2 hover:border hover:border-[#3F3F43]">
                <div className="w-full">
                  <h3 className="text-md text-white">Receiving Address</h3>
                </div>

                <div className="w-full mt-2 flex items-center justify-between">
                  {/* input */}

                  <div className="w-full">
                    <input
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                      className="w-full bg-transparent text-2xl py-2 px-2 border-none outline-none text-white font-bold"
                      placeholder="0x000000000000000"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* transaction fee */}

            {showFee && (
              <div className="w-full items-center justify-center flex flex-col">
                <div className="w-[90%]  p-5 text-white">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <h3>Fee:</h3>
                    </div>

                    <div className="flex items-center flex-row-reverse">
                      <img src="/btc.webp" className="w-5 h-5 ml-3" alt="" />
                      <h3>{fee}</h3>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between mt-3">
                    <div>
                      <h3>Total:</h3>
                    </div>

                    <div className="flex items-center flex-row-reverse">
                      <img src="/btc.webp" className="w-5 h-5 ml-3" alt="" />
                      <h3>{total}</h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-center pb-10">
            {!isLoading ? (
              <button
                disabled={disabled}
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
            {/* <button className=" bg-[#46DE8C] p-4 rounded-xl w-fit">
            <div className="spinner"></div>
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
