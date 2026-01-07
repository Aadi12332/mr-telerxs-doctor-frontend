import { useNavigate } from "react-router-dom";
import createfileicon from "../assets/whitecreatefileicon.svg";
import sendparmacy from "../assets/sendparmacyicon.svg";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function CreatePrescriptionsModal({ onClose }: Props) {
  const [frequency, setFrequency] = useState("");
  const [refill, setRefill] = useState("");
const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white w-full p-8 relative h-svh overflow-auto scroll-hide pt-20">
        <button onClick={onClose} className="absolute right-6 top-6 text-2xl">
          ✕
        </button>

        <div className="bg-[#E6F5FD] rounded-[20px] p-8">
          <p className="text-[26px] font-medium text-[#000] mb-6">
            Create New Prescription
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[20px] text-[#00000080] mb-2">Patient Name</p>
              <input
                value="Sarah Johnson"
                readOnly
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-[20px] text-[#00000080] mb-2">
                Medicine Name
              </p>
              <input
                value="Amoxicillin 500mg"
                readOnly
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-[20px] text-[#00000080] mb-2">Dosage</p>
              <input
                placeholder="e.g., 500mg, 2 tablets"
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-[20px] text-[#00000080] mb-2">Duration</p>
              <input
                placeholder="7 days, 30 days"
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-[20px] text-[#00000080] mb-2">Frequency</p>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              >
                <option value="">Select frequency</option>
                <option>Once a day</option>
                <option>Twice a day</option>
                <option>Thrice a day</option>
              </select>
            </div>

            <div>
              <p className="text-[20px] text-[#00000080] mb-2">
                Refills Allowed
              </p>
              <select
                value={refill}
                onChange={(e) => setRefill(e.target.value)}
                className="w-full h-[56px] rounded-[14px] px-4 text-[20px] outline-none"
              >
                <option>No refills</option>
                <option>1 refill</option>
                <option>2 refills</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[20px] text-[#00000080] mb-2">
              Instructions for Patient
            </p>
            <textarea
              placeholder="Take with food, avoid alcohol, etc."
              className="w-full h-[96px] rounded-[14px] p-4 text-[20px] outline-none"
            />
          </div>

          <div className="mt-6">
            <p className="text-[20px] text-[#00000080] mb-2">
              Disclaimers / Warnings
            </p>
            <textarea
              placeholder="May cause drowsiness, do not drive if affected, etc."
              className="w-full h-[96px] rounded-[14px] p-4 text-[20px] outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between gap-6 mt-8">
          <button onClick={()=>{navigate("/prescription-management");onClose();}} className="flex items-center justify-center gap-3 h-[77px] w-full rounded-[20px] text-[26px] font-medium text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]">
            <img src={createfileicon} alt="" />
            Issue Prescription
          </button>

          <button className="flex items-center justify-center gap-3 h-[77px] w-full rounded-[20px] text-[26px] font-medium text-white bg-[linear-gradient(270deg,#308D32_0%,#86C987_100%)]">
            <img src={sendparmacy} alt="" />
            Send to Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
}
