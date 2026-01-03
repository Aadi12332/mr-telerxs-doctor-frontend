import ReactECharts from "echarts-for-react";

export default function ProjectDelayComparison() {
  const categories = [
    "Downtown Office",
    "Residential Tower",
    "Shopping Mall",
    "Highway Bridge",
    "Industrial Warehouse",
    "Medical Center",
  ];

  const onTimeData = [
    { value: 2, itemStyle: { color: "#10B981" } }, // Downtown Office
    null,
    null,
    { value: 1, itemStyle: { color: "#10B981" } }, // Highway Bridge
    null,
    { value: 0, itemStyle: { color: "#10B981" } }, // Medical Center
  ];

  const warningData = [
    null,
    null,
    { value: 5, itemStyle: { color: "#F97316" } }, // Shopping Mall
    null,
    null,
    null,
  ];

  const criticalData = [
    null,
    { value: 8, itemStyle: { color: "#EF4444" } }, // Residential Tower
    null,
    null,
    { value: 12, itemStyle: { color: "#EF4444" } }, // Industrial Warehouse
    null,
  ];

 const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: any[]) => {
      const valid = params.find(
        (p) => typeof p.value === "number" && p.value > 0
      );
      if (!valid) return "";
      return `${valid.name}<br/>Delay: ${valid.value} days`;
    },
  },

  grid: {
    left: 40,
    right: 20,
    top: 80,
    bottom: 80,
    containLabel: true,
  },

  legend: {
    top: 20,
    left: 16,
    itemGap: 20,
    icon: "roundRect",
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 14,
      color: "#374151",
    },
  },

  xAxis: {
    type: "category",
    data: categories,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: "#6B7280",
      fontSize: 12,
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
      lineStyle: { color: "#E5E7EB" },
    },
  },

  series: [
    {
      name: "On Time (< 3 days)",
      type: "bar",
      barWidth: 34,
      color: "#10B981",
      data: onTimeData,
      itemStyle: { borderRadius: [6, 6, 0, 0] },
      label: {
        show: true,
        position: "top",
        formatter: (p: any) => (p.value ? `${p.value}d` : ""),
        fontSize: 13,
      },
    },
    {
      name: "Warning (3-7 days)",
      type: "bar",
      barWidth: 34,
      color: "#F97316",
      data: warningData,
      itemStyle: { borderRadius: [6, 6, 0, 0] },
      label: {
        show: true,
        position: "top",
        formatter: (p: any) => (p.value ? `${p.value}d` : ""),
        fontSize: 13,
      },
    },
    {
      name: "Critical (> 7 days)",
      type: "bar",
      barWidth: 34,
      color: "#EF4444",
      data: criticalData,
      itemStyle: { borderRadius: [6, 6, 0, 0] },
      label: {
        show: true,
        position: "top",
        formatter: (p: any) => (p.value ? `${p.value}d` : ""),
        fontSize: 13,
      },
    },
  ],

  media: [
    {
      query: { maxWidth: 480 },
      option: {
        grid: {
          left: 30,
          right: 16,
          bottom: 110,
        },
        xAxis: {
          axisLabel: {
            rotate: 45,
            fontSize: 10,
          },
        },
        series: [
          { barWidth: 18 },
          { barWidth: 18 },
          { barWidth: 18 },
        ],
        legend: {
        bottom: 8,
        left: "center",
        top: "auto",
        orient: "horizontal",
        itemGap: 12,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 11,
        },
      },
      },
    },

    {
      query: { maxWidth: 768 },
      option: {
        grid: {
          bottom: 10,
        },
        xAxis: {
          axisLabel: {
            rotate: 35,
            fontSize: 11,
          },
        },
        series: [
          { barWidth: 24 },
          { barWidth: 24 },
          { barWidth: 24 },
        ],
        legend: {
        top: 16,
        left: "center",
        itemGap: 16,
        textStyle: {
          fontSize: 12,
        },
      },

      },
    },
  ],
};


  return (
    <div className="rounded-[8px] bg-white border border-[#F3F4F6] shadow">
      <div className="lg:px-6 px-3 py-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#1F2937]">
          Project Delay (Days) Comparison
        </h3>
      </div>

<ReactECharts
  option={option}
  style={{ height: 400, width: "100%" }}
  opts={{ renderer: "canvas" }}
  notMerge
  lazyUpdate
/>
    </div>
  );
}
