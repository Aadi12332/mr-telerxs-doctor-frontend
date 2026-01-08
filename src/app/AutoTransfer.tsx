import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";



export default function AutoTransfer() {
  // const navigate = useNavigate();
    const [toggles, setToggles] = useState<Record<string, boolean>>({
    consultation: false,
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="lg:min-h-[calc(100vh-160px)] min-h-[calc(100vh-70px)] overflow-auto scroll-hide flex flex-col justify-between">
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <img
            src={backarrow}
            alt=""
            className="invert mb-5 cursor-pointer"
            // onClick={() => navigate("/add-bank", { state: { step: 4 } })}
          />
          <div>
            <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
              Auto-Transfer Settings
            </h2>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className={`border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:p-6 p-3 flex items-center gap-2 justify-between`}>
            <div className="">
              <h2 className="md:text-[22px] text-lg text-[#000] sm:mb-4 mb-2">
              Enable Auto-Transfer
            </h2>
            <p className="md:text-[20px] text-base text-[#00000080]">
              Automatically transfer earnings to your bank account
            </p>
            </div>
            <button
              onClick={() => handleToggle("consultation")}
              className={`w-[52px] min-w-[52px] h-[28px] rounded-full relative transition ${
                toggles["consultation"]
                  ? "bg-[#042F4D]"
                  : "bg-white border border-[#888888]"
              }`}
            >
              <span
                className={`absolute w-[22px] h-[22px] rounded-full transition ${
                  toggles["consultation"]
                    ? "right-[3px] top-[3px] bg-white"
                    : "left-[3px] top-[2px] bg-[#888888]"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-between items-center gap-3">
                <button
                  className="border border-[#0000004D] sm:h-[50px] h-10 lg:text-[20px] text-base sm:px-10 px-3 flex items-center justify-center lg:rounded-[10px] rounded-lg max-w-[398px] w-full"
                >
                  Daily
                </button>
                <button
                  className="border border-[#0000004D] sm:h-[50px] h-10 lg:text-[20px] text-base sm:px-10 px-3 flex items-center justify-center lg:rounded-[10px] rounded-lg max-w-[398px] w-full"
                >
                  Weekly
                </button>
                <button
                  className="border border-[#0000004D] sm:h-[50px] h-10 lg:text-[20px] text-base sm:px-10 px-3 flex items-center justify-center lg:rounded-[10px] rounded-lg max-w-[398px] w-full"
                >
                  Monthly
                </button>
          </div>
          <div className="text-[20px] text-[#00598D] !my-12 text-center">
            Next scheduled transfer: Jan 1, 2026
          </div>
        </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[#b0b0b0]">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </div>
  );
}
