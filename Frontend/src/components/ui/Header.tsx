import { FaEthereum } from "react-icons/fa";
import { MdHistoryToggleOff } from "react-icons/md";

export const Header = () => {
  return (
    <div className="w-full p-5 flex items-center justify-between">
      <div className="text-3xl text-white">
        <span>
          <FaEthereum />
        </span>
      </div>

      <div className="text-white text-center">
        <h3 className="text-2xl font-bold">ZeroETH</h3>
      </div>

      <div className="text-3xl text-white">
        <span>
          <MdHistoryToggleOff />
        </span>
      </div>
    </div>
  );
};
