import { FC } from "react";
import OverviewCard from "../components/overview-card";
import { useQuery } from "@tanstack/react-query";
import { getDashboardOverviewSummary } from "../duck/fetch";
import OverviewShimmerCard from "../components/overview-shimmer-card";
import numeral from "numeral";

const OverviewSection: FC = () => {
  const query = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: () => getDashboardOverviewSummary(),
  });
  return (
    <div className='grid grid-cols-4 gap-[30px]'>
      {query.isLoading ? (
        [1, 2, 3, 4].map((i) => <OverviewShimmerCard key={i} />)
      ) : (
        <>
          <OverviewCard
            bgColor='bg-pink-500'
            textColor='text-pink-500'
            icon='ic:outline-business-center'
            title={"Task Bids Won"}
            value={query?.data?.data?.tasksCreated || 0}
          />
          <OverviewCard
            bgColor='bg-green-500'
            textColor='text-green-500'
            icon='ic:outline-gavel'
            title={"Tasks Completed"}
            value={query?.data?.data?.tasksCompleted || 0}
          />
          <OverviewCard
            bgColor='bg-amber-500'
            textColor='text-amber-500'
            icon='ic:outline-rate-review'
            title={"Reviews"}
            value={query?.data?.data?.reviews || 0}
          />
          <OverviewCard
            bgColor='bg-blue-500'
            textColor='text-blue-500'
            icon='ic:baseline-payment'
            title={"Total Deposits (GHC)"}
            value={numeral(query?.data?.data?.totalDeposits || 0).format("0,0.00")}
          />
        </>
      )}
    </div>
  );
};

export default OverviewSection;
