export default function UrgentTasks() {
  const tasks = [
    {
      title: "Foundation Inspection",
      project: "Downtown Office",
      deadline: "2024-01-20",
      priority: "High",
      badgeBg: "bg-[#FEE2E2]",
      badgeText: "text-[#991B1B]",
    },
    {
      title: "Material Delivery",
      project: "Residential Tower",
      deadline: "2024-01-20",
      priority: "Medium",
      badgeBg: "bg-[#FEF9C3]",
      badgeText: "text-[#854D0E]",
    },
    {
      title: "Safety Audit",
      project: "Mall Renovation",
      deadline: "2024-01-20",
      priority: "High",
      badgeBg: "bg-[#FEE2E2]",
      badgeText: "text-[#991B1B]",
    },
  ];

  return (
    <div
      className="rounded-[8px] bg-white border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="lg:px-6 px-3 py-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#111827]">
          Urgent Tasks
        </h3>
      </div>

      <div className="lg:p-6 p-3 lg:space-y-6 space-y-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="flex items-start gap-4 border-l-4 border-[#F87171] lg:pl-5 pl-2">
            <div className="flex-1">
              <p className="text-[16px] text-[#111827]">
                {task.title}
              </p>
              <p className="text-[14px] text-[#4B5563]">
                {task.project}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] text-[#6B7280] mt-2">
                  Deadline:
                  <br />
                  {task.deadline}
                </p>
                <span
                className={`h-fit px-3 py-1 rounded-full text-[13px] font-medium ${task.badgeBg} ${task.badgeText}`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-4 text-center">
        <button className="text-[#2563EB] text-[14px]">
          View All Tasks
        </button>
      </div>
    </div>
  );
}
