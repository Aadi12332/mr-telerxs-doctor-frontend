import { useEffect, useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
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
import {
  getConsultationsFilterApi,
} from "../api/auth.api";
import useDebounce from "../hooks/useDebounce";
import  {  useAuth } from "../routes/AuthContext";


// const ConsultationSkeleton = () => (
//   <div className="rounded-lg md:rounded-[20px] bg-[#D9D9D933] md:p-6 p-3 flex flex-col gap-5 animate-pulse">
//     <div className="flex justify-between items-start gap-5 md:flex-row flex-col">
//       <div className="flex gap-4 items-center">
//         <div className="w-[80px] h-[80px] rounded-full bg-gray-300" />
//         <div>
//           <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
//           <div className="h-4 w-24 bg-gray-200 rounded" />
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <div className="h-8 w-20 bg-gray-200 rounded-full" />
//         <div className="h-8 w-20 bg-gray-200 rounded-full" />
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div>
//         <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
//         <div className="h-5 w-40 bg-gray-300 rounded mb-4" />

//         <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
//         <div className="h-5 w-32 bg-gray-300 rounded" />
//       </div>

//       <div>
//         <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
//         <div className="h-5 w-full bg-gray-300 rounded mb-4" />

//         <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
//         <div className="flex gap-3">
//           <div className="w-5 h-5 bg-gray-300 rounded-full" />
//           <div className="w-5 h-5 bg-gray-300 rounded-full" />
//         </div>
//       </div>
//     </div>

//     <div className="flex flex-col sm:flex-row gap-4">
//       <div className="flex-1 h-[48px] bg-gray-300 rounded-full" />
//       <div className="flex-1 h-[48px] bg-gray-300 rounded-full" />
//     </div>
//   </div>
// );

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Submitted", value: "submitted" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Draft", value: "draft" },
];

export default function Consultation() {
  const { auth } = useAuth();

  const [specialization, setSpecialization] = useState("");
  const [openPrescription, setOpenPrescription] = useState(false);
  const [openIntakeForm, setOpenIntakeForm] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [consultationsAPI, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const doctorId =auth?.doctor?._id;
  console.log({loading})
    const LIMIT = 10;
  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await getConsultationsFilterApi({
        doctorId,
        status: STATUS_OPTIONS.find((i) => specialization === i.label)?.value,
        search: debouncedSearch,
        page,
        limit: LIMIT,
      });
      setConsultations(res.data.data.consultations || []);
      setTotalPages(res.data.data.pagination.total || 1);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!doctorId) return;
    fetchConsultations();
  }, [doctorId, specialization, debouncedSearch, page]);

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
            Patient Consultations
          </h2>
          <p className="text-base lg:text-[20px] text-[#00000080]">
            Manage and review patient consultation requests
          </p>
        </div>

        <div className="flex justify-between items-center lg:gap-[150px] gap-5 w-full mb-8">
          <div className="flex gap-2 items-center pr-5 pl-2 py-3 border border-[#D1D5DB] rounded-[8px] h-[48px] lg:min-w-[486px] sm:w-[170px] flex-1">
            <img src={SearchIcon} alt="" className="lg:w-7 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name or condition..."
              className="outline-none w-full placeholder:text-[#9F9F9F] text-[16px]"
            />
          </div>
          <div className="lg:w-[180px] sm:w-[120px]">
            <CustomSelect
              data={STATUS_OPTIONS.map((i) => i.label)}
              value={specialization}
              onChange={setSpecialization}
              placeholder="All Status"
              openDirection="bottom"
              width="w-full"
              className="lg:w-[180px] sm:w-[120px] flex-1 !h-[48px]"
            />
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {(consultationsAPI ?? []).map((item) => (
            <div
              key={item.id}
              className="rounded-lg md:rounded-[20px] bg-[#D9D9D933] md:p-6 p-3 flex flex-col gap-5"
            >
              <div className="flex justify-between items-start gap-5 md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                  <img
                    src={item?.patient?.profilePicture ?? ""}
                    alt=""
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item?.patient?.name ?? ""}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item?.patient?.age ?? ""} years • {item?.patient?.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {(item?.actions ?? []).includes("refill") && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                      <img src={refillicon} className="w-4" /> Refill
                    </span>
                  )}

                  <span
                    onClick={() => setOpenNote(true)}
                    className="flex items-center gap-2 px-4 py-1 rounded-full cursor-pointer bg-sky-100 text-sky-700 text-sm"
                  >
                    <img src={noteicon} className="w-4" /> Note
                  </span>

                  {item?.status?.toLowerCase() === "pending" && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                      <img src={pendingicon} className="w-4" /> Pending
                    </span>
                  )}

                  {item?.status?.toLowerCase() === "completed" && (
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      <img src={completeicon} className="w-4" /> Completed
                    </span>
                  )}

                  {item?.status?.toLowerCase() === "InProgress" && (
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
                  <p className="font-medium">{item.submittedAt}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Symptoms</p>
                  <p className="font-medium">{item?.symptoms ?? ""}</p>

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
                    setSelectedConsultation(item);
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

      {openNote && <NoteModal onClose={() => setOpenNote(false)} />}

      {openPrescription && (
        <CreatePrescriptionsModal
          selectedConsultation={selectedConsultation}
          onClose={() => setOpenPrescription(false)}
          doctorId={doctorId}
        />
      )}

      {openIntakeForm && selectedConsultation && (
        <IntakeFormModal
          doctorId={doctorId}
          onClose={() => setOpenIntakeForm(false)}
          refill={false}
        />
      )}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-full border disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-full border disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
