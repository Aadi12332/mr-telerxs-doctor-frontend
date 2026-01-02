import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/backarrowicon.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import CustomSelect from "../components/common/CustomSelect";
import DownloadIcon from "../assets/downloadicon.svg";
import PdfIcon from "../assets/pdficon.svg";
const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];
const files = [
  {
    name: "Architectural Plans.pdf",
    size: "15.2 MB",
  },
  {
    name: "Structural Drawings.dwg",
    size: "15.2 MB",
  },
  {
    name: "Specifications.docx",
    size: "15.2 MB",
  },
];
const deliverables = [
  {
    id: 1,
    text: "Foundation and structural framework",
  },
  {
    id: 2,
    text: "HVAC and electrical systems installation",
  },
  {
    id: 3,
    text: "Interior finishing and fixtures",
  },
  {
    id: 4,
    text: "Parking garage construction",
  },
  {
    id: 5,
    text: "Landscaping and exterior work",
  },
];
const phases = [
  {
    title: "Foundation",
    date: "2024-01-15 - 2024-03-15",
    status: "Completed",
  },
  {
    title: "Structure",
    date: "2024-01-15 - 2024-03-15",
    status: "Inprogress",
  },
  {
    title: "Systems",
    date: "2024-01-15 - 2024-03-15",
    status: "Upcoming",
  },
  {
    title: "Finishing",
    date: "2024-01-15 - 2024-03-15",
    status: "Upcoming",
  },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-[#DCFCE7] text-[#16A34A]",
  Inprogress: "bg-[#DCFCE7] text-[#16A34A]",
  Upcoming: "bg-[#F3F3F3] text-[#404040]",
};
export default function ProjectViewPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-2 mb-8">
        <div className="flex sm:flex-row flex-col sm:items-center justify-start gap-5">
            <button onClick={() => navigate("/projects")}
              className="
                flex items-center gap-2
                bg-[#3F63E1] text-white
                px-3 w-fit
                h-[36px]
                rounded-[8px]
                text-[14px] font-medium
                hover:opacity-90
                transition
              "
            >
              <img src={BackArrow} alt="" />
              <span>Back</span>
            </button>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold leading-[36px]">
              Statement of Work (SOW)
            </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CustomSelect
            title="All Projects"
            options={projectFilterOptions}
            value={status}
            onChange={setStatus}
            width="250px"
          />
          <button
            className="
              flex items-center gap-2
              bg-[#3F63E1] text-white
              px-5 rounded-lg h-[36px] min-w-fit
              text-sm font-medium
              hover:opacity-90 transition
            "
          >
            Edit SOW
          </button>
        </div>
      </div>
      <div
        className="
          rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Project Details
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">ID:</span> PRJ-001
            </p>

            <p className="text-sm text-[#111827] mb-4">
              <span className="font-medium">Project:</span>{" "}
              Downtown Office Complex
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#111827] font-medium">
                Status:
              </span>
              <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
                Approved
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Assigned Manager
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-lg font-medium">
                JS
              </div>

              <div>
                <p className="text-sm font-medium text-[#111827]">
                  John Smith
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  MR-001
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Timeline
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">Start:</span>{" "}
              2024-01-15
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">End:</span>{" "}
              2024-08-30
            </p>

            <p className="text-sm text-[#6B7280]">
              Duration: 7.5
            </p>
          </div>
        </div>

        <div className="mt-6">
            <p className="text-sm font-medium text-[#111827]">
              Job Scope
            </p>
            <p className="text-sm text-[#6B7280] mt-1">
              Construction of a 15-story office complex with underground parking, modern HVAC systems, and sustainable energy solutions.
            </p>
        </div>
      </div>
      <div
          className="
            rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
            !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
          "
        >
          <h3 className="text-lg font-semibold text-[#111827] mb-6">
            Key Deliverables
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6 gap-3">
            {deliverables.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-[#F9FAFB] rounded-lg lg:px-5 px-3 lg:py-4 py-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#1E40AF] flex items-center justify-center text-white font-medium">
                  {item.id}
                </div>

                <p className="text-sm text-[#111827]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
      </div>
      <div
      className="
        rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
        !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
      "
    >
      <h3 className="text-lg font-semibold text-[#111827] mb-6">
        Project Phases & Timeline
      </h3>

      <div className="space-y-5">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-[8px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] lg:px-5 px-3 lg:py-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                {phase.title}
              </p>
              <p className="text-sm text-[#6B7280] mt-1">
                {phase.date}
              </p>
            </div>

            <div className="flex items-end flex-col gap-3">
              <div
                className={`px-4 py-1 rounded-full text-sm ${statusStyle[phase.status]}`}
              >
                {phase.status}
              </div>

              <div className="flex gap-4">
                <button className="hover:opacity-70">
                  <img src={EyeIcon} alt="" />
                </button>
                <button className="hover:opacity-70">
                  <img src={EditIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div
      className="
        rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
        !shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#111827]">
          Attachments & Documents
        </h3>

        <button className="bg-[#3F63E1] text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-3">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-100">
                <img src={PdfIcon} alt="" />
              </div>

              <div>
                <p className="text-sm font-medium text-[#111827]">
                  {file.name}
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  {file.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hover:opacity-70">
                <img src={DownloadIcon} alt="" className="min-w-fit" />
              </button>
              <button className="hover:opacity-70">
                <img src={EyeIcon} alt="" className="min-w-fit" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
