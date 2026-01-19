import { useState } from "react";
import fileicon from "../assets/noteicon.svg";
import backarrow from "../assets/backlongarrowicon.svg";

type Props = {
  onClose: () => void;
};

export default function NoteModal({ onClose }: Props) {
  const [step, setStep] = useState<"list" | "detail">("list");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {step === "list" && (
        <div className="bg-[#B2E5FD] rounded-[20px] lg:max-w-[998px] max-w-[95%] max-h-[95vh] overflow-auto w-full px-8 py-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={fileicon} className="w-6" />
            <p className="text-[26px] font-medium">Note List</p>
          </div>

          <div className="bg-white rounded-[16px] overflow-hidden">
            {[
              "Medical Accommodation Note",
              "Medical Necessity Statement",
              "Clinical Accommodation Note",
              "Physician Recommendation",
              "Disability Accommodation Letter",
              "Healthcare Provider Certification",
              "Medical Support Letter",
              "Doctor’s Official Statement",
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setStep("detail")}
                className="w-full flex justify-between px-6 py-4 border-b last:border-none text-left"
              >
                <span>{item}</span>
                <span className="text-[#00000080]">
                  2025-12-{24 - i} 10:15 AM
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="border border-[#0000004D] text-[20px] px-12 rounded-[10px] h-[50px] max-w-[398px] w-full bg-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {step === "detail" && (
        <div className="bg-[#B2E5FD] rounded-[20px] max-w-[998px] w-full px-8 py-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={fileicon} className="w-6" />
            <p className="text-[26px] font-medium">Note List</p>
          </div>

          <div className="bg-white rounded-[16px] p-6 text-[#00000080] leading-relaxed mb-6">
                      <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setStep("list")}>
              <img src={backarrow} className="w-6 invert" />
            </button>
            <p className="text-[16px] font-medium text-black">
              Medical Accommodation Note
            </p>
            <span className="ml-auto text-[#00000080] text-[16px]">
              2025-12-24 10:15 AM
            </span>
          </div>
            Sarah has been under my care for [describe period of time]. The
            patient has a medical condition that significantly interferes with
            daily life activities. Due to this condition, accommodation is
            medically necessary to prevent further deterioration.

            <br />
            <br />

            I strongly recommend granting this accommodation request to ensure
            the patient’s health and well-being are maintained.

            <br />
            <br />

            Sincerely,
            <br />
            Dr. [Doctor’s Name]
          </div>

          <div className="flex justify-between gap-6">
            <button
              onClick={onClose}
              className="border border-[#0000004D] text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
            >
              Cancel
            </button>

            <button
              onClick={onClose}
              className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
