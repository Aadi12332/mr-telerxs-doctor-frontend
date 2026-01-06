import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";
import ConfirmPayoutModal from "./ConfirmPayoutModal";

export default function RequestPayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(1);
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <img
            src={backarrow}
            alt=""
            className="invert mb-5 cursor-pointer"
            onClick={() => navigate("/payout-setting")}
          />
          <div>
            <h2 className="text-[28px] font-medium text-[#000]">
              Request Payout
            </h2>
            <p className="text-[20px] text-[#00000080]">
              Transfer your earnings to your bank account
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className={`border border-[#0000004D] rounded-[20px] p-6`}>
            <div className="mb-8">
              <label className="block mb-3 text-[22px]">
                Account Holder Name
              </label>
              <input
                className="w-full border border-[#0000004D] text-[20px] rounded-[20px] h-[65px] px-4 py-3"
                placeholder="John"
              />
              <p className="text-[#00000080] text-[20px] mt-3">Minimum: $50</p>
            </div>
            <div>
              <label className="block mb-3 text-[22px]">
                Select Bank Account
              </label>
              <div className="border border-[#0000004D] rounded-[18px] px-6 py-5 flex items-center gap-10">
                <div
                  onClick={() => setSelectedId(1)}
                  className="w-[28px] h-[28px] rounded-full border-2 border-[#00598D] flex items-center justify-center cursor-pointer"
                >
                  {selectedId === 1 && (
                    <div className="w-[20px] h-[20px] rounded-full bg-[#00598D]" />
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-[22px] text-[#000]">
                    Chase Bank – Primary
                  </p>
                  <p className="text-[22px] text-[#00000080] mt-3">
                    **** **** **** 4892
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 items-center mt-[51px]">
              <button className="border border-[#0000004D] h-[50px] text-[20px] px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full">
                Cancel
              </button>

              <button onClick={() => setOpen(true)} className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] flex items-center justify-center max-w-[577px] w-full h-[50px]">
                Proceed
              </button>

                    {open && (
        <ConfirmPayoutModal
          onClose={() => setOpen(false)}
          onConfirm={() => navigate("/payment-success")}
        />
      )}
            </div>
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
