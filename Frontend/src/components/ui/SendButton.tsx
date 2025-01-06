import { useGlobal } from "../../contexts/Globals";
import { getDisabled } from "../../utils/appUtils";

export const SendButton = () => {
  const { isLoading, amount, selectedToken, signPermit } = useGlobal();

  const handlePermit = async () => {
    const signature = await signPermit(
      BigInt(amount),
      selectedToken?.name as string
    );
    console.log(signature);
  };

  return (
    <>
      {!isLoading ? (
        <button
          disabled={getDisabled()}
          className="w-[90%] bg-[#46DE8C] p-4 rounded-xl font-bold disabled:cursor-not-allowed disabled:bg-[#272727] disabled:text-[#767676]"
          onClick={handlePermit}
        >
          Send
        </button>
      ) : (
        <button className=" bg-[#46DE8C] p-4 rounded-xl w-fit">
          <div className="spinner"></div>
        </button>
      )}
    </>
  );
};
