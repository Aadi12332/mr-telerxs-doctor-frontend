import { useState } from "react";
import CustomSelect from "./common/CustomSelect";
import UploadCameraIcon from "../assets/uploadcameraicon.svg";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
};

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

export default function DailyLogModel({
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
        className="w-[96%] max-h-[98vh] max-w-[550px] bg-white rounded-xl shadow-lg overflow-auto scroll-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            Daily Work Log
          </h2>
        </div>

        <div className="px-6 py-4 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827]">Date</label>
              <input
                placeholder="dd - mm - yyyy"
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Project
              </label>
              <CustomSelect
                title="All Requests"
                options={projectFilterOptions}
                value={status}
                onChange={setStatus}
                width="100%"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Task
              </label>
              <CustomSelect
                title="All Requests"
                options={projectFilterOptions}
                value={status}
                onChange={setStatus}
                width="100%"
              />
            </div>

            <div>
              <label className="text-sm text-[#111827]">Progress (%)</label>
              <input
                placeholder="Enter"
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Work Description</label>
            <textarea
              placeholder="Describe the work completed today..."
              rows={4}
              className="mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm"
            />
          </div>

          <div className="">
            <label className="text-sm text-[#111827]">Upload Photos</label>
            <div className="border-2 border-dashed rounded-lg mt-2 p-6 flex items-center justify-center text-center gap-2">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-2xl mb-1">
                  <img src={UploadCameraIcon} alt="" />
                </div>
                <p className="text-sm text-[#6B7280]">Click to upload photos or drag and drop</p>
                <p className="text-xs text-[#9CA3AF]">PNG,JPG up to 10MB each</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Issues/Notes</label>
            <textarea
              placeholder="Any issues, delays, or important notes..."
              rows={4}
              className="mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm"
            />
          </div>
        </div>

        <div className="px-6 py-3 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded-lg bg-[#2563EB] text-white">
            Report Now
          </button>
        </div>
      </div>
    </div>
  );
}
