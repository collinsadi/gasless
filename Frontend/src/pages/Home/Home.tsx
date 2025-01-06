import { TokenModal } from "../../components/ui/TokenModal";
import { Warning } from "../../components/ui/Warning";
import { useGlobal } from "../../contexts/Globals";
import { ReceivingAddressInput } from "../../components/ui/ReceivingAddressInput";
import { SendButton } from "../../components/ui/SendButton";
import { Header } from "../../components/ui/Header";
import { TransferAmountInput } from "../../components/ui/TransferAmountInput";
import { TransactionFee } from "../../components/ui/TransactionFee";
export const Home = () => {
  const { setSelectedToken, isOpen, setIsOpen } = useGlobal();

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

            <Header />

            {/* amount and token */}

            <TransferAmountInput />

            {/* Receiver Address */}

            <ReceivingAddressInput />

            {/* transaction fee */}

            <TransactionFee />
          </div>

          <div className="w-full flex items-center justify-center pb-10 flex-col">
            <div className="w-full my-5">
              <Warning />
            </div>

            <SendButton />
          </div>
        </div>
      </div>
    </>
  );
};
