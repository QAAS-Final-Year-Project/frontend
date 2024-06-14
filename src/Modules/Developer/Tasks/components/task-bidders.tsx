import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./task-row";
import { StatusType } from "Shared/components/chips/status-chip";
import SelectInput from "Shared/components/input/select-input";
import FilterSelectInput from "Shared/components/input/filter-select-input";
import { sortBy } from "lodash";
import BidderRow from "./bidder-row";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AcceptOfferContainer from "../accept";
import SendMessageContainer from "../send-message";

const TaskBidders: FC<{ data: any; refetch: () => void }> = ({
  data,
  refetch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");

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
            <div>
              <FilterSelectInput
                id='sortBy'
                label='Sort By'
                setFieldValue={() => {}}
                options={[
                  { label: "Highest First", value: "HighestFirst" },
                  { label: "Relevance", value: "ANother" },
                ]}
                values={{
                  sortBy: "HighestFirst",
                }}
                //   {...form}
              />
            </div>
          }
        >
          {data?.bidders?.map((bidder: any, idx) => {
            return (
              <>
                <BidderRow
                  // idx={idx}
                  country={bidder?.bidder?.country}
                  // deliveryTime={bidder?.deliveryTime}
                  email={bidder?.bidder?.emailAddress}
                  fixedPrice={bidder?.amount}
                  fullName={bidder?.bidder?.fullName}
                  phoneNumber={bidder?.bidder?.phoneNumber}
                  profileImageUrl={bidder?.bidder?.profileImageUrl}
                  rating={bidder?.bidder?.rating}
                  onAccept={() => dispatchAction(bidder.bidder?._id, "accept")}
                  onSendMessage={() =>
                    dispatchAction(bidder?.bidder?._id, "message")
                  }
                  onDelete={() => dispatchAction(bidder?.bidder?._id, "delete")}
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
