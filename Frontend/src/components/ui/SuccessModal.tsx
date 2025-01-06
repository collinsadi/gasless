import { IoClose } from "react-icons/io5";
import { useGlobal } from "../../contexts/Globals";

export const SuccessModal = () => {
  const { setIsSuccess, isSuccess } = useGlobal();

  const handleClose = () => {
    setIsSuccess(false);
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`absolute left-0 bottom-0 w-full h-full overflow-y-hidden rounded-xl bg-black/60 backdrop-blur-sm z-10 flex items-end transition-all duration-300 ${
          isSuccess
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full h-[95%] rounded-xl bg-[#141416] transform transition-transform duration-300 ${
            isSuccess ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between p-5">
            <div></div>
            <div>
              {/* <h3 className="text-xl text-white">Transaction Details</h3> */}
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

          <div className="mt-5 w-full  flex-col justify-between max-h-full overflow-y-auto p-3 flex">
            <div className="w-full">
              {/* top card */}
              <div className="w-full">
                <div className="w-full h-full  rounded-xl relative p-3 flex items-center justify-center flex-col">
                  <div>
                    <img
                      src="/success.svg"
                      alt=""
                      className="w-[150px] h-[150px]"
                    />
                  </div>

                  {/* Title */}

                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold text-white">
                      Transfer Successful
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
