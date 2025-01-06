import { useGlobal } from "../../contexts/Globals";

export const ReceivingAddressInput = () => {
  const { receiverAddress, setReceiverAddress, isLoading } = useGlobal();

  return (
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
              disabled={isLoading}
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="w-full bg-transparent text-2xl py-2 px-2 border-none outline-none text-white font-bold"
              placeholder="0x000000000000000"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
