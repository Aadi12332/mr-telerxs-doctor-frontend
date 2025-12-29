import { useState } from "react";
import type { StatItem } from "../components/cards/StatCard";
import StatsOverview from "../components/cards/StatCard";
import AssignedIcon from "../assets/assignedicon.svg";
import MeetingIcon from "../assets/meetingicon.svg";
import RedAlertIcon from "../assets/redalerticon.svg";
import ReminderIcon from "../assets/remindericon.svg";

const filters = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread", count: 3 },
  { label: "Leads", value: "leads", count: 2 },
  { label: "Tasks", value: "tasks", count: 2 },
  { label: "Meetings", value: "meetings", count: 2 },
  { label: "Escalations", value: "escalations", count: 1 },
];

const notifications = [
  {
    id: 1,
    title: "New lead assigned",
    description: "Alice Johnson from tech solutions has been assigned to you.",
    time: "2 minutes ago",
    priority: "High priority",
    type: "Meeting",
    iconBg: "bg-blue-100",
    icon: AssignedIcon,
  },
  {
    id: 2,
    title: "Task Reminder",
    description: "Follow up with Bob Smith is due in 30 minutes",
    time: "30 minutes ago",
    priority: "High priority",
    type: "Lead",
    iconBg: "bg-yellow-100",
    icon: ReminderIcon,
  },
  {
    id: 3,
    title: "AI escalation assigned",
    description: "Customer support case ESC-001 requires your attention",
    time: "1 hour ago",
    priority: "High priority",
    type: "Task",
    iconBg: "bg-red-100",
    icon: RedAlertIcon,
  },
  {
    id: 4,
    title: "Meeting scheduled",
    description: "Meeting with Design studio confirmed for tomorrow at 2 pm",
    time: "2 hours ago",
    priority: "Medium priority",
    type: "Meeting",
    iconBg: "bg-blue-100",
    icon: MeetingIcon,
  },
];

const priorityStyle = (priority: string) =>
  priority.includes("High")
    ? "bg-[#FEE2E2] text-[#BF0000]"
    : "bg-[#E5E7EB] text-[#CA8C16]";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Total",
    value: 8,
  },
  {
    key: "completionRate",
    title: "Unread",
    value: 3,
  },
  {
    key: "pendingMaterials",
    title: "High Priority",
    value: 3,
  },
  {
    key: "safetyScore",
    title: "Today",
    value: 5,
  },
];

export default function Notifications() {
  const [active, setActive] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-8">
          <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold mb-2 leading-[36px]">
            Notifications
          </h1>
          <p className="text-[#4B5563] lg:text-[16px] text-[14px]">
            Stay updated with your latest activities and alerts
          </p>
        </div>
        <StatsOverview stats={stats} />
      </div>
      <div
        className="
            rounded-[8px] p-6 px-10 border !bg-white border-[#F3F4F6]
            !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
          "
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[#111827] text-[17px]">Filter by:</span>

          {filters.map((item) => {
            const isActive = active === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setActive(item.value)}
                className={`
                    px-6 py-2 rounded-[8px] text-sm transition
                    ${
                      isActive
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#F3F4F6] text-[#4B5563]"
                    }
                  `}
              >
                {item.label}
                {item.count !== undefined && (
                  <span className="ml-1">({item.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div
        className="
        rounded-[8px] border !bg-white border-[#F3F4F6] py-10
        !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
      "
      >
        <div className="divide-y">
          {notifications.map((item) => (
            <div key={item.id} className="flex gap-4 px-10 pb-6 last:pb-0 pt-6 first:pt-0">
              <div
                className={`w-10 min-w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.iconBg}`}
              >
                <img src={item.icon} alt="" />
              </div>

              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#4B5563]">
                  {item.title}
                </p>
                <p className="text-[14px] text-[#3D3D3D] mt-1.5">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-[12px] text-[#3D3D3D]">
                    {item.time}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[13px] font-medium ${priorityStyle(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>

                  <span className="px-3 py-1 rounded-full text-[12px] bg-[#F3F4F6] text-[#3D3D3D]">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
