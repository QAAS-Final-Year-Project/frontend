import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import PaymentRow from "./payment-row";
import { useQuery } from "@tanstack/react-query";
import { getLatestDeveloperPayments } from "../duck/fetch";
import PaymentShimmerRow from "./payment-shimmar-row";

const PaymentsOverviewList: FC = () => {
  const query = useQuery({
    queryKey: ["latest-payments"],
    queryFn: () => getLatestDeveloperPayments(),
  });
  return (
    <CardSectionWrapper
      className='col-span-1 h-full'
      title='Payments'
      icon={"ic:outline-assignment"}
    >
      <div>
        {query.isLoading ? (
          [1, 2].map((i) => <PaymentShimmerRow key={i} />)
        ) : !query?.data?.data || query?.data?.data?.length === 0 ? (
          <div className='flex items-center justify-center h-[100px]'>
            No Payments
          </div>
        ) : (
          query?.data?.data?.map((payment, index) => (
            <PaymentRow key={index} {...payment} />
          ))
        )}
      </div>
    </CardSectionWrapper>
  );
};

export default PaymentsOverviewList;
