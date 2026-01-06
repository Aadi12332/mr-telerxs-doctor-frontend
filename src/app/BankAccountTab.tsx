import { useNavigate } from "react-router-dom";
import AlertIcon from "../assets/AlertIcon";

export function BankAccountTab() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className="bg-[linear-gradient(90deg,rgba(63,210,87,0.7)_0%,rgba(141,255,160,0.6)_100%)]
        border border-transparent rounded-[20px] overflow-hidden px-6 py-5 flex justify-between mb-8"
      >
        <div className="flex gap-4 items-center">
          <AlertIcon color="#217B30" />
          <div>
            <h3 className="text-[22px] mb-3">Account Verified</h3>
            <p className="text-[#00000080] text-[18px]">
              All credentials have been verified and approved.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => navigate("/add-bank")} className="bg-[#00598D] text-white px-6 py-2 rounded-[10px] text-[16px] h-[56px] font-medium flex items-center gap-2">
          <span className="inline-block text-[30px]">+</span> 
          <span className="text-[24px] font-medium">Add Bank Account</span>
        </button>
      </div>
    </div>
  );
}
