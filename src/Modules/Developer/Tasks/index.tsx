import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./components/task-row";
import { StatusType } from "Shared/components/chips/status-chip";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import useTableData from "Shared/utils/use-table-data";
import Loader from "Shared/components/suspense/loader";
import PaginationComponent from "Shared/components/nav/pagination";
import DeveloperTaskRowShimmer from "./components/task-shimmer";
import SortSelect from "Shared/components/input/sort-select";

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
const DeveloperTasksPage: FC = () => {
  const [page] = useUrlState<number>("page", 1);
  const [pageSize] = useUrlState<number>(
    "pageSize",
    AppConfig.constants.pageSize
  );
  const [search, setSearch] = useUrlState<string>("search", "");
  const [fromDate] = useUrlState<any>("fromDate");
  const [toDate] = useUrlState<any>("toDate");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useUrlState("sortBy", "-createdAt");

  const dispatchAction = (id: string, action: "delete" | "update") => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  const { data: queryData, isLoading } = useQuery({
    queryKey: ["my-tasks", page, pageSize, search, fromDate, toDate, sortBy],
    queryFn: () =>
      getTasks({
        page,
        pageSize,
        search,
        sort: sortBy,

        fromDate,
        toDate,
        searchFields: ["name", "code", "description", "title"],
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
      <div className='p-2.5 mb-8'>
        <Header
          title='Manage Tasks'
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Dashboard",
              to: "/",
            },
            {
              title: "Manage Task",
              to: "#",
            },
          ]}
        />
      </div>
      <div className='space-y-[30px] mb-4'>
        <CardSectionWrapper
          icon={"ic:outline-create-new-folder"}
          title='My Tasks'
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
              {[1, 2, 3].map((index) => (
                <DeveloperTaskRowShimmer key={index} />
              ))}
            </>
          )}
          {data?.rows.map((task) => (
            <TaskRow
              key={task._id}
              title={task.title}
              status={task.status}
              _id={task._id}
              amount={task.amount}
              biddersCount={task?.meta?.biddersCount || 0}
              date={task?.meta?.createdAt}
              deadlineDate={task?.deadlineDate}
              onDelete={() => dispatchAction(task._id, "delete")}
              onUpdate={() => dispatchAction(task._id, "update")}
            />
          ))}
        </CardSectionWrapper>
      </div>
      {<PaginationComponent data={data} />}
    </section>
  );
};

export default DeveloperTasksPage;
