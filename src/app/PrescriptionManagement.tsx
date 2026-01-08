import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/searchIcon.svg";
import createicon from "../assets/createfileicon.svg";
import modifyicon from "../assets/editicon.svg";
import bluestatusicon from "../assets/bluecheckedicon.svg";
import greenstatusicon from "../assets/deliveredicon.svg";
import { useState } from "react";
import CreatePrescriptionsModal from "./CreatePrescriptionModal";

const approvedMedicines = [
  {
    name: "Amoxicillin 500mg",
    type: "Antibiotic",
    desc: "Bacterial infections",
  },
  {
    name: "Lisinopril 10mg",
    type: "Antihypertensive",
    desc: "High blood pressure",
  },
  {
    name: "Metformin 500mg",
    type: "Antidiabetic",
    desc: "Type 2 Diabetes",
  },
  {
    name: "Levothyroxine 50mcg",
    type: "Thyroid",
    desc: "Hypothyroidism",
  },
  {
    name: "Amoxicillin 500mg",
    type: "Antibiotic",
    desc: "Bacterial infections",
  },
  {
    name: "Lisinopril 10mg",
    type: "Antihypertensive",
    desc: "High blood pressure",
  },
  {
    name: "Metformin 500mg",
    type: "Antidiabetic",
    desc: "Type 2 Diabetes",
  },
  {
    name: "Levothyroxine 50mcg",
    type: "Thyroid",
    desc: "Hypothyroidism",
  },
];

const recentPrescriptions = [
  {
    patient: "Sarah Johnson",
    medicine: "Albuterol Inhaler",
    dosage: "2 puffs",
    frequency: "Every 4–6 hours as needed",
    issued: "2025-12-08",
    status: "Active",
  },
  {
    patient: "Michael Chen",
    medicine: "Hydrocortisone Cream 1%",
    dosage: "Apply thin layer",
    frequency: "Twice daily",
    issued: "2025-12-08",
    status: "Active",
  },
  {
    patient: "Emily Davis",
    medicine: "Sumatriptan 50mg",
    dosage: "1 tablet",
    frequency: "At onset of migraine",
    issued: "2025-12-07",
    status: "Filled",
  },
];

export default function PrescriptionManagement() {
    const navigate = useNavigate();
  const [openPrescription, setOpenPrescription] = useState(false);

  return (
    <>
      <div className="max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10 mb-8">
        <div className="flex justify-between lg:items-center mb-8 lg:flex-row flex-col gap-4">
          <div>
            <h2 className=" text-[24px] lg:text-[28px] font-medium text-black">
              Prescription Management
            </h2>
            <p className="text-base lg:text-[20px] text-[#00000080]">
              Issue and manage patient prescriptions
            </p>
          </div>

          <button
            onClick={() => {setOpenPrescription(true);}}
            className="h-[56px] w-fit lg:px-8 px-3 rounded-lg lg:rounded-[16px] flex items-center gap-3 text-white text-base lg:text-[20px] font-medium bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
          >
            <img src={createicon} className="w-6" />
            Create Prescription
          </button>
        </div>

        <div className="bg-[#D9D9D933] rounded-lg lg:rounded-[20px] lg:p-6 p-3 mb-8">
          <h3 className="text-lg lg:text-[22px] font-medium mb-4">
            Approved Medicine Database
          </h3>

          <div className="flex items-center gap-3 border border-[#00000033] bg-white rounded-[12px] px-4 py-3 mb-6">
            <img src={SearchIcon} />
            <input
              className="w-full outline-none"
              placeholder="Search by medicine name or condition..."
            />
          </div>

          <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-3">
            {approvedMedicines.map((m, i) => (
              <div key={i} className="bg-[#fff] rounded-lg lg:rounded-[20px] p-4">
                <p className="font-medium text-black">{m.name}</p>
                <p className="text-[#0E82FD] text-[14px] mt-1">{m.type}</p>
                <p className="text-[#00000080] text-[14px] mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#E6F4FB] rounded-lg lg:rounded-[20px] lg:p-6 p-3">
          <h3 className="text-lg lg:text-[22px] font-medium mb-6">Recent Prescriptions</h3>

          <div className="space-y-6">
            {recentPrescriptions.map((p, i) => (
              <div key={i} className="bg-white rounded-lg lg:rounded-[20px] lg:p-6 p-3">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-base lg:text-[20px] font-medium">{p.patient}</p>
                    <p className="text-[#0E82FD] text-[13px] lg:text-[16px]">{p.medicine}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {p.status === "Active" ? (
                      <img src={greenstatusicon} alt="" className="w-4" />
                    ) : (
                      <img src={bluestatusicon} alt="" className="w-4" />
                    )}
                    {p.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 gap-3 text-[16px]">
                  <div>
                    <p className="text-sm lg:text-base text-[#00000080]">Dosage</p>
                    <p className="text-sm lg:text-base ">{p.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm lg:text-base text-[#00000080]">Frequency</p>
                    <p className="text-sm lg:text-base ">{p.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm lg:text-base text-[#00000080]">Issued</p>
                    <p className="text-sm lg:text-base ">{p.issued}</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-6 text-[16px]">
                  <button className="text-[#0E82FD] flex items-center gap-2" onClick={() => {setOpenPrescription(true);}}>
                    <img src={modifyicon} alt="" className="w-6" />
                    Modify
                  </button>
                  <button className="text-red-500 flex items-center gap-2" onClick={()=>navigate("/consultations")}>
                    <span className="text-red-500">✕</span> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {openPrescription && (
          <CreatePrescriptionsModal
            onClose={() => setOpenPrescription(false)}
          />
        )}
      </div>
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
