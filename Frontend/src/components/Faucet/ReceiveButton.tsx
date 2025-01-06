import { useFaucet } from "../../contexts/Faucet";

export const ReceiveButton = () => {
  const { isLoading, amount } = useFaucet();

  const getDisabled = () => {
    return !amount;
  };

  const handleClaim = () => {
    console.log("Claiming");
  };

  return (
    <>
      {!isLoading ? (
        <button
          disabled={getDisabled()}
          className="w-[90%] bg-[#46DE8C] p-4 rounded-xl font-bold disabled:cursor-not-allowed disabled:bg-[#272727] disabled:text-[#767676]"
          onClick={handleClaim}
        >
          Claim
        </button>
      ) : (
        <button className=" bg-[#46DE8C] p-4 rounded-xl w-fit">
          <div className="spinner"></div>
        </button>
      )}
    </>
  );
};
