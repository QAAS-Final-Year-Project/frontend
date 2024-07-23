import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";

const PaymentOverViewSection: FC<{ data: any }> = ({ data }) => {
  const chartData: ChartData<"line"> = {
    labels:
      data?.length > 1
        ? data?.map((item: any) => item?.month || "")
        : ["", ...data?.map((item: any) => item?.month || "")],
    datasets: [
      {
        label: "Amount",
        backgroundColor: "rgba(42,65,232,0.08)",

        borderColor: "#2a41e8",
        borderWidth: 3,
        data:
          data?.length > 1
            ? data?.map((item: any) => item.count || 0)
            : [0, ...data?.map((item: any) => item.count || 0)],
        pointRadius: 5,
        pointHoverRadius: 5,
        tension: 0.4,
        pointHitRadius: 10,
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 10,
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: "#333",
        titleFont: {
          size: 13,
        },
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          size: 13,
        },
        displayColors: false,
        padding: {
          x: 10,
          y: 10,
        },
        intersect: false,
      },
    },
    scales: {
      y: {
        border: { dash: [6, 10] }, // for the grid lines
        ticks: {
          precision: 0,
        },
        grid: {
          tickBorderDash: [6, 10],
          color: "#d8d8d8",
          lineWidth: 1,
        },
        title: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        ticks: {
          autoSkip: true, // Ensure that even a single tick is displayed properly
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };
  return (
    <CardSectionWrapper
      className='col-span-2'
      title='Earnings Overview'
      icon={"ic:baseline-bar-chart"}
    >
      <div className='pt-[30px] pr-[20px] pb-[17px] pl-[18px] w-full h-96 '>
        <LineChart data={chartData} options={options} />
      </div>
    </CardSectionWrapper>
  );
};

export default PaymentOverViewSection;
