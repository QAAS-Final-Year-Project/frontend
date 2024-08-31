import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import FilterSelectInput from "Shared/components/input/filter-select-input";
import BidderRow from "./bidder-row";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AcceptOfferContainer from "../accept";
import SendMessageContainer from "../send-message";
import SortSelect from "Shared/components/input/sort-select";
import _ from "lodash";
import EmptyComponent from "Shared/components/suspense/empty";
const sortOptions = [
  { name: "Bid Amount: Lowest First", href: "amount" },
  { name: "Bid Amount: Highest First", href: "-amount" },
  { name: "Rating: Lowest First", href: "bidder.rating" },
  { name: "Rating: Highest First", href: "-bidder.rating" },
];

const TaskBidders: FC<{
  data: any;
  refetch: () => void;
  hasExpired: boolean;
}> = ({ data, refetch, hasExpired }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");
  const [sortBy, setSortBy] = useUrlState("sortBy", "-amount");

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
  />;
  const dispatchAction = (
    id: string,
    action: "delete" | "accept" | "message"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className='space-y-[30px]'>
        <CardSectionWrapper
          title={""}
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
          {data?.bidders?.length > 0 ? (
            <>
              {_.orderBy(
                data?.bidders,
                [
                  (bidder) => {
                    const sortKey = sortBy.startsWith("-")
                      ? sortBy.slice(1)
                      : sortBy;
                    return bidder[sortKey];
                  },
                ],
                sortBy.startsWith("-") ? ["desc"] : ["asc"]
              )?.map((bidder: any, idx) => {
                return (
                  <>
                    <BidderRow
                      // idx={idx}
                      id={bidder?.bidder?._id}
                      country={bidder?.bidder?.country}
                      // deliveryTime={bidder?.deliveryTime}
                      showActions={data?.status === "Pending" && !hasExpired}
                      email={bidder?.bidder?.emailAddress}
                      fixedPrice={bidder?.amount}
                      fullName={bidder?.bidder?.fullName}
                      phoneNumber={bidder?.bidder?.phoneNumber}
                      profileImageUrl={bidder?.bidder?.profileImageUrl}
                      rating={bidder?.bidder?.rating}
                      onAccept={() =>
                        dispatchAction(bidder.bidder?._id, "accept")
                      }
                      onSendMessage={() =>
                        dispatchAction(bidder?.bidder?._id, "message")
                      }
                      onDelete={() =>
                        dispatchAction(bidder?.bidder?._id, "delete")
                      }
                    />
                    <AcceptOfferContainer
                      values={{
                        amount: bidder?.amount,
                        assignee: bidder?.bidder?._id,
                        fullName: bidder?.bidder?.fullName,
                      }}
                      open={modal === "accept"}
                      setOpen={(val: boolean) =>
                        setModal(val ? "accept" : undefined)
                      }
                      refetch={refetch}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <EmptyComponent
              emptyType='bid'
              title='Bid placed yet on this task'
              subTitle={`\n`}
            />
          )}
        </CardSectionWrapper>
      </div>

      {current && (
        <>
          <SendMessageContainer
            open={modal === "message"}
            setOpen={(val: boolean) => setModal(val ? "message" : undefined)}
            refetch={() => {}}
          />
        </>
      )}
    </>
  );
};

export default TaskBidders;
