import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { getTasks } from "Modules/Developer/Tasks/duck/fetch";
import PaginationComponent from "Shared/components/nav/pagination";
import useTableData from "Shared/utils/use-table-data";
import Loader from "Shared/components/suspense/loader";
import TaskBookMarkShimmer from "../components/task-bookmark-shimmer";
import TaskBookMarkRow from "../components/task-bookmark-row";
import { doDeleteBookmark, getBookMarks } from "../duck/fetch";
import EmptyComponent from "Shared/components/suspense/empty";
import SortSelect from "Shared/components/input/sort-select";
type Props = {};
const sortOptions = [
  { name: "Oldest", href: "createdAt" },
  { name: "Latest", href: "-createdAt" },
  { name: "Bidders: Highest First", href: "-meta.biddersCount" },
  { name: "Bidders: Lowest First", href: "meta.biddersCount" },
  { name: "Bid Amount: Lowest First", href: "amount" },
  { name: "Bid Amount: Highest First", href: "-amount" },
  { name: "Deadline: Earliest First", href: "deadlineDate" },
  { name: "Deadline: Latest First", href: "-deadlineDate" },
];
const BookmarkedTasksSection = (props: Props) => {
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
  const [sortBy, setSortBy] = useUrlState("sortBy", "-createdAt");

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
    queryKey: [
      "tester-bookmark-tasks",
      // page,
      // pageSize,
      // search,
      // fromDate,
      // toDate,
      sortBy,
    ],
    queryFn: () =>
      getBookMarks({
        // page,
        // pageSize,
        // search,
        // fromDate,
        // toDate,
        type: "Task",
        populate: ["task"],
        sort: sortBy,
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

  const removeBookmarkMutation = useMutation({
    mutationFn: doDeleteBookmark,
    onSuccess: (response) => {
      refetch();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  return (
    <section>
      <CardSectionWrapper
        icon={"ic:outline-business-center"}
        title='Bookmarked Tasks'
        extraElement={
          <SortSelect
            options={sortOptions}
            setFieldValue={(_, value) => {
              console.log(value);
              setSortBy(value);
            }}
            values={{
              sortBy,
            }}
            id='sortBy'
          />
        }
      >
        {isLoading && (
          <>
            {[1, 2].map((index) => (
              <TaskBookMarkShimmer />
            ))}
          </>
        )}
        {!isLoading && (
          <>
            {data?.rows?.length > 0 ? (
              data?.rows.map((bookmark) => (
                <>
                  <TaskBookMarkRow
                    key={bookmark._id}
                    taskId={bookmark?.task._id}
                    title={bookmark?.task.title}
                    _id={bookmark._id}
                    date={bookmark?.task.date}
                    biddersCount={bookmark?.task?.meta?.biddersCount}
                    amount={bookmark?.task.amount}
                    deadlineDate={bookmark?.task?.deadlineDate}
                    onDelete={() => removeBookmarkMutation.mutate(bookmark._id)}
                  />
                  {/* <PaginationComponent data={data} /> */}
                </>
              ))
            ) : (
              <EmptyComponent
                title='boomarked tasks'
                subTitle='Your bookmarked tasks will appear here'
              />
            )}
          </>
        )}
      </CardSectionWrapper>
    </section>
  );
};

export default BookmarkedTasksSection;
