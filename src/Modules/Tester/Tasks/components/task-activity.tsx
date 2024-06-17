import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { notifications } from "Modules/Tester/Dashboard/data/sample-data";
import TaskActivityRow from "./task-activity-row";
import useCookies from "Shared/hooks/cookies";

const TaskActivity: FC<{ data: any }> = ({ data }) => {
  const [user] = useCookies("user");
  const parsedUser = JSON.parse(user);
  return (
    <div className=''>
      {data?.history?.map((history, index) => (
        <TaskActivityRow
          key={index}
          action={history?.action}
          actorName={
            parsedUser?._id == history?.actor?._id ? "You" : history?.actor?.fullName
          }
          date={history?.timestamp}
        />
      ))}
    </div>
  );
};

export default TaskActivity;
