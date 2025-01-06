import { useFaucet } from "../../contexts/Faucet";
import { useGlobal } from "../../contexts/Globals";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
export const ReceivingAmountInput = () => {
  const { amount, setAmount } = useFaucet();
  const { selectedToken, setIsOpen } = useGlobal();

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
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
              <img src={selectedToken?.image} className="w-5 h-5" alt="" />

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
  );
};
