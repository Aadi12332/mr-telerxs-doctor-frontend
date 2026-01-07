import ReactECharts from "echarts-for-react";

export function TopPatientConditions() {
  const option = {
    grid: {
      left: 40,
      right: 20,
      top: 40,
      bottom: 60,
    },
    xAxis: {
      type: "category",
      data: [
        "Respiratory",
        "Dermatology",
        "Migraine",
        "Allergy",
        "Arthritis",
        "General",
      ],
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#CFCFCF",
        },
      },
    },
    series: [
      {
        type: "bar",
        data: [76, 67, 51, 36, 52, 81],
        barWidth: 36,
        itemStyle: {
          color: "#3E8E2B",
          borderRadius: [6, 6, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          color: "#7A7A7A",
          fontSize: 14,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
