import React from "react";
import { IoClose } from "react-icons/io5";
import { getChainByName } from "../../config/chains";
import { useSwitchChain } from "wagmi";
import { tokens, Token } from "../../config/token";



type TokenModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  setSelectedToken: (token: Token) => void;
};

export const TokenModal = ({
  isOpen,
  handleClose,
  setSelectedToken,
}: TokenModalProps) => {
  const { switchChain } = useSwitchChain();



  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    handleClose();

    // switch to the chain

    const chain = getChainByName(token.chain);

    if (chain) {
      switchChain({ chainId: chain.id });
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
          className={`w-full h-[60%] rounded-xl bg-[#141416] transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between p-5">
            <div></div>
            <div>
              <h3 className="text-xl text-white">Select token</h3>
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

          <div className="mt-5 w-full max-h-full overflow-y-auto">
            {/* Single token */}
            {tokens.map((token, index) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                  onClick={() => handleTokenClick(token)}
                  className="w-full flex items-center justify-between hover:bg-[#242425] p-5 cursor-pointer mt-3"
                >
                  <div className="flex items-center">
                    <div>
                      <img src={token.image} className="w-8 h-8" alt="" />
                    </div>

                    <div className="ml-3 text-white">
                      <h3 className="text-md font-bold">{token.symbol}</h3>
                      <p className="font-thin text-xs">{token.name}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-sm">{token.chain}</h3>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
