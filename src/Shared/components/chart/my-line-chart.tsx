// LineChart.tsx
import React, { useId } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions, Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.defaults.font.family = "Nunito";
Chart.defaults.color = '#888';
Chart.defaults.font.size = 14;

interface LineChartProps {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  const id = useId();
  return <Line data={data} options={options} id={id} />;
};

export default LineChart;
