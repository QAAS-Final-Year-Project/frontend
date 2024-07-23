import { Icon } from "@iconify/react";
import React, { FC } from "react";
import TaskDetailsBidderRow from "./task-details-didder-row";
import { classNames } from "Shared/utils/ui";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import useTableData from "Shared/utils/use-table-data";
import { getSingleTesterTaskAndReviews } from "Modules/Home/duck/fetch";
import TesterShimmerReviewRow from "./tester-review-shimmer";
import TesterReviewRow from "./tester-review-row";
import _ from "lodash";
import PaginationComponent from "Shared/components/nav/pagination";

const TesterTaskHistory: FC = ({}) => {
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
  const { id } = useParams();

  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [id, "tester-tasks", page, pageSize, search, fromDate, toDate],
    queryFn: () =>
      getSingleTesterTaskAndReviews(id, {
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
    <div className='flex flex-col items-stretch'>
      <div className='rounded  bg-zinc-100 py-5 px-[35px]'>
        <h3 className='text-zinc-800 text-lg font-medium   flex items-center gap-x-2'>
          <Icon
            icon={"ic:outline-thumb-up"}
            className='w-5 h-5 block text-blue-700 mr-1'
          />
          Work History and Feedback
        </h3>
      </div>
      {isLoading && (
        <>
          {[1, 2].map((index) => (
            <TesterShimmerReviewRow />
          ))}
        </>
      )}
      <div className=' mb-10  '>
        {data?.rows.map((task, index) => (
          <>
            <TesterReviewRow
              key={task._id}
              idx={index}
              taskName={task?.title}
              isRated={!!task?.testerRatedAt}
              rating={task?.testerRating?.rating}
              date={task?.testerRatedAt}
              review={task?.testerRating?.review}
              // onReview={() => dispatchAction(task._id, "review")}
            />
          </>
        ))}
      </div>

      {!isLoading && _.isEmpty(data?.rows) && (
        <div className='py-8'>
          <div className='text-center text-lg text-zinc-600'>
            This tester has not completed any tasks yet.
          </div>
        </div>
      )}
      {!_.isEmpty(data?.rows) && <PaginationComponent data={data} hideDirectionControls/>}
    </div>
  );
};

export default TesterTaskHistory;
