import { FaEthereum } from "react-icons/fa";
import { MdHistoryToggleOff } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="w-full p-5 flex items-center justify-between">
      <div className="text-3xl text-white">
        <span>
          <FaEthereum />
        </span>
      </div>

      <div className="text-white text-center flex items-center p-3">
        <NavLink to={"/"} className="border-b pb-2">
          <h3>Send</h3>
        </NavLink>
        <NavLink to={"/faucet"} className="pl-3 pb-2 border-b">
          <h3>Claim</h3>
        </NavLink>
      </div>

      <div className="text-3xl text-white">
        <span>
          <MdHistoryToggleOff />
        </span>
      </div>
    </div>
  );
};
