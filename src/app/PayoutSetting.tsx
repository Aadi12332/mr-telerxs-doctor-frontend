import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";
import walleticon from "../assets/walleticon.svg";

const DATA = [
  { label: "Minimum Payout Amount", value: "$50.00" },
  { label: "Maximum Payout Amount", value: "$10,000.00" },
  { label: "Processing Time", value: "1–3 Business Days" },
];

export default function PayoutSetting() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <img
            src={backarrow}
            alt=""
            className="invert mb-5 cursor-pointer"
            onClick={() => navigate("/add-bank", { state: { step: 4 } })}
          />
          <div>
            <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
              Payout Settings
            </h2>
            <p className="text-base lg:text-[20px] text-[#00000080]">
              Manage your payout preferences and bank accounts
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className={`border border-[#0000004D] rounded-[20px] p-6`}>
            <h2 className="text-[22px] text-[#000] mb-9">
              Linked Bank Account
            </h2>
            <div onClick={()=>navigate("/request-payout")} className="bg-[#0E82FD] rounded-[20px] p-6 text-white cursor-pointer">
              <div className="flex-1">
                <div className="mt-1 mb-6 flex justify-between items-center">
                  <div className="">
                    <img src={walleticon} alt="" />
                  </div>
                  <div className="text-base lg:text-[20px] text-white/90">
                    Primary Account
                  </div>
                </div>

                <div>
                  <p className="text-base lg:text-[20px] text-white/80 mb-1">
                    Account Holder
                  </p>
                  <p className="text-[26px] font-medium mb-6">John Anderson</p>

                  <div className="flex gap-16">
                    <div>
                      <p className="text-base lg:text-[20px] text-white/80">Bank Name</p>
                      <p className="text-[24px] font-medium">Chase Bank</p>
                    </div>

                    <div>
                      <p className="text-base lg:text-[20px] text-white/80">
                        Account Number
                      </p>
                      <p className="text-[24px] font-medium">
                        **** **** **** 4892
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-[51px]">
              <button
                onClick={() => navigate("/add-bank")}
                className="border border-[#0000004D] text-base lg:text-[20px] h-[50px] px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full"
              >
                Change Bank Account
              </button>
            </div>
          </div>

          <div className="bg-[#EAEBEE] rounded-[20px] p-6">
            <p className="text-[22px] text-[#000] mb-6">Manual Payout Limits</p>

            <div className="flex flex-col gap-6">
              {DATA.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-[20px] px-8 py-6 flex justify-between items-center"
                >
                  <p className="text-base lg:text-[20px] text-[#00000080]">{item.label}</p>
                  <p className="text-base lg:text-[20px] text-[#000]">{item.value}</p>
                </div>
              ))}
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
