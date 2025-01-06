import { FaEthereum } from "react-icons/fa6";
import { ConnectWalletButton } from "../ui/ConnectWalletButton";
export const AuthScreen = () => {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-white items-center justify-center flex ">
        <div className="w-[400px] h-[650px] bg-[#141416] max-w-full max-h-full rounded-xl main-cont flex flex-col justify-between relative">
          <div className="w-full">
            {/* Header */}

            <div className="w-full p-5 flex items-center justify-between">
              <div className="text-3xl text-white">
                <span>
                  <FaEthereum />
                </span>
              </div>

              <div className="text-white text-center"></div>

              <div className="text-3xl text-white">
                {/* <span>
                  <MdHistoryToggleOff />
                </span> */}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center pb-10">
            <ConnectWalletButton disabled={false} />
          </div>

          <div className="w-full flex items-center justify-center pb-10"></div>
        </div>
      </div>
    </>
  );
};
