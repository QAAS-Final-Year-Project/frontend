import SelectInput from "Shared/components/input/select-input";
import { FC } from "react";
import PaginationComponent from "Shared/components/nav/pagination";
import TaskGridCard from "../components/task-grid-card";
import { sampleTaskData } from "../data/sample-data";
import TaskGridCardShimmer from "../components/task-card-shimmer";
import useTableData from "Shared/utils/use-table-data";
import SortSelect from "Shared/components/input/sort-select";
import useUrlState from "Shared/hooks/use-url-state";
import { Bars4Icon } from "@heroicons/react/20/solid";
import { classNames, wrapClick } from "Shared/utils/ui";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import TaskListCard from "../components/task-list-card";
import EmptyComponent from "Shared/components/suspense/empty";
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
const HomeTasksListSection: FC<{
  refetch: () => void;
  rows: any;
  isLoading: boolean;
  count: number;
}> = ({ refetch, rows, isLoading, count }) => {
  const data = useTableData({
    rows: rows || [],
    count: count || 0,
  });
  const [sortBy, setSortBy] = useUrlState("sortBy", "-createdAt");
  const [viewType, setViewType] = useUrlState<"list" | "grid">(
    "viewType",
    "grid"
  );
  return (
    <div className='flex-1 bg-white p-10 '>
      <div className='flex items-center justify-between'>
        <h4 className='text-zinc-800 text-xl font-medium  leading-loose mb-[15px]'>
          Search Results
        </h4>
        <div className='hidden ml-6 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg items-center sm:flex'>
          <button
            type='button'
            onClick={wrapClick(() => setViewType("list"))}
            className={classNames(
              viewType !== "grid"
                ? "bg-white dark:bg-gray-900 shadow-sm"
                : "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
              "p-1.5 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            )}
          >
            <Bars4Icon className='h-5 w-5' aria-hidden='true' />
            <span className='sr-only'>Use list view</span>
          </button>
          <button
            type='button'
            onClick={wrapClick(() => setViewType("grid"))}
            className={classNames(
              viewType === "grid"
                ? "bg-white dark:bg-gray-900 shadow-sm"
                : "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
              "ml-0.5 p-1.5 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            )}
          >
            <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
            <span className='sr-only'>Use grid view</span>
          </button>
        </div>
      </div>

      <div className='px-[25px] pt-[15px] pb-4 bg-zinc-100 rounded justify-between flex items-center mb-[30px]'>
        <div className='text-stone-500 text-base font-normal  leading-snug'>
          Turn on email alerts for this search
        </div>{" "}
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
        {/* <SelectInput
          id='identityCardType'
          isFilter={true}
          label='Sort By'
          options={[{ label: "Relevance", value: "" }]}
          handleChange={() => {}}
          handleBlur={() => {}}
          values={{ identityCardType: "" }}
          //   {...form}
        /> */}
      </div>
      <div
        className={classNames(
          " gap-[30px] mb-[50px]",
          viewType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-6"
        )}
      >
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <TaskGridCardShimmer key={index} />
            ))}
          </>
        )}
        {!isLoading && (
          <>
            {data?.rows?.length > 0 ? (
              data?.rows.map((task) => (
                <>
                  {viewType === "grid" ? (
                    <TaskGridCard
                      key={task?._id}
                      _id={task?._id}
                      title={task.title}
                      date={task?.createdAt}
                      deadlineDate={task?.deadlineDate}
                      biddersCount={task?.meta?.biddersCount}
                      amount={task?.amount}
                      onBid={() => {}}
                    />
                  ) : (
                    <TaskListCard
                      tags={task?.tags}
                      key={task?._id}
                      _id={task?._id}
                      title={task.title}
                      date={task?.createdAt}
                      deadlineDate={task?.deadlineDate}
                      biddersCount={task?.meta?.biddersCount}
                      amount={task?.amount}
                      onBid={() => {}}
                    />
                  )}
                </>
              ))
            ) : (
              <div className='flex justify-center w-full col-span-3'>
                <EmptyComponent
                  emptyType='task'
                  title='Tasks found'
                  subTitle='We did not find any tasks that matched your query'
                />
              </div>
            )}
          </>
        )}{" "}
      </div>
      <PaginationComponent data={data} />
    </div>
  );
};

export default HomeTasksListSection;
