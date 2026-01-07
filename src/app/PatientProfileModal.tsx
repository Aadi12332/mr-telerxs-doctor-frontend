import { useNavigate } from "react-router-dom";
import phoneicon from "../assets/graycallicon.svg";
import mailicon from "../assets/grayemailicon.svg";
import editicon from "../assets/editicon.svg";
import fileicon from "../assets/previewicon.svg";
import createfileicon from "../assets/whitecreatefileicon.svg";
import reporticon from "../assets/reportsicon.svg";
import redreporticon from "../assets/redresulticon.svg";
import sendparmacy from "../assets/sendparmacyicon.svg";
import { useState } from "react";
import CreatePrescriptionsModal from "./CreatePrescriptionModal";

type Props = {
  onClose: () => void;
};

export default function PatientProfileModal({ onClose }: Props) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [openProfile, setOpenProfile] = useState(true);
  const [openPrescription, setOpenPrescription] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState(
    "Asthma (diagnosed 2018), Seasonal allergies"
  );
  const [medications, setMedications] = useState("Albuterol as needed");
  const [allergies, setAllergies] = useState("Penicillin");
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-h-[100vh] overflow-y-auto scroll-hide p-6 relative">
        <button onClick={onClose} className="absolute right-6 top-6 text-2xl">
          ✕
        </button>

        <div className="bg-[#D9D9D933] rounded-[20px] p-5 mb-6  mt-20">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-[26px] font-medium text-[#000]">
                Sarah Johnson
              </p>
              <p className="text-[20px] text-[#00000080]">34 years • Female</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex-1">
              <p className="text-[20px] font-medium text-[#000] mb-1">
                Contact Information
              </p>
              <div className="flex items-center gap-2 text-[#00000080]">
                <img src={phoneicon} alt="" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[20px] font-medium text-[#000] mb-1">Email</p>
              <div className="flex items-center gap-2 text-[#00000080]">
                <img src={mailicon} alt="" />
                <span>sarah.j@email.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#CBEAF9B2] rounded-[20px] p-5 mb-6">
          <p className="text-[24px] font-medium text-[#000] mb-4">
            Medical Form Submitted
          </p>

          <p className="text-[20px] text-[#00000080]">Chief Complaint</p>
          <p className="text-[20px] text-[#000] mb-4">
            Difficulty breathing and persistent cough for 5 days
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[#00000080]">Temperature</p>
              <p className="text-[20px] text-[#000]">98.6°F</p>
            </div>
            <div>
              <p className="text-[#00000080]">Blood Pressure</p>
              <p className="text-[20px] text-[#000]">120/80</p>
            </div>
            <div>
              <p className="text-[#00000080]">Pulse</p>
              <p className="text-[20px] text-[#000]">78 bpm</p>
            </div>
          </div>
        </div>

        <div className="bg-[#EBFCD7] rounded-[20px] p-5 mb-6">
          <div className="flex justify-between mb-4 items-center">
            <p className="text-[24px] font-medium text-[#000]">
              Patient Profile
            </p>

            {!isEdit ? (
              <button
                className="flex items-center gap-2 text-[#0E82FD]"
                onClick={() => setIsEdit(true)}
              >
                <img src={editicon} alt="" />
                Edit Information
              </button>
            ) : (
              <div className="flex gap-6 items-center">
                <button
                  className="text-[22px] text-[#000]"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white px-6 py-2.5 rounded-[20px] text-[22px] font-medium"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {!isEdit ? (
            <>
              <p className="text-[#00000080]">Medical History</p>
              <p className="text-[20px] mb-4">{medicalHistory}</p>

              <p className="text-[#00000080]">Current Medications</p>
              <p className="text-[20px] mb-4">{medications}</p>

              <p className="text-[#00000080]">Allergies</p>
              <p className="text-[20px] text-red-500">{allergies}</p>
            </>
          ) : (
            <>
              <p className="text-[#00000080] mb-1">Medical History</p>
              <textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="w-full border border-[#0000004D] rounded-[14px] p-4 text-[20px] mb-4 outline-none"
              />

              <p className="text-[#00000080] mb-1">Current Medications</p>
              <textarea
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                className="w-full border border-[#0000004D] rounded-[14px] p-4 text-[20px] mb-4 outline-none"
              />

              <p className="text-[#00000080] mb-1">Allergies</p>
              <textarea
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full border border-[#0000004D] rounded-[14px] p-4 text-[20px] outline-none"
              />
            </>
          )}
        </div>

        <div className="bg-[#DAF1FB] rounded-[20px] p-5 mb-6">
          <p className="text-[24px] font-medium text-[#000] mb-4">
            Previous Prescriptions
          </p>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <img src={fileicon} alt="" />
              Albuterol Inhaler
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <img src={fileicon} alt="" />
              Montelukast 10mg
            </div>
          </div>
        </div>

        <div className="bg-[#F4EEF9] rounded-[20px] p-5">
          <p className="text-[24px] font-medium text-[#000] mb-4">
            Uploaded Medical Reports
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={reporticon} alt="" />
                chest-xray-2025.pdf
              </div>
              <button onClick={()=>navigate("/reports")} className="text-[#0E82FD]">View</button>
            </div>

            <div className="bg-white rounded-lg p-4 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={redreporticon} alt="" />
                lab-results.pdf
              </div>
              <button onClick={()=>navigate("/reports")} className="text-[#0E82FD]">View</button>
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="flex justify-between gap-6 items-center mt-6">
            <button
              onClick={() => {
                setOpenProfile(false);
                setOpenPrescription(true);
              }}
              className="flex items-center justify-center gap-3 h-[77px] max-w-[868px] w-full rounded-[20px] text-[26px] font-medium text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
            >
              <img src={createfileicon} alt="" className="brightness-[10px]" />
              Create Prescription
            </button>

            <button className="flex items-center justify-center gap-3 h-[77px] max-w-[500px] w-full rounded-[20px] text-[26px] font-medium text-white bg-[linear-gradient(270deg,#308D32_0%,#86C987_100%)]">
              <img src={sendparmacy} alt="" />
              Send to Pharmacy
            </button>
          </div>
        )}
                {openPrescription && (
  <CreatePrescriptionsModal
    onClose={() => setOpenPrescription(false)}
  />
)}
      </div>
    </div>
  );
}
