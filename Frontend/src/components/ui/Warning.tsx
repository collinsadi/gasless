import { FaExclamation } from "react-icons/fa";

export const Warning = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] bg-[#F2E7BD] p-4 rounded-xl">
        {/* Title */}

        <div className="text-md font-bold text-[#8C3909] flex items-center">
          <span>
            <FaExclamation />
          </span>

          <h3 className="">Insufficient Funds</h3>
        </div>

        <div>
          <p className="text-[#8C3909]">You don't have enough tokens this transaction</p>
        </div>
      </div>
    </div>
  );
};
