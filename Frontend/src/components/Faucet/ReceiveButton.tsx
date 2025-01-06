import { useFaucet } from "../../contexts/Faucet";
import { useGlobal } from "../../contexts/Globals";
import { apiUrl } from "../../config/apiUrl";
import { useAccount } from "wagmi";
export const ReceiveButton = () => {
  const { selectedToken, setIsSuccess, isLoading, setIsLoading } = useGlobal();
  const { amount } = useFaucet();
  const { address } = useAccount();
  const getDisabled = () => {
    return (
      !amount || !address || isLoading || !Number(amount) || Number(amount) <= 0
    );
  };

  const handleClaim = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await fetch(`${apiUrl}/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenAddress: selectedToken?.address,
          amount: amount,
          to: address,
        }),
      });

      const data = await response.json();

      if (data.status) {
        setIsSuccess(true);
      } else {
      }

      // console.log(data);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
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
