import { useAccount } from "wagmi";

export const DisabledFaucetReceivingAddress = () => {
  const { address } = useAccount();

  const maskAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return (
    <div className="mt-5 w-full flex items-center justify-center">
      <div className="w-[90%] bg-[#272727] h-[110px] rounded-xl px-4 border border-[#272727] py-2 hover:border hover:border-[#3F3F43]">
        <div className="w-full">
          <h3 className="text-md text-white">Connected Account</h3>
        </div>

        <div className="w-full mt-2 flex items-center justify-between">
          {/* input */}

          <div className="w-full">
            <input
              className="w-full bg-transparent text-2xl py-2 px-2 border-none outline-none text-white font-bold"
              placeholder="0x000000000000000"
              value={maskAddress}
              type="text"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};
