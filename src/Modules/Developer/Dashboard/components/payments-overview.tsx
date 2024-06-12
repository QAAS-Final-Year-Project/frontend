import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { notifications, payments } from "../data/sample-data";
import PaymentRow from "./payment-row";

const PaymentsOverviewList: FC = () => {
  return (
    <CardSectionWrapper
      className='col-span-1 h-min'
      title='Payments'
      icon={"ic:outline-assignment"}
    >
      <div>
        {payments.map((payment, index) => (
          <PaymentRow key={index} {...payment} />
        ))}
      </div>
    </CardSectionWrapper>
  );
};

export default PaymentsOverviewList;
