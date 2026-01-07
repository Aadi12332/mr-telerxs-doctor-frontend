import { useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import profileimg from "../assets/profileimg.svg";
import viewicon from "../assets/viewicon.svg";
import pendingicon from "../assets/pendingicon.svg";
import refillicon from "../assets/refillicon.svg";
import noteicon from "../assets/noteicon.svg";
import completeicon from "../assets/completeicon.svg";
import callicon from "../assets/callicon.svg";
import mailicon from "../assets/emailicon.svg";
import inprogressicon from "../assets/inprogressicon.svg";
import createicon from "../assets/createfileicon.svg";
import CustomSelect from "../components/common/customSelect";
import CreatePrescriptionsModal from "./CreatePrescriptionModal";
import IntakeFormModal from "./IntakeFormModal";
import NoteModal from "./NoteModal";
const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

const consultations = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    image: profileimg,
    condition: "Respiratory Issues",
    symptoms: "Persistent cough, shortness of breath",
    submitted: "2025-12-08 09:30 AM",
    status: "Pending",
    actions: ["note"],
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 28,
    gender: "Male",
    image: profileimg,
    condition: "Skin Allergy",
    symptoms: "Rash on arms, itching",
    submitted: "2025-12-08 10:15 AM",
    status: "Completed",
    actions: ["refill", "note"],
  },
  {
    id: 3,
    name: "Emily Davis",
    age: 45,
    gender: "Female",
    image: profileimg,
    condition: "Migraine",
    symptoms: "Severe headache, sensitivity to light",
    submitted: "2025-12-08 11:00 AM",
    status: "InProgress",
    actions: ["note"],
  },
];

export default function Consultation() {
  const [specialization, setSpecialization] = useState("");
  const [openPrescription, setOpenPrescription] = useState(false);
  const [openIntakeForm, setOpenIntakeForm] = useState(false);
const [openNote, setOpenNote] = useState(false);
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="text-[28px] font-medium text-[#000]">
            Patient Consultations
          </h2>
          <p className="text-[20px] text-[#00000080]">
            Manage and review patient consultation requests
          </p>
        </div>

        <div className="flex justify-between items-center lg:gap-[150px] gap-5 w-full mb-8">
          <div className="flex gap-2 items-center pr-5 pl-2 py-3 border border-[#D1D5DB] rounded-[8px] h-[48px] lg:min-w-[486px] sm:w-[170px] flex-1">
            <img src={SearchIcon} alt="" />
            <input
              type="text"
              placeholder="Search for Medicine, orders, or names…"
              className="outline-none w-full placeholder:text-[#9F9F9F] text-[16px]"
            />
          </div>
          <div className="lg:w-[180px] sm:w-[120px] flex-1">
            <CustomSelect
              data={SPECIALIZATIONS}
              value={specialization}
              onChange={setSpecialization}
              placeholder="ALL"
              openDirection="bottom"
              width="w-full"
              className="lg:w-[180px] sm:w-[120px] flex-1 !h-[48px]"
            />
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {consultations.map((item) => (
            <div
              key={item.id}
              className="rounded-lg md:rounded-[20px] bg-[#D9D9D933] md:p-6 p-3 flex flex-col gap-5"
            >
              <div className="flex justify-between items-start gap-5 md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.age} years • {item.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.actions.includes("refill") && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                      <img src={refillicon} className="w-4" /> Refill
                    </span>
                  )}

                  <span onClick={() => setOpenNote(true)} className="flex items-center gap-2 px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
                    <img src={noteicon} className="w-4" /> Note
                  </span>

                  {item.status === "Pending" && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                      <img src={pendingicon} className="w-4" /> Pending
                    </span>
                  )}

                  {item.status === "Completed" && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      <img src={completeicon} className="w-4" /> Completed
                    </span>
                  )}

                  {item.status === "InProgress" && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      <img src={inprogressicon} className="w-4" /> In progress
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Condition</p>
                  <p className="font-medium">{item.condition}</p>

                  <p className="text-sm text-gray-400 mt-4">Submitted</p>
                  <p className="font-medium">{item.submitted}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Symptoms</p>
                  <p className="font-medium">{item.symptoms}</p>

                  <p className="text-sm text-gray-400 mt-4">Contact</p>
                  <div className="flex gap-3 mt-1">
                    <img src={callicon} className="w-5" />
                    <img src={mailicon} className="w-5" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setOpenIntakeForm(true);
                  }}
                  className="flex-1 h-[48px] py-2 rounded-full flex items-center justify-center gap-2 text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
                >
                  <img src={viewicon} className="w-5" />
                  View Intake Form
                </button>

                <button
                  onClick={() => {
                    setOpenPrescription(true);
                  }}
                  className="flex-1 h-[48px] py-2 rounded-full flex items-center justify-center gap-2 text-white bg-[linear-gradient(270deg,#308D32_0%,#86C987_100%)]"
                >
                  <img src={createicon} className="w-5" />
                  Create Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openNote && 
        <NoteModal onClose={() => setOpenNote(false)} />
      }
      {openPrescription && (
        <CreatePrescriptionsModal onClose={() => setOpenPrescription(false)} />
      )}
      {openIntakeForm && (
        <IntakeFormModal onClose={() => setOpenIntakeForm(false)} />
      )}
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
