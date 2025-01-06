import { FaExclamation } from "react-icons/fa";
import { useGlobal } from "../../contexts/Globals";

export const Warning = () => {
  const { error } = useGlobal();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] bg-[#F2E7BD] p-4 rounded-xl">
        {/* Title */}

        <div className="text-md font-bold text-[#8C3909] flex items-center">
          <span>
            <FaExclamation />
          </span>

          <h3 className="">An Error Occured</h3>
        </div>

        <div>
          <p className="text-[#8C3909]">{error}</p>
        </div>
      </div>
    </div>
  );
};
