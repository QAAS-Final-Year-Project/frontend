import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TesterTaskRow from "./components/task-row";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import useTableData from "Shared/utils/use-table-data";
import PaginationComponent from "Shared/components/nav/pagination";
import TesterTaskRowShimmer from "./components/task-shimmer";
import SortSelect from "Shared/components/input/sort-select";
import TextInput from "Shared/components/input/text-input";
import { classNames, wrapOnchange } from "Shared/utils/ui";
import { Icon } from "@iconify/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchSelectInput from "Shared/components/input/search-select-input";
import EmptyComponent from "Shared/components/suspense/empty";

const sortOptions = [
  { name: "Bid Amount: Lowest First", href: "amount" },
  { name: "Bid Amount: Highest First", href: "-amount" },
  { name: "Deadline: Earliest First", href: "deadlineDate" },
  { name: "Deadline: Latest First", href: "-deadlineDate" },
  { name: "Assigned Date: Earliest First", href: "assignedAt" },
  { name: "Assigned Date: Latest First", href: "-assignedAt" },
];
const TesterTasksPage: FC = () => {
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
  const [sortBy, setSortBy] = useUrlState("sortBy", "assignedAt");
  const [priority, setPriority] = useUrlState("priority");

  const orderStatuses = [
    { name: "Pending", href: "Pending" },
    { name: "Assigned", href: "Assigned" },
    { name: "In Progress", href: "InProgress" },
    { name: "Resolved", href: "Resolved" },
    { name: "Completed", href: "Completed" },
  ];
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
    queryKey: ["my-tasks", page, pageSize, search, fromDate, toDate, sortBy],
    queryFn: () =>
      getTasks({
        page,
        pageSize,
        search,
        fromDate,
        toDate,
        sort: sortBy,
        searchFields: ["description", "title"],
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
      <div className='p-2.5 '>
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
      {/* <div className='flex items-center justify-between mb-4'>
          <div className='relative'>
            <input
              type='search'
              placeholder='Search for task'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className={classNames(
                "border-none focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500",
                "shadow !border-zinc-300 block w-[300px] sm:text-base rounded placeholder:font-medium placeholder:text-zinc-500  h-[48px] bg-white"
              )}
            />
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <span className='text-gray-500 ' id='price-currency'>
                <Icon icon={"uil:search"} />
              </span>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <div
              className={classNames(
                "w-64 relative  text-gray-500 dark:text-gray-200 focus-within:text-gray-500 dark:focus-within:text-gray-300"
              )}
            >
              <label htmlFor='search' className='sr-only'>
                Search tasks
              </label>
              <input
                // ref={searchRef}
                id='search'
                type='search'
                placeholder={`Search tasks`}
                onChange={wrapOnchange((value) => {
                  setSearch(value);
                })}
                className='block appearance-none h-[38px] w-64 rounded-md border-gray-300  pl-8 py-1.5 placeholder-gray-500 dark:placeholder-gray-300 dark:text-white focus:border-gray-300 dark:focus:border-gray-600 sm:text-sm focus:ring-0 dark:bg-gray-900'
              />
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-2'>
                <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
              </div>
              <div className='pointer-events-none absolute inset-y-0 right-6 flex items-center justify-center pl-2'>
                <span className='only:'></span>
              </div>
            </div>
            <button
              // onClick={wrapOnchange(() => onSearchClicked?.(search))}
              // disabled={!search || search.length < minSearch || disableSearch}
              className={classNames(
                "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
                "py-2 px-5 rounded-md border border-gray-300 text-gray-500 dark:text-gray-400 font-light text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Search
            </button>
          </div>
          <div className='mt-4 sm:mt-0.5 sm:ml-16 sm:flex space-x-2'>
            <div>
              <SearchSelectInput
                id='status'
                labelHidden={true}
                options={[
                ...orderStatuses.map(orderStatus => ({
                  label:{title: orderStatus.name},
                  value:orderStatus.href,

                }))
                ]}
                placeholder='Select Priority'
                setFieldValue={(_: any, value: string) => setPriority(value)}
                values={{ priority }}
                label={""}
              />
            </div>
          
          
          </div>
        </div> */}

      <div className='space-y-[30px] mb-4'>
        <CardSectionWrapper
          icon={"ic:outline-create-new-folder"}
          title='My Tasks'
          extraElement={
            <div className='flex gap-x-5 items-center'>
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
            </div>
          }
        >
          {isLoading && (
            <>
              {[1, 2, 3].map((index) => (
                <TesterTaskRowShimmer key={index} />
              ))}
            </>
          )}
          {!isLoading && (
            <>
              {data?.rows?.length > 0 ? (
                data?.rows.map((task) => (
                  <>
                    <TesterTaskRow
                      key={task._id}
                      title={task.title}
                      status={task.status}
                      _id={task._id}
                      amount={task.amount}
                      biddersCount={task?.meta?.biddersCount || 0}
                      date={task?.meta?.createdAt}
                      deadlineDate={task?.deadlineDate}
                    />
                  </>
                ))
              ) : (
                <EmptyComponent
                  emptyType='task'
                  title='Assigned tasks'
                  subTitle='You have no tasks assigned to you just yet'
                />
              )}
            </>
          )}{" "}
        </CardSectionWrapper>
      </div>
      {<PaginationComponent data={data} />}
    </section>
  );
};

export default TesterTasksPage;
