import { useState } from "react";
import UploadIcon from "../assets/uploadicon copy.svg";
import CloseIcon from "../assets/closeicon.svg";
import CustomSelect from "./common/CustomSelect";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  requestId?: string | null;
};

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

export default function DrawingModel({
  open,
  onClose,
}: IssueReportingModalProps) {
  if (!open) return null;
const [status, setStatus] = useState("all");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[96%] max-w-[486px] bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[#111827]">
            Upload Drawings & Images
          </h2>
          <img src={CloseIcon} alt="" className="w-3 cursor-pointer" onClick={onClose} />
        </div>

        <div className="p-6 space-y-3">
          <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center text-center gap-2">
            <div className="flex-1 flex flex-col gap-3 items-center justify-center">
              <div className="text-2xl">
                <img src={UploadIcon} alt="" />
              </div>
              <p className="text-sm text-[#6B7280]">
                Drop your file here
              </p>
              <p className="text-xs text-[#9CA3AF]">
                or click to browse
              </p>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <button className="mt-2 bg-[#2563EB] text-white px-6 py-2 rounded-lg text-sm">
                Choose file
              </button>
            </div>
          </div>
          <div className="text-xs text-[#9CA3AF]">
            Supported formats: CSV, Excel (.xlsx, .xls) <br /> Required columns: Company, Contact, Email
          </div>
          <div>
            <label className="text-sm text-[#111827] mb-2 inline-block" htmlFor="">Projects</label>
            <CustomSelect
              title="All Projects"
              options={projectFilterOptions}
              value={status}
              onChange={setStatus}
              width="100%"
              upperSide
            />          
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded-lg bg-[#2563EB] text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
