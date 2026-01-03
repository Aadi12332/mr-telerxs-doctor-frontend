import ReactECharts from "echarts-for-react";

export default function ResourceUtilizationDistribution() {
  const colors = [
    "#3B82F6", // Labor
    "#3B82F6", // Material
    "#3B82F6", // Equipment
    "#3B82F6", // Admin
  ];

  const option = {
    tooltip: { show: false },

    series: [
      // 🔹 Base grey ring
      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 1,
            itemStyle: { color: "#E5E7EB" },
          },
        ],
      },

      // 🔹 Colored ticks + gaps
      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        silent: true,
        startAngle: 90,
        clockwise: true,
        label: { show: false },
        labelLine: { show: false },

        data: colors.flatMap((c:any) => [
          {
            value: 0.3, 
            itemStyle: { color: "#F59E0B" },
          },
          {
            value: 1.2, 
            itemStyle: {
              color: c,
            },
          },
          {
            value: 0.3, 
            itemStyle: { color: "#F59E0B" },
          },
          {
            value: 4.8,
            itemStyle: { color: "transparent" },
          },
        ]),

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

      {/* Chart */}
      <div className="relative h-[260px]">
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[28px] font-semibold text-[#111827]">
            80%
          </p>
          <p className="text-[14px] text-gray-500">
            Total Utilization
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6 grid grid-cols-2 gap-y-4 gap-x-10">
        <Legend color="#3B82F6" label="Labor" value="78%" />
        <Legend color="#10B981" label="Equipment" value="85%" />
        <Legend color="#F59E0B" label="Material" value="92%" />
        <Legend color="#8B5CF6" label="Admin" value="65%" />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="w-3.5 h-3.5 rounded-full mt-1"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-[14px] text-[#1F2937] leading-tight">
          {label}
        </p>
        <p className="text-[13px] text-gray-500">
          {value}
        </p>
      </div>
    </div>
  );
}
