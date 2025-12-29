import { useState } from "react";
import StatsOverview from "../components/cards/StatCard";
import ExportIcon from "../assets/exportIcon.svg";
import type { StatItem } from "../components/cards/StatCard";
import CustomSelect from "../components/common/CustomSelect";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Project Completion Rate",
    value: "68%",
  },
  {
    key: "completionRate",
    title: "Average Delay Time",
    value: 3.2,
  },
  {
    key: "pendingMaterials",
    title: "Resource Utilization ",
    value: "85%",
  },
  {
    key: "safetyScore",
    title: "Safety Compliance",
    value: "96%",
  },
];

const rows = [
  {
    id: 1,
    project: "Downtown Office Complex",
    actual: 65,
    planned: 70,
    status: "On Track",
  },
  {
    id: 2,
    project: "Downtown Office Complex",
    actual: 35,
    planned: 40,
    status: "Delayed",
  },
  {
    id: 3,
    project: "Downtown Office Complex",
    actual: 0,
    planned: 0,
    status: "Not Started",
  },
  {
    id: 4,
    project: "Downtown Office Complex",
    actual: 100,
    planned: 100,
    status: "Completed",
  },
];

const statusStyles: Record<string, string> = {
  "On Track": "bg-green-100 text-green-700",
  Delayed: "bg-red-100 text-red-600",
  "Not Started": "bg-gray-200 text-gray-600",
  Completed: "bg-blue-100 text-blue-700",
};

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

const timeFilterOptions = [
  { label: "This week", value: "this_week" },
  { label: "Last 3 weeks", value: "last_3_weeks" },
  { label: "This month", value: "this_month" },
  { label: "Last 6 months", value: "last_6_months" },
  { label: "This year", value: "this_year" },
];

const materials = [
  {
    name: "Steel",
    percent: 95,
    used: 950,
    planned: 1000,
    color: "bg-green-600",
  },
  {
    name: "Concrete",
    percent: 96,
    used: 520,
    planned: 500,
    color: "bg-green-600",
  },
  {
    name: "Electrical",
    percent: 90,
    used: 180,
    planned: 200,
    color: "bg-yellow-500",
  },
  {
    name: "Tiles",
    percent: 95,
    used: 285,
    planned: 300,
    color: "bg-green-600",
  },
];

const reports = [
  {
    title: "Safety & Compliance",
    project: "PRJ-001",
    date: "2025-02-10",
    status: "Passed",
    score: "98%",
  },
  {
    title: "Compliance Check",
    project: "PRJ-002",
    date: "2025-02-08",
    status: "Passed",
    score: "95%",
  },
  {
    title: "Equipment Check",
    project: "PRJ-001",
    date: "2025-02-05",
    status: "Warning",
    score: "95%",
  },
  {
    title: "Safety Training",
    project: "PRJ-002",
    date: "2025-02-03",
    status: "Completed",
    score: "100%",
  },
];


export default function Reports() {
const [status, setStatus] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold leading-[36px]">
              KPIs & Reports
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <CustomSelect
              title="This Week"
              options={timeFilterOptions}
              value={status}
              onChange={setStatus}
            />

            <CustomSelect
              title="All Projects"
              options={projectFilterOptions}
              value={status}
              onChange={setStatus}
              width="250px"
            />

            <button className="bg-[#2563EB] h-[38px] gap-2 text-[14px] flex justify-center items-center text-white px-4 rounded-[8px]">
              <img src={ExportIcon} alt="" />
              Export Report
            </button>
          </div>
        </div>
        <StatsOverview stats={stats} />

        <div className="rounded-[8px] bg-white border border-[#F3F4F6] shadow overflow-hidden mt-6">
          <div className="px-6 py-5 border-b">
            <h2 className="text-[20px] font-medium text-[#111827]">
              Project Progress vs Plan
            </h2>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-[#6B7280] border-b">
                <th className="px-6 py-4 font-normal">Project</th>
                <th className="px-6 py-4 font-normal">Actual Progress</th>
                <th className="px-6 py-4 font-normal">Planned Progress</th>
                <th className="px-6 py-4 font-normal">Status</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 even:bg-[#F9FAFB]"
                >
                  {/* Project */}
                  <td className="px-6 py-6 text-sm text-[#111827]">
                    {row.project}
                  </td>

                  {/* Actual Progress */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-[260px] h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${row.actual}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#111827]">
                        {row.actual}%
                      </span>
                    </div>
                  </td>

                  {/* Planned Progress */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-[260px] h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-gray-500 rounded-full"
                          style={{ width: `${row.planned}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#111827]">
                        {row.planned}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${statusStyles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-6 mt-6">
            <div
              className="flex-1 
                rounded-[8px] p-6 border !bg-white border-[#F3F4F6]
                !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
              "
            >
              <h2 className="text-[20px] font-medium text-[#111827] mb-6">
                Material Usage Efficiency
              </h2>

              <div className="space-y-6">
                {materials.map((m) => (
                  <div key={m.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[15px] text-[#111827] font-medium">
                        {m.name}
                      </span>
                      <span className="text-[15px] text-[#111827] font-medium">
                        {m.percent}%
                      </span>
                    </div>

                    <div className="h-[10px] bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.color}`}
                        style={{ width: `${m.percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[14px] text-[#6B7280] mt-2">
                      <span>Used:{m.used}</span>
                      <span>Planned: {m.planned}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
                className="flex-1
                  rounded-[8px] p-6 border !bg-white border-[#F3F4F6]
                  !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
                "
              >
                <h2 className="text-[20px] font-medium text-[#111827] mb-6">
                  Safety & Compliance Report
                </h2>

                <div className="space-y-8">
                  {reports.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <p className="text-[15px] font-semibold text-[#111827]">
                          {item.title}
                        </p>
                        <p className="text-[14px] text-[#6B7280] mt-1">
                          {item.project}, {item.date}
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-[14px] font-medium ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                        <p className="text-[14px] text-[#6B7280] mt-2">
                          Score-{item.score}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        </div>

      </div>
    </div>
  );
}
