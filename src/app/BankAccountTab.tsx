import { useNavigate } from "react-router-dom";
import AlertIcon from "../assets/AlertIcon";

export function BankAccountTab() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className="bg-[linear-gradient(90deg,rgba(63,210,87,0.7)_0%,rgba(141,255,160,0.6)_100%)]
        border border-transparent lg:rounded-[20px] rounded-lg overflow-hidden lg:px-6 px-3 lg:py-5 py-3 flex justify-between mb-8"
      >
        <div className="flex gap-4 items-center">
          <AlertIcon color="#217B30" />
          <div>
            <h3 className="text-[18px] lg:text-[22px] lg:mb-3 mb-1">Account Verified</h3>
            <p className="text-[#00000080] text-sm lg:text-[18px]">
              All credentials have been verified and approved.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => navigate("/add-bank")} className="bg-[#00598D] text-white px-6 py-2 lg:rounded-[10px] rounded-lg text-[16px] lg:h-[56px] h-10 font-medium flex items-center gap-2">
          <span className="inline-block lg:text-[30px] text-xl">+</span> 
          <span className="lg:text-[24px] text-lg font-medium">Add Bank Account</span>
        </button>
      </div>
    </div>
  );
}
