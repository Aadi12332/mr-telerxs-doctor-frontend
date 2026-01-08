import { useState } from "react";
import Consultation from "../assets/report-patient.svg";
import Prescriptions from "../assets/report-rescriptions.svg";
import Rating from "../assets/report-patient.svg";
import RepeatPatient from "../assets/report-repeat-patient.svg";
import downloadicon from "../assets/downloadicon.svg";
import { ConsultationTrend } from "./ConsulataionChart";
import { TopPatientConditions } from "./PatientConditionChart";
import CustomSelect from "../components/common/customSelect";

const CONDITIONS = [
  { label: "Respiratory", value: 27, color: "bg-blue-500" },
  { label: "Dermatology", value: 38, color: "bg-green-600" },
  { label: "Migraine", value: 61, color: "bg-yellow-400" },
  { label: "Allergy", value: 19, color: "bg-red-600" },
  { label: "Other", value: 47, color: "bg-purple-600" },
];

const REPORT_TYPES = [
  "Consultation Summary",
  "Revenue Report",
  "Patient Activity",
  "Prescription Report",
];

const PATIENTS = [
  {
    name: "Sarah Johnson",
    visits: 5,
    lastVisit: "2025-12-08",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    visits: 4,
    lastVisit: "2025-12-07",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Robert Williams",
    visits: 2,
    lastVisit: "2025-12-05",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function Reports() {
  const [reportType, setReportType] = useState("");

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="flex items-center justify-between lg:mb-8 mb-4">
          <div>
            <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
              Reports & Analytics
            </h2>
            <p className="text-base lg:text-[20px] text-[#00000080]">
              Track performance and analyze your practice data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-4 lg:mb-8 mb-4">
          <div className="bg-[#DDFDDD] rounded-2xl p-6 relative flex flex-col gap-3 items-center">
            <img src={Consultation} alt="" />
            <p className="text-[#000000CC] text-[22px]">Total Patients</p>
            <h3 className="text-[30px] font-medium text-[#138015]">248</h3>
            <span className=" text-[#1A891C] text-[16px] mt-2">
              +12.5% from last month
            </span>
          </div>

          <div className="bg-[#BAD7FFCC] rounded-2xl p-6 relative flex flex-col gap-3 items-center">
            <img src={Prescriptions} alt="" />
            <p className="text-[#000000CC] text-[22px]">Prescriptions</p>
            <h3 className="text-[30px] font-medium text-[#084EAF]">189</h3>
            <span className=" text-[#1A891C] text-[16px] mt-2">
               +8% this month
            </span>
          </div>

          <div className="bg-[#F4EEF9] rounded-2xl p-6 relative flex flex-col gap-3 items-center">
            <img src={Rating} alt="" />
            <p className="text-[#000000CC] text-[22px]">Avg Rating</p>
            <h3 className="text-[30px] font-medium text-[#8D3DD0]">4.8</h3>
            <span className=" text-[#00000080] text-[16px] mt-2">
              Based on 156 reviews
            </span>
          </div>

          <div className="bg-[#F5EE6080] rounded-2xl p-6 relative flex flex-col gap-3 items-center">
            <img src={RepeatPatient} alt="" />
            <p className="text-[#000000CC] text-[22px]">Repeat Patients</p>
            <h3 className="text-[30px] font-medium text-[#71520A]">4.8</h3>
            <span className=" text-[#1A891C] text-[16px] mt-2">
              High retention rate
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-[20px] p-6">
            <p className="text-[22px] font-medium mb-4">Consultation Trend</p>
            <ConsultationTrend />
          </div>

          <div className="border rounded-[20px] p-6">
            <p className="text-[22px] font-medium mb-4">
              Top Patient Conditions
            </p>
            <TopPatientConditions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#D6E5FF] rounded-[24px] p-8">
            <p className="text-[24px] font-medium mb-6">
              Condition Distribution
            </p>

            <div className="space-y-6">
              {CONDITIONS.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[18px]">{item.label}</span>
                    <span className="text-[18px]">{item.value}%</span>
                  </div>

                  <div className="w-full h-[14px] bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F4EEF9] rounded-[24px] p-8">
            <p className="text-[24px] font-medium mb-6">Top Repeat Patients</p>

            <div className="space-y-6">
              {PATIENTS.map((p) => (
                <div
                  key={p.name}
                  className="bg-white rounded-[20px] p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.img}
                      alt=""
                      className="w-[56px] h-[56px] rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base lg:text-[20px] font-medium">{p.name}</p>
                      <p className="text-[16px] text-[#00000080]">
                        Last visit: {p.lastVisit}
                      </p>
                    </div>
                  </div>

                  <p className="text-[18px] text-[#00000080]">
                    {p.visits} Visits
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#E9FFDF] rounded-[28px] p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <p className="lg:text-[28px] text-[24px] font-medium text-[#000]">
                Generate Custom Report
              </p>

              <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[18px] font-medium shadow-sm">
                <img src={downloadicon} alt="" />
                Download
              </button>
            </div>

            <div className="max-w-[520px]">
              <p className="text-base lg:text-[20px] text-[#000] mb-2">Report Type</p>

              <CustomSelect
                data={REPORT_TYPES}
                value={reportType}
                onChange={setReportType}
                placeholder="Select Report Type"
                openDirection="top"
                width="w-full"
                className="!h-[56px]"
              />
            </div>
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
