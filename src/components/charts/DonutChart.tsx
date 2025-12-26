import ReactECharts from "echarts-for-react";

export default function DonutChart() {
  const option = {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: "bold" },
        },
        data: [
          { value: 80, name: "Used" },
          { value: 20, name: "Free" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <ReactECharts option={option} style={{ height: 260 }} />
    </div>
  );
}
