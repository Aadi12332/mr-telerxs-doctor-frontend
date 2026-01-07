import ReactECharts from "echarts-for-react";

export function ConsultationTrend() {
  const option = {
    grid: {
      left: 40,
      right: 20,
      top: 40,
      bottom: 40,
    },
    xAxis: {
      type: "category",
      data: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
        data: [38, 56, 89, 44, 62, 71],
        barWidth: 36,
        itemStyle: {
          color: "#2F6EA3",
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
