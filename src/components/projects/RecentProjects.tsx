export default function RecentProjects() {
  const projects = [
    {
      name: "Downtown Office Complex",
      code: "PRJ-001",
      manager: "John Smith",
      progress: 65,
      status: "On Track",
      statusBg: "bg-[#DCFCE7]",
      statusText: "text-[#166534]",
    },
    {
      name: "Residential Tower A",
      code: "PRJ-002",
      manager: "Sarah Wilson",
      progress: 35,
      status: "Delayed",
      statusBg: "bg-[#FEE2E2]",
      statusText: "text-[#991B1B]",
    },
    {
      name: "Shopping Mall Renovation",
      code: "PRJ-003",
      manager: "David Lee",
      progress: 0,
      status: "Starting",
      statusBg: "bg-[#FEF9C3]",
      statusText: "text-[#854D0E]",
    },
  ];

  return (
    <div className="rounded-[8px] sm:p-6 p-3 border border-[#F3F4F6] bg-white
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#111827]">
          Recent Projects
        </h3>
        <button className="text-[#2563EB] text-[14px]">
          View All
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {projects.map((p) => (
          <div
            key={p.code}
            className="bg-[#F9FAFB] rounded-[8px] p-4"
          >
            <div className=" mb-3">
              <div>
                <div className="flex items-center justify-between w-full mb-3">
                <p className="text-[16px] text-[#111827]">
                  {p.name}
                </p>
                 <span
                    className={`px-3 py-1 rounded-full min-w-max text-[12px] ${p.statusBg} ${p.statusText}`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[14px] text-[#4B5563]">
                    {p.code} • {p.manager}
                  </p>
                  <span className="text-[14px] text-[#111827]">
                    {p.progress}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[8px] bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
