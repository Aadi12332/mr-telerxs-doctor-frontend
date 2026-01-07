import { useNavigate } from "react-router-dom";
import successicon from "../assets/successicon.svg";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <div>
            <img src={successicon} alt="" className="mb-5 cursor-pointer" />
          </div>
          <div>
            <h2 className="text-[28px] font-medium text-[#000]">
              Payout Request Successful!
            </h2>
            <p className="text-[20px] text-[#00000080]">
              Your payout request has been submitted and is being processed.
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
              <div className="border border-[#0000004D] rounded-[20px] p-8 text-center space-y-6">
                <div className="grid grid-cols-2 gap-6 text-left">
                  <p className="text-[#000000B2] text-[22px]">Transaction ID</p>
                  <p className="text-[#000000] text-[22px] text-end">PAY-1765883501317-9OUHRKY6V</p>

                  <p className="text-[#000000B2] text-[22px]">Amount</p>
                  <p className="text-[#000000] text-[22px] text-end">$300</p>

                  <p className="text-[#000000B2] text-[22px]">Account Number</p>
                  <p className="text-[#000000] text-[22px] text-end">**** **** **** 4892</p>

                  <p className="text-[#000000B2] text-[22px]">Processing Time</p>
                  <p className="text-[#000000] text-[22px] text-end">1-3 Business Days</p>

                  <p className="text-[#000000B2] text-[22px]">Estimated Arrival</p>
                  <p className="text-[#000000] text-[22px] text-end">Jul 5, 2024</p>
                </div>
              </div>

              <p className="text-[#042F4D] text-[20px] !my-9 text-center">
                You will receive a confirmation email once the payout has been processed.
              </p>

              <div className="flex justify-between gap-5">
              <button onClick={()=>navigate("/payment-history")} className="border border-[#0000004D] h-[50px] text-[20px] px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full">
                View Payment History
              </button>
                <button onClick={()=>navigate("/dashboard")} className="bg-[#00598D] text-[20px] text-white px-20 flex items-center justify-center rounded-[10px] max-w-[577px] w-full h-[50px]">
                  Back to Dashboard
                </button>
              </div>
        </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[#b0b0b0]">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
