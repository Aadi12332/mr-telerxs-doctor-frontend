import ReactECharts from "echarts-for-react";

export default function ProjectDelayComparison() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Delay: ${p.value} days`;
      },
    },

    grid: {
      left: 60,
      right: 30,
      top: 90,
      bottom: 90,
    },

    legend: {
      top: 30,
      left: 24,
      itemGap: 28,
      icon: "roundRect",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 16,
        color: "#374151",
      },
      data: [
        { name: "On Time (< 3 days)", itemStyle: { color: "#22C55E" } },
        { name: "Warning (3-7 days)", itemStyle: { color: "#F97316" } },
        { name: "Critical (> 7 days)", itemStyle: { color: "#EF4444" } },
      ],
    },

    xAxis: {
      type: "category",
      data: [
        "Downtown Office",
        "Residential Tower",
        "Shopping Mall",
        "Highway Bridge",
        "Industrial Warehouse",
        "Medical Center",
      ],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
        rotate: 30,
        interval: 0,
          formatter: (value: string) => {
            const words = value.split(" ");
            return words.length > 2
              ? `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`
              : value;
          },
      },
    },


    yAxis: {
      type: "value",
      min: 0,
      max: 15,
      interval: 3,
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "#E5E7EB",
        },
      },
    },

    series: [
      {
        type: "bar",
        barWidth: 34,
        data: [
          { value: 2, itemStyle: { color: "#10B981" } }, // Downtown Office
          { value: 8, itemStyle: { color: "#EF4444" } }, // Residential Tower
          { value: 5, itemStyle: { color: "#F97316" } }, // Shopping Mall
          { value: 1, itemStyle: { color: "#10B981" } }, // Highway Bridge
          { value: 12, itemStyle: { color: "#EF4444" } }, // Industrial Warehouse
          { value: 0, itemStyle: { color: "#F97316" } }, // Medical Center
        ],
        label: {
          show: true,
          position: "top",
          formatter: "{c}d",
          fontSize: 14,
          color: "#374151",
        },
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
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
          Project Delay (Days) Comparison
        </h3>
      </div>

      <div className="">
        <ReactECharts
          option={option}
          style={{ height: 400 }}
          notMerge
          lazyUpdate
        />
      </div>
    </div>
  );
}
