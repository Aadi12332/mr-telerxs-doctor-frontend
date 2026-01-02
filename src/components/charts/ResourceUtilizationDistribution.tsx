import ReactECharts from "echarts-for-react";

export default function ResourceUtilizationDistribution() {
  const data = [
    { name: "Labor", value: 78, color: "#3B82F6" },
    { name: "Material", value: 92, color: "#F59E0B" },
    { name: "Equipment", value: 85, color: "#10B981" },
    { name: "Admin", value: 65, color: "#8B5CF6" },
  ];

  const option = {
    tooltip: { show: false },

    series: [
      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        clockwise: true,
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },

        data: data.map((d) => ({
          value: d.value,
          name: d.name,
          itemStyle: {
            color: d.color,
            borderColor: "#fff",
            borderWidth: 6,
          },
        })),
      },
      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 100,
            itemStyle: { color: "#F3F4F6" },
          },
        ],
      },
    ],
  };

  return (
    <div
      className="rounded-[8px] bg-white border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="lg:px-6 px-3 py-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#1F2937]">
          Resource Utilization Distribution
        </h3>
      </div>

      <div className="relative h-[260px]">
        <ReactECharts option={option} style={{ height: "100%" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[28px] font-semibold text-[#111827]">80%</p>
          <p className="text-[14px] text-gray-500">
            Total Utilization
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 grid grid-cols-2 gap-y-4 gap-x-8">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <div>
              <p className="text-[14px] text-[#1F2937]">{d.name}</p>
              <p className="text-[13px] text-gray-500">{d.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
