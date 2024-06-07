import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./components/task-row";
import { StatusType } from "Shared/components/chips/status-chip";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import useTableData from "Shared/utils/use-table-data";
import PageLoader from "Shared/components/suspense/page-loader";
import Loader from "Shared/components/suspense/loader";
import PaginationComponent from "Shared/components/nav/pagination";

const TasksPage: FC = () => {
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

  const dispatchAction = (id: string, action: "delete" | "update") => {
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
    queryKey: ["tasks", page, pageSize, search, fromDate, toDate],
    queryFn: () =>
      getTasks({
        page,
        pageSize,
        search,
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
  const sampleTask = {
    id: "test",
    taskName: "Design a Landing Page",
    status: "Expiring",
    statusType: "warning" as StatusType,
    timeLeft: "23 hours left",
    biddersCount: 3,
    avgBid: 22,
    hourlyRate: "$15 - $30",
    onDelete: () => console.log("Delete action"),
    onUpdate: () => console.log("Update action"),
  };

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
        >
          {isLoading && (
            <div className='min-h-[400px] flex items-center justify-center'>
              <Loader />
            </div>
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

export default TasksPage;
