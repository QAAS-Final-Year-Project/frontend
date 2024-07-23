import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import BidRow from "./components/bid-row";
import useUrlState from "Shared/hooks/use-url-state";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTableData from "Shared/utils/use-table-data";
import { AxiosError } from "axios";
import { getTesterTaskBids } from "./duck/fetch";
import { useQuery } from "@tanstack/react-query";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import AppConfig from "config";
import useCookies from "Shared/hooks/cookies";
import { isValidJSON } from "Shared/utils/data-structures";
import UpdateBidContainer from "./update-bid";
import CancelBidContainer from "./cancel-bid";
import TesterBidRowShimmer from "./components/bid-shimmer";
import PaginationComponent from "Shared/components/nav/pagination";
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
const TesterBidsPage: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useCookies("user");
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

  const dispatchAction = (id: string, action: "delete" | "update" | "edit") => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };
  const currentUser = isValidJSON(user) ? JSON.parse(user) : {};

  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["bids", page, pageSize, search, fromDate, toDate, sortBy],
    queryFn: () =>
      getTesterTaskBids({
        page,
        pageSize,
        search,
        fromDate,
        sort: sortBy,
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
          title='My Active Bids'
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
              title: "My Active Bids",
              to: "#",
            },
          ]}
        />
      </div>

      <div className='space-y-[30px] mb-4'>
        <CardSectionWrapper
          icon={"ic:outline-gavel"}
          title='My Bid List'
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
                <TesterBidRowShimmer key={index} />
              ))}
            </>
          )}
          {data?.rows?.map((task) => {
            const myBid = task.bidders?.find(
              (bidder) => bidder?.bidder?._id === currentUser?._id
            );
            return (
              <>
                <BidRow
                  key={task._id}
                  title={task.title}
                  _id={task._id}
                  date={task?.createdAt}
                  biddersCount={task?.meta?.biddersCount}
                  amount={myBid?.amount}
                  deadlineDate={task?.deadlineDate}
                  onDelete={() => dispatchAction(task._id, "delete")}
                  onUpdate={() => dispatchAction(task._id, "edit")}
                />
                <UpdateBidContainer
                  values={{
                    amount: myBid?.amount,
                    // deadlineDate: task?.deadlineDate,
                    notes: myBid?.notes,
                  }}
                  open={modal === "edit"}
                  setOpen={(val: boolean) => setModal(val ? "edit" : undefined)}
                  refetch={refetch}
                />
              </>
            );
          })}
        </CardSectionWrapper>
      </div>

      {<PaginationComponent data={data} />}

      {current && (
        <CancelBidContainer
          open={modal === "delete"}
          setOpen={(val: boolean) => setModal(val ? "delete" : undefined)}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default TesterBidsPage;
