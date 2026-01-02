import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CustomSelect from "../common/CustomSelect";

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

const fieldManagerOptions = [
  { label: "All Field Managers", value: "all" },
  { label: "Amit Sharma", value: "FM-001" },
  { label: "Rohit Verma", value: "FM-002" },
  { label: "Neha Patel", value: "FM-003" },
  { label: "Suresh Kumar", value: "FM-004" },
];

export default function ProjectFilters() {
  const [project, setProject] = useState("all");
  const [manager, setManager] = useState("all");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2024-01-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2024-12-31"));

  return (
    <div className="rounded-[8px] sm:p-6 p-3 border !bg-white border-[#F3F4F6] !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">Project</label>
            <CustomSelect
              title="All Requests"
              options={projectFilterOptions}
              value={project}
              onChange={setProject}
              width="100%"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">Start Date</label>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyle,
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">End Date</label>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyle,
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">Field Manager</label>
            <CustomSelect
              title="All Manager"
              options={fieldManagerOptions}
              value={manager}
              onChange={setManager}
              width="100%"
            />
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
}

const inputStyle = {
  height: 40,
  fontSize: 14,
  borderRadius: "10px",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
  },
  "& .MuiPickersOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
    fontSize: 14,
    height: 40,
  },
  "& .MuiPickersInputBase-sectionsContainer": {
    padding: 0,
    fontSize: 14,
  },
};
