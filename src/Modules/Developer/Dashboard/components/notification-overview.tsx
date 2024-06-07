import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { notifications } from "../data/sample-data";
import PaymentRow from "./notification-row";

const NotificationsOverviewList: FC = () => {
  return (
    <CardSectionWrapper
      className='col-span-1'
      title='Notifications'
      icon={"ic:outline-notifications"}
    >
      <div className="">
        {notifications.map((notification, index) => (
          <PaymentRow key={index} {...notification} />
        ))}
      </div>
    </CardSectionWrapper>
  );
};

export default NotificationsOverviewList;
