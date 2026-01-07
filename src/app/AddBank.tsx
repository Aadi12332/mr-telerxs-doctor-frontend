import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";
import successicon from "../assets/successicon.svg";

export default function AddBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState<number>(
    location.state?.step || 1
  );

  const isActive = (s: number) => step === s;
  const isCompleted = (s: number) => step > s;
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <div className={`${isActive(1) ? "block" : "hidden"}`}>
            <img
              src={backarrow}
              alt=""
              className="invert mb-5 cursor-pointer"
              onClick={() => navigate("/settings")}
            />
          </div>
          <div className={`${isActive(4) ? "block" : "hidden"}`}>
            <img src={successicon} alt="" className="mb-5 cursor-pointer" />
          </div>
          <div>
            <h2 className="text-[28px] font-medium text-[#000]">
              {!isActive(4)
                ? "Add Bank Account"
                : "Bank Account Added Successfully!"}
            </h2>
            <p className="lg:text-[20px] text-base text-[#00000080]">
              {!isActive(4)
                ? "Link your bank account to receive payouts"
                : "Your bank account has been added and is pending verification. We'll send two small deposits to verify your account within 1-2 business days."}
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div
            className={`border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:px-12 px-3 lg:py-10 py-4 flex items-center justify-between ${
              !isActive(4) ? "block" : "hidden"
            }`}
          >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center w-full last:w-[unset]">
                <div
                  className={`lg:w-[50px] lg:h-[50px] w-8 min-w-8 h-8 lg:text-[26px] text-lg flex items-center justify-center rounded-full text-white font-medium
                ${
                  isActive(s) || isCompleted(s)
                    ? "bg-[#0E82FD]"
                    : "bg-[#00000033] text-[#00000066]"
                }`}
                >
                  {s}
                </div>

                <span
                  className={`lg:ml-6 ml-2 lg:text-[24px] sm:text-lg text-sm ${
                    isActive(s) || isCompleted(s)
                      ? "text-[#000]"
                      : "text-[#00000080]"
                  }`}
                >
                  {s === 1 && "Account Details"}
                  {s === 2 && "Verification"}
                  {s === 3 && "Review"}
                </span>

                {s !== 3 && (
                  <div
                    className={`flex-1 h-[4px] lg:mx-10 sm:mx-4 mx-1 ${
                      isCompleted(s) ? "bg-[#0E82FD]" : "bg-[#00000033]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:p-6 p-3 space-y-6">
              <div>
                <label className="block mb-3 lg:text-[22px] text-lg">Account Holder Name</label>
                <input className="w-full border border-[#0000004D] lg:text-[20px] text-base lg:rounded-[20px] rounded-lg h-[65px] px-4 py-3" placeholder="John" />
                <p className="text-[#00000080] lg:lg:text-[20px] text-base mt-3">Enter the full name as it appears on your bank account</p>
              </div>

              <div>
                <label className="block mb-3 lg:text-[22px] text-lg">Bank Name</label>
                <input className="w-full border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:text-[20px] text-base h-[65px] px-4 py-3" placeholder="Chase Bank" />
              </div>

              <button
                onClick={() => setStep(2)}
                className="bg-[#00598D] text-white lg:text-[20px] text-base px-10 flex items-center justify-center rounded-[10px] mx-auto max-w-[577px] w-full h-[50px]"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="border border-[#0000004D] lg:rounded-[20px] rounded-lg p-6 space-y-6">
              <div>
                <label className="block mb-3 lg:text-[22px] text-lg">Account Number</label>
                <input className="w-full border border-[#0000004D] rounded-lg lg:rounded-[20px] lg:text-[20px] text-base h-[65px] px-4 py-3" placeholder="Account Number" />
              </div>

              <div>
                <label className="block mb-3 lg:text-[22px] text-lg">Confirm Account Number</label>
                <input className="w-full border border-[#0000004D] rounded-lg lg:rounded-[20px] lg:text-[20px] text-base h-[65px] px-4 py-3" placeholder="Confirm Account Number" />
              </div>

              <div>
                <label className="block mb-3 lg:text-[22px] text-lg">
                  Routing Number (ABA / IFSC / Swift)
                </label>
                <input
                  className="w-full border border-[#0000004D] rounded-lg lg:rounded-[20px] lg:text-[20px] text-base h-[65px] px-4 py-3"
                  placeholder="Enter routing number"
                />
                <p className="text-[#00000080] lg:text-[20px] text-base mt-3">
                  9-digit routing number for US banks
                </p>
              </div>

              <div className="flex items-center justify-between !mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="border border-[#0000004D] h-[50px] lg:text-[20px] text-base px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="bg-[#00598D] text-white lg:text-[20px] text-base px-10 rounded-[10px] flex items-center justify-center max-w-[577px] w-full h-[50px]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
            <div className="border border-[#0000004D] rounded-lg lg:rounded-[20px] p-6 space-y-6">
              <h2 className="text-[26px] font-semibold">Review Your Information</h2>

              <div className="grid grid-cols-2 gap-6">
                <p className="text-[#000000B2] lg:text-[22px] text-lg">Account Holder</p>
                <p className="lg:text-[22px] text-lg text-end">John</p>

                <p className="text-[#000000B2] lg:text-[22px] text-lg">Bank Name</p>
                <p className="lg:text-[22px] text-lg text-end">Chase Bank</p>

                <p className="text-[#000000B2] lg:text-[22px] text-lg">Account Number</p>
                <p className="lg:text-[22px] text-lg text-end">**** **** **** 4892</p>

                <p className="text-[#000000B2] lg:text-[22px] text-lg">Routing Number</p>
                <p className="lg:text-[22px] text-lg text-end">12334567</p>
              </div>

            </div>
              <div className="flex justify-between !mt-11">
                <button
                  onClick={() => setStep(2)}
                  className="border border-[#0000004D] lg:text-[20px] text-base h-[50px] px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="bg-[#00598D] text-white lg:text-[20px] text-base px-10 flex items-center justify-center rounded-[10px] max-w-[577px] w-full h-[50px]"
                >
                  Save Account
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="border border-[#0000004D] rounded-lg lg:rounded-[20px] p-8 text-center space-y-6">
                <div className="grid grid-cols-2 gap-6 text-left">
                  <p className="text-[#000000B2] lg:text-[22px] text-lg">Account Holder</p>
                  <p className="text-[#000000] lg:text-[22px] text-lg text-end">John</p>

                  <p className="text-[#000000B2] lg:text-[22px] text-lg">Bank Name</p>
                  <p className="text-[#000000] lg:text-[22px] text-lg text-end">Chase Bank</p>

                  <p className="text-[#000000B2] lg:text-[22px] text-lg">Account Number</p>
                  <p className="text-[#000000] lg:text-[22px] text-lg text-end">
                    **** **** **** 4892
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] text-lg">Routing Number</p>
                  <p className="text-[#000000] lg:text-[22px] text-lg text-end">12334567</p>
                </div>
              </div>
              <p className="text-[#042F4D] lg:text-[20px] text-base !mt-9 !mb-24 text-center">
                You will receive an email with instructions to verify your
                account once the deposits are available
              </p>

              <div className="flex justify-center">
                <button onClick={()=>navigate("/payout-setting")} className="bg-[#00598D] lg:text-[20px] text-base text-white px-20 flex items-center justify-center rounded-[10px] max-w-[577px] w-full mx-auto h-[50px]">
                  Go to Payout Settings
                </button>
              </div>
            </>
          )}
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
