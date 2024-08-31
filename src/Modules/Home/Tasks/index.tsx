import { FC } from "react";
import HomeTasksFilterSection from "./sections/filter-section";
import HomeTasksListSection from "./sections/list-section";
import { useQuery } from "@tanstack/react-query";
import { getHomeTasks } from "../duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";

const TasksSearchPage: FC = () => {
  const navigate = useNavigate();
  const [page] = useUrlState<number>("page", 1);
  const [pageSize] = useUrlState<number>("pageSize", 6);
  const [search, setSearch] = useUrlState<string>("search");
  const [fromDate] = useUrlState<any>("fromDate");
  const [minAmount] = useUrlState<number>("minAmount");
  const [maxAmount] = useUrlState<number>("maxAmount");
  const [minBiddersCount] = useUrlState<number>("minBiddersCount");
  const [maxBiddersCount] = useUrlState<number>("maxBiddersCount");
  const [toDate] = useUrlState<any>("toDate");
  const [current, setCurrent] = useUrlState("current");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [sortBy, setSortBy] = useUrlState("sortBy", "-createdAt");
  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [
      "home-tasks",
      page,
      pageSize,
      search,
      fromDate,
      toDate,
      sortBy,
      minAmount,
      maxAmount,
      minBiddersCount,
      maxBiddersCount,
    ],
    queryFn: () =>
      getHomeTasks({
        page,
        pageSize,
        search,
        fromDate,
        searchFields: ["title", "tags", "description"],
        toDate,
        isExpired: false,
        sort: sortBy,
        minAmount,
        maxAmount,
        minBiddersCount,
        maxBiddersCount,
      }),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  return (
    <main className='flex '>
      <HomeTasksFilterSection />
      <HomeTasksListSection
        refetch={refetch}
        isLoading={isLoading}
        rows={queryData?.data?.rows}
        count={queryData?.data?.total}
      />
    </main>
  );
};

export default TasksSearchPage;
