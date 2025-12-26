import ReactECharts from "echarts-for-react";

export default function LineChart() {
  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Planned", "Actual"] },
    grid: { left: 30, right: 20, bottom: 30, top: 40 },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Planned",
        type: "line",
        smooth: true,
        data: [10, 20, 35, 45, 60],
      },
      {
        name: "Actual",
        type: "line",
        smooth: true,
        data: [8, 18, 30, 40, 55],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 260 }} />;
}
