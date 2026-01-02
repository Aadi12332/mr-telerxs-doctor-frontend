import { useState } from "react";
import CustomSelect from "./common/CustomSelect";

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

export default function NewTaskModel({
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
            New Task
          </h2>
        </div>

        <div className="px-6 py-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827]">Task Name</label>
              <input
                placeholder="Enter"
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
                Assigned To
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
              <label className="text-sm text-[#111827]">Deadline</label>
              <input
                placeholder="dd - mm - yyyy"
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Priority
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
              <label className="text-sm text-[#111827] inline-block mb-2">
                Status
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

          <div>
            <label className="text-sm text-[#111827]">Description</label>
            <textarea
              placeholder="Describe the work"
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
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
