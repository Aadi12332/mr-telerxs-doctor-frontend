import ReactECharts from "echarts-for-react";

export default function BarChart() {
  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Expected", "Delivered"] },
    xAxis: {
      type: "category",
      data: ["W1", "W2", "W3", "W4"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Expected",
        type: "bar",
        data: [5, 8, 6, 10],
      },
      {
        name: "Delivered",
        type: "bar",
        data: [3, 6, 4, 8],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <ReactECharts option={option} style={{ height: 260 }} />
    </div>
  );
}
