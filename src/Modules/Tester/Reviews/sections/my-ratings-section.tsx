import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import React from "react";
import { sampleReviewData } from "../data/sample-data";
import ReviewRow from "../components/review-row";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { getTasks } from "Modules/Developer/Tasks/duck/fetch";
import ShimmerReviewRow from "../components/review-shimmer";
import PaginationComponent from "Shared/components/nav/pagination";
import useTableData from "Shared/utils/use-table-data";
import PlaceBidContainer from "Modules/Home/SingleTask/place-bid";
import ReviewTaskContainer from "../leave-review";

type Props = {};

const MyRatingsSection = (props: Props) => {
  const navigate = useNavigate();
  const [page] = useUrlState<number>("page", 1);
  const [pageSize] = useUrlState<number>(
    "pageSize",
    AppConfig.constants.pageSize
  );
  const [search, setSearch] = useUrlState<string>("search", "");
  const [fromDate] = useUrlState<any>("fromDate");
  const [toDate] = useUrlState<any>("toDate");
  const [current, setCurrent] = useUrlState("current");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");

  const dispatchAction = (
    id: string,
    action: "delete" | "update" | "review"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["rate-testers", page, pageSize, search, fromDate, toDate],
    queryFn: () =>
      getTasks({
        page,
        pageSize,
        search,
        fromDate,
        toDate,
        status: "Completed",
        // searchFields: ["name", "code", "description", "title"],
      }),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  const data = useTableData({
    rows: queryData?.data?.rows || [],
    count: queryData?.data?.total || 0,
  });
  return (
    <section>
      <CardSectionWrapper
        className='col-span-1'
        title='My Ratings'
        icon={"ic:outline-supervised-user-circle"}
      >
        {isLoading && (
          <>
            {[1, 2].map((index) => (
              <ShimmerReviewRow />
            ))}
          </>
        )}
        {data?.rows.map((task) => (
          <>
            <ReviewRow
              key={task._id}
              taskName={task?.title}
              isRated={!!task?.testerRatedAt}
              rating={task?.testerRating?.rating}
              date={task?.testerRatedAt}
              review={task?.testerRating?.review}
              // onReview={() => dispatchAction(task._id, "review")}
            />
          </>
        ))}
      </CardSectionWrapper>
      {<PaginationComponent data={data} />}
    </section>
  );
};

export default MyRatingsSection;
