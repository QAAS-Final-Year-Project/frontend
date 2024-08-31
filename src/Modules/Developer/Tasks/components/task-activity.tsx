import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { notifications } from "Modules/Tester/Dashboard/data/sample-data";
import TaskActivityRow from "./task-activity-row";
import { useCookies } from "react-cookie";
import _ from "lodash";

const TaskActivity: FC<{ data: any }> = ({ data }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });  
  const parsedUser = cookies.user ? JSON.parse(cookies.user) : null;

  const history = data?.history;
  const historyReversed = history?.slice()?.reverse();
  return (
    <div className=''>
      {historyReversed?.map((history, index) => (
        <TaskActivityRow
          key={index}
          action={history?.action}
          actorName={
            parsedUser?._id == history?.actor?._id
              ? "You"
              : history?.actor?.fullName
          }
          date={history?.timestamp}
        />
      ))}
    </div>
  );
};

export default TaskActivity;
