import { useGlobal } from "../../contexts/Globals";

export const TransactionFee = () => {
  const { showFee, fee, total } = useGlobal();

  return (
    <>
      {showFee && (
        <div className="w-full items-center justify-center flex flex-col">
          <div className="w-[90%]  p-5 text-white">
            <div className="w-full flex items-center justify-between">
              <div>
                <h3>Fee:</h3>
              </div>

              <div className="flex items-center flex-row-reverse">
                <img src="/btc.webp" className="w-5 h-5 ml-3" alt="" />
                <h3>{fee}</h3>
              </div>
            </div>

            <div className="w-full flex items-center justify-between mt-3">
              <div>
                <h3>Total:</h3>
              </div>

              <div className="flex items-center flex-row-reverse">
                <img src="/btc.webp" className="w-5 h-5 ml-3" alt="" />
                <h3>{total}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
