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
import Loader from "Shared/components/suspense/loader";
import useCookies from "Shared/hooks/cookies";
import { isValidJSON } from "Shared/utils/data-structures";
import UpdateBidContainer from "./update-bid";
import CancelBidContainer from "./cancel-bid";

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
    queryKey: ["bids", page, pageSize, search, fromDate, toDate],
    queryFn: () =>
      getTesterTaskBids({
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
      {isLoading ? (
        <div className='min-h-[600px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='space-y-[30px] mb-4'>
          <CardSectionWrapper icon={"ic:outline-gavel"} title='My Bid List'>
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
                    setOpen={(val: boolean) =>
                      setModal(val ? "edit" : undefined)
                    }
                    refetch={refetch}
                  />
                </>
              );
            })}
          </CardSectionWrapper>
        </div>
      )}
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
