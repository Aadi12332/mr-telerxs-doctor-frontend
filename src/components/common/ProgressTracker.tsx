export default function ProjectOverviewCard() {
  const completed = 16;
  const total = 24;
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-[8px] lf:p-8 p-3 border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">

      <div className="mb-8">
        <h2 className="text-[20px] font-semibold text-[#111827]">
          Downtown Office Complex
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">PRJ-001</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-10 gap-6">
        <div>
          <h3 className="text-[16px] font-semibold mb-4">Task Progress</h3>

          <div className="flex justify-between text-sm text-[#6B7280] mb-2">
            <span>Completed Tasks</span>
            <span className="text-[#111827] font-medium">
              {completed}/{total}
            </span>
          </div>

          <div className="h-3 bg-[#E5E7EB] rounded-full mb-6">
            <div
              className="h-3 bg-[#5DBB63] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex gap-12 mb-8">
            <div className="text-center">
              <p className="text-[#5DBB63] text-[22px] font-semibold">
                {completed}
              </p>
              <p className="text-[#6B7280] text-sm">Completed</p>
            </div>

            <div className="text-center">
              <p className="text-[#2563EB] text-[22px] font-semibold">5</p>
              <p className="text-[#6B7280] text-sm">In Progress</p>
            </div>

            <div className="text-center">
              <p className="text-[#111827] text-[22px] font-semibold">3</p>
              <p className="text-[#6B7280] text-sm">Pending</p>
            </div>
          </div>

          <h3 className="text-[16px] font-semibold mb-4">Timeline Status</h3>

          <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Planned Completion</span>
              <span className="font-medium text-[#111827]">
                2024-06-30
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Current Estimate</span>
              <span className="font-medium text-[#111827]">
                2024-06-30
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Status</span>
              <span className="font-medium text-[#5DBB63]">
                On Track
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[18px] font-semibold mb-6">
            Project Milestones
          </h3>

          <div className="space-y-6">
            {[
              {
                title: "Foundation Complete",
                status: "Completed",
                color: "#1D4ED8",
              },
              {
                title: "Structure Complete",
                status: "In progress",
                color: "#22C55E",
              },
              {
                title: "Interior Work",
                status: "Pending",
                color: "#D1D5DB",
              },
              {
                title: "Final Inspection",
                status: "Pending",
                color: "#FB923C",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-start"
              >
                <div className="flex gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium text-[#374151]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      {item.status}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-[#6B7280]">
                  2024-02-15
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
