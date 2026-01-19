import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/common/customSelect";
import Consultation from "../assets/consultationicon.svg";
import Prescriptions from "../assets/prescriptionicon.svg";
import Rating from "../assets/patientratingicon.svg";
// import Urgent from "../assets/urgenticon.svg";
import Completed from "../assets/completeicon.svg";
import Pending from "../assets/pendingicon.svg";
import {
  getDoctorDashboardOverviewApi,
  getDoctorTodaysScheduleApi,
  getDoctorRecentConsultationsApi,
} from "../api/auth.api";
import { useAuth } from "../routes/AuthContext";

const SPECIALIZATIONS = [
  "Total Consultations",
  "Prescriptions Issued",
  "Total Earnings",
  "Patient Rating",
];

const MetricSkeleton = () => (
  <div className="bg-gray-100 md:rounded-[20px] h-[226px] rounded-lg p-6 flex flex-col items-center gap-8 animate-pulse">
    <div className="w-10 h-10 bg-gray-300 rounded-full" />
    <div className="h-5 w-40 bg-gray-300 rounded" />
    <div className="h-8 w-24 bg-gray-300 rounded" />
  </div>
);

const ListSkeleton = () => (
  <div className="bg-[#D9D9D926] rounded-[20px] py-4 px-6 mb-4 animate-pulse">
    <div className="h-5 w-40 bg-gray-300 rounded mb-3" />
    <div className="h-4 w-60 bg-gray-200 rounded" />
  </div>
);

const reporttype = ["Daily", "Weekly", "Monthly"];

export default function Dashboard() {
  const { auth } = useAuth();
  console.log({ auth: auth });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [specialization, setSpecialization] = useState("");
  const [specialization2, setSpecialization2] = useState("");
  const [overview, setOverview] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const doctorId = auth?.doctor?._id;
  useEffect(() => {
    if (!doctorId) return;

    setLoading(true);

    Promise.all([
      getDoctorDashboardOverviewApi(doctorId),
      getDoctorTodaysScheduleApi(doctorId),
      getDoctorRecentConsultationsApi(doctorId),
    ])
      .then(([overviewRes, scheduleRes, consultationsRes]) => {
        setOverview(overviewRes.data.data);
        setSchedule(scheduleRes.data.data.schedule);
        setConsultations(consultationsRes.data.data.consultations);
      })
      .finally(() => setLoading(false));
  }, [doctorId]);

  return (
    <div className="lg:min-h-[calc(100vh-160px)] min-h-[calc(100vh-70px)] overflow-auto scroll-hide flex flex-col justify-between">
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="flex md:items-center justify-between md:flex-row flex-col lg:mb-8 mb-4 gap-5">
          <div>
            <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
              Dashboard Overview
            </h2>
            <p className="text-base lg:text-[20px] text-[#00000080]">
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
              className="lg:w-[250px] md:w-[170px] !h-[48px] flex-1"
            />
            <CustomSelect
              data={reporttype}
              value={specialization2}
              onChange={setSpecialization2}
              placeholder="ALL"
              openDirection="bottom"
              width="w-full"
              className="lg:w-[170px] md:w-[120px] !h-[48px] flex-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-5 gap-4 lg:mb-8 mb-4">
          {loading ? (
            <>
              <MetricSkeleton />
              <MetricSkeleton />
              <MetricSkeleton />
            </>
          ) : (
            <>
              <div className="bg-[#E8F0FF] md:rounded-[20px] rounded-lg p-6 relative flex flex-col md:gap-7 gap-3 items-center">
                <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
                  {overview?.metrics?.totalConsultations?.trend === "up"
                    ? `+ ${overview?.metrics?.totalConsultations?.change ?? 0}`
                    : `- ${overview?.metrics?.totalConsultations?.change ?? 0}`}
                </span>
                <img src={Consultation} alt="" />
                <p className="text-[#000000CC] text-xl mt-4 sm:mt-0 md:text-[24px] text-center">
                  Total Consultations
                </p>
                <h3 className="text-[30px] font-medium text-[#084EAF] leading-[1]">
                  {overview?.metrics?.totalConsultations?.value ?? 0}
                </h3>
              </div>

              <div className="bg-[#F3EDF9] md:rounded-[20px] rounded-lg p-6 relative flex flex-col md:gap-7 gap-3 items-center">
                <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
                  {overview?.metrics?.prescriptionsIssued?.trend === "up"
                    ? `+ ${overview?.metrics?.prescriptionsIssued?.change ?? 0}`
                    : `- ${
                        overview?.metrics?.prescriptionsIssued?.change ?? 0
                      }`}
                </span>
                <img src={Prescriptions} alt="" />
                <p className="text-[#000000CC] text-xl mt-4 sm:mt-0 md:text-[24px] text-center">
                  Prescriptions Issued
                </p>
                <h3 className="text-[30px] font-medium text-[#A239F9] leading-[1]">
                  {overview?.metrics?.prescriptionsIssued?.value ?? 0}
                </h3>
              </div>

              <div className="bg-[#F7FFCC] md:rounded-[20px] rounded-lg p-6 relative flex flex-col md:gap-7 gap-3 items-center">
                <span className="absolute right-5 top-5 text-[#369B37] text-[20px] font-medium">
                  {overview?.metrics?.patientRating?.trend === "down"
                    ? `- ${overview?.metrics?.patientRating?.totalRatings ?? 0}`
                    : `+ ${
                        overview?.metrics?.patientRating?.totalRatings ?? 0
                      }`}
                </span>
                <img src={Rating} alt="" />
                <p className="text-[#000000CC] text-xl mt-4 sm:mt-0 md:text-[24px] text-center">
                  Patient Rating
                </p>
                <h3 className="text-[30px] font-medium text-[#808C26] leading-[1]">
                  {overview?.metrics?.patientRating?.value ?? 0}
                </h3>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-[#D9D9D9] md:rounded-[20px] rounded-lg md:p-6 p-3">
            <h3 className="text-[26px] font-medium mb-7">
              Recent Consultations
            </h3>

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <ListSkeleton key={i} />)
            ) : consultations && consultations.length > 0 ? (
              consultations.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[#D9D9D926] rounded-lg md:rounded-[20px] py-4 md:px-7 px-3 mb-4 last:mb-0"
                >
                  <div>
                    <p className="md:text-[22px] text-[18px] font-medium mb-4">
                      {item.patientName}
                    </p>
                    <p className="md:text-[20px] text-[16px] text-[#00000080]">
                      {item.reason}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="md:text-[22px] text-[18px] font-medium mb-3">
                      {item.time}
                    </p>

                    <span
                      className={`mt-1 px-3 py-1 h-[36px] justify-center rounded-full md:text-base text-[14px] flex gap-1 items-center ${
                        item.status === "Urgent"
                          ? "bg-[#FC9B7880] text-[#7D2C2C]"
                          : item.status === "Completed"
                          ? "bg-[#B1FEB280] text-[#138015]"
                          : "bg-[#EDBC4A80] text-[#624F25]"
                      }`}
                    >
                      <img
                        src={item.statusType === "info" ? Pending : Completed}
                        alt={item.status}
                        className="md:w-5 w-4"
                      />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-6 h-[150px] flex justify-center items-center">
                No Schedule Found
              </p>
            )}

            {
              consultations && consultations.length > 0 &&
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate("/consultations")}
                  className=" bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white md:px-10 px-6 md:py-3 py-2 rounded-full md:text-[22px] text-[16px] font-medium"
                >
                  View All Consultations
                </button>
              </div>
            }

          </div>

          <div className="bg-white border border-[#D9D9D9] md:rounded-[20px] rounded-lg md:p-6 p-3">
            <h3 className="text-[26px] font-medium mb-7">Today's Schedule</h3>

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <ListSkeleton key={i} />)
            ) : schedule && schedule.length > 0 ? (
              schedule.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[#D9D9D926] rounded-lg md:rounded-[20px] py-4 md:px-7 px-3 mb-4 last:mb-0"
                >
                  <div>
                    <p className="md:text-[22px] text-[18px] font-medium mb-4">
                      {item.patientName}
                    </p>
                    <p className="md:text-[22px] text-[16px] text-[#00000080]">
                      {item.consultationType}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-[16px] md:text-[20px] text-[16px] font-medium ${
                      item.time?.includes("AM")
                        ? "bg-[#B6FFB7B2] text-[#096B0B]"
                        : "bg-[#BAD7FF80] text-[#0B3977]"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-6 h-[150px] flex justify-center items-center">
                No Schedule Found
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </div>
  );
}
