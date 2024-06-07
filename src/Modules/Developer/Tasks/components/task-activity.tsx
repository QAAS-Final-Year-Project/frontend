import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { notifications } from "Modules/Tester/Dashboard/data/sample-data";
import NotificationRow from "Modules/Tester/Dashboard/components/notification-row";

const TaskActivity: FC = () => {
  return (
    <CardSectionWrapper
      className='col-span-1'
      title='Notifications'
      icon={"ic:outline-notifications"}
    >
      <div className="">
        {notifications.map((notification, index) => (
          <NotificationRow key={index} {...notification} />
        ))}
      </div>
    </CardSectionWrapper>
  );
};

export default TaskActivity;
