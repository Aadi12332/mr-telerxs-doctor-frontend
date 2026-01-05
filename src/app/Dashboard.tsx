import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/common/customSelect";
import Consultation from "../assets/consultationicon.svg";
import Prescriptions from "../assets/prescriptionicon.svg";
import Rating from "../assets/patientratingicon.svg";
import Urgent from "../assets/urgenticon.svg";
import Completed from "../assets/completeicon.svg";
import Pending from "../assets/pendingicon.svg";

const SPECIALIZATIONS = [
  "Total Consultations",
  "Prescriptions Issued",
  "Total Earnings",
  "Patient Rating"
];

const reporttype = [
  "Daily",
  "Weekly",
  "Monthly",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");
  const [specialization2, setSpecialization2] = useState("");

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="flex items-center justify-between lg:mb-8 mb-4">
          <div>
            <h2 className="text-[28px] font-medium text-[#000]">
              Dashboard Overview
            </h2>
            <p className="text-[20px] text-[#00000080]">
              Welcome back, here's your daily summary
            </p>
          </div>

          <div className="flex gap-4">
            <CustomSelect
              data={SPECIALIZATIONS}
              value={specialization}
              onChange={setSpecialization}
              placeholder="ALL"
              openDirection="bottom"
              width="w-full"
              className="lg:w-[250px] w-[170px] !h-[48px]"
            />
            <CustomSelect
              data={reporttype}
              value={specialization2}
              onChange={setSpecialization2}
              placeholder="ALL"
              openDirection="bottom"
              width="w-full"
              className="lg:w-[170px] w-[120px] !h-[48px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4 lg:mb-8 mb-4">
          <div className="bg-[#E8F0FF] rounded-2xl p-6 relative flex flex-col gap-7 items-center">
            <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
              +12%
            </span>
            <img src={Consultation} alt="" />
            <p className="text-[#000000CC] text-[24px]">Total Consultations</p>
            <h3 className="text-[30px] font-medium text-[#084EAF]">248</h3>
          </div>

          <div className="bg-[#F3EDF9] rounded-2xl p-6 relative flex flex-col gap-7 items-center">
            <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
              +8%
            </span>
            <img src={Prescriptions} alt="" />
            <p className="text-[#000000CC] text-[24px]">Prescriptions Issued</p>
            <h3 className="text-[30px] font-medium text-[#A239F9]">189</h3>
          </div>

          <div className="bg-[#F7FFCC] rounded-2xl p-6 relative flex flex-col gap-7 items-center">
            <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
              +0.2
            </span>
            <img src={Rating} alt="" />
            <p className="text-[#000000CC] text-[24px]">Patient Rating</p>
            <h3 className="text-[30px] font-medium text-[#808C26]">4.8</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-[#D9D9D9] rounded-[20px] p-6">
            <h3 className="text-[26px] font-medium mb-7">Recent Consultations</h3>

            {[
              {
                name: "Michael Chen",
                issue: "Chest pain, shortness of breath",
                time: "10:30 AM",
                status: "Urgent",
                icon: Urgent
              },
              {
                name: "Michael Chen",
                issue: "Skin Allergy",
                time: "11:00 AM",
                status: "Completed",
                icon: Completed
              },
              {
                name: "Sarah Johnson",
                issue: "Respiratory Issues",
                time: "10:30 AM",
                status: "Pending",
                icon: Pending
              },
              {
                name: "Emma Wilson",
                issue: "Follow-up consultation",
                time: "12:30 PM",
                status: "Pending",
                icon: Pending
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#D9D9D926] rounded-[20px] py-4 px-7 mb-4 last:mb-0"
              >
                <div>
                  <p className="text-[22px] font-medium mb-4">{item.name}</p>
                  <p className="text-[20px] text-[#00000080]">{item.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-[22px] font-medium mb-3">{item.time}</p>
                  <span
                    className={`mt-1 px-3 py-1 h-[36px] justify-center rounded-full text-base flex gap-1 items-center ${
                      item.status === "Urgent"
                        ? "bg-[#FC9B7880] text-[#7D2C2C]"
                        : item.status === "Completed"
                        ? "bg-[#B1FEB280] text-[#138015]"
                        : "bg-[#EDBC4A80] text-[#624F25]"
                    }`}
                  >
                    <img src={item.icon} alt={item.status} className="w-5" />
                    {item.status}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <button onClick={() => navigate("/consultations")} className=" bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white px-10 py-3 rounded-full text-[22px] font-medium">
                View All Consultations
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#D9D9D9] rounded-[20px] p-6">
            <h3 className="text-[26px] font-medium mb-7">Today's Schedule</h3>

            {[
              { name: "Robert Williams", type: "Follow-up", time: "3:00 PM" },
              {
                name: "Lisa Anderson",
                type: "New Consultation",
                time: "4:30 PM",
              },
              {
                name: "David Martinez",
                type: "Prescription Review",
                time: "4:30 PM",
              },
              {
                name: "Anna Thompson",
                type: "Video Consultation",
                time: "10:30 AM",
              },
              { name: "Lisa Anderson", type: "Follow-up", time: "09:00 AM" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#D9D9D926] rounded-[20px] py-4 px-7 p-4 mb-4 last:mb-0"
              >
                <div>
                  <p className="text-[22px] font-medium mb-4">{item.name}</p>
                  <p className="text-[20px] text-[#00000080]">{item.type}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-[16px] text-[20px] font-medium ${
                    item.time.includes("AM")
                      ? "bg-[#B6FFB7B2] text-[#096B0B]"
                      : "bg-[#BAD7FF80] text-[#0B3977]"
                  }`}
                >
                  {item.time}
                </span>

              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
