import { TokenModal } from "../../components/ui/TokenModal";
import { Header } from "../../components/ui/Header";
import { ReceivingAmountInput } from "../../components/Faucet/ReceivingAmountInput";
import { useGlobal } from "../../contexts/Globals";
import { DisabledFaucetReceivingAddress } from "../../components/Faucet/DisabledFaucetReceivingAddress";
import { FaExclamation } from "react-icons/fa";
import { ReceiveButton } from "../../components/Faucet/ReceiveButton";
import { SuccessModal } from "../../components/ui/SuccessModal";

export const Faucet = () => {
  const { isOpen, setIsOpen, setSelectedToken, isSuccess } = useGlobal();
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

          {isSuccess && <SuccessModal />}

          <div className="w-full">
            {/* Header */}

            <Header />

            {/* amount and token */}

            <ReceivingAmountInput />

            {/* Receiver Address */}

            <DisabledFaucetReceivingAddress />

            {/* transaction fee */}

            <div className="w-full  my-5 text">
              {/* <p>Claim Enough Token to Test this tool</p> */}
            </div>
          </div>

          <div className="w-full flex items-center justify-center pb-10 flex-col">
            <div className="w-full my-5">
              <div className="w-full flex items-center justify-center">
                <div className="w-[90%] bg-[#F2E7BD] p-4 rounded-xl">
                  {/* Title */}

                  <div className="text-md font-bold text-[#8C3909] flex items-center">
                    <span>
                      <FaExclamation />
                    </span>

                    <h3 className="text-md">Gas Free Claim</h3>
                  </div>

                  <div>
                    <p className="text-[#8C3909] text-sm">
                      You don't need to pay gas fee to claim tokens
                    </p>

                    <p className="text-sm text-[#8C3909]">
                      Claim Enough Tokens to Test this tool
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ReceiveButton />
          </div>
        </div>
      </div>
    </>
  );
};
