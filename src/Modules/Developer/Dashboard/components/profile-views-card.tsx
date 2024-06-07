import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";

const ProfileViewsCard: FC = () => {
  const data: ChartData<"line"> = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Views",
        backgroundColor: "rgba(42,65,232,0.08)",
        
        borderColor: "#2a41e8",
        borderWidth: 3,
        data: [196, 132, 215, 362, 210, 252],
        pointRadius: 5,
        pointHoverRadius: 5,
        tension: 0.4,
        pointHitRadius: 10,
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointBorderWidth: 2,
        fill:true
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        border:{dash: [6, 10]}, // for the grid lines
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
      },
    },
  };
  return (
    <CardSectionWrapper
      className='col-span-2'
      title='Your Profile Views'
      icon={"ic:baseline-bar-chart"}
    >
      <div className='pt-[30px] pr-[20px] pb-[17px] pl-[18px] w-full'>
        <LineChart data={data} options={options} />
      </div>
    </CardSectionWrapper>
  );
};

export default ProfileViewsCard;
