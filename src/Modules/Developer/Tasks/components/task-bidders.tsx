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

const TaskBidders: FC<{ data: any }> = ({ data }) => {
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
  const sampleBidder = {
    fullName: "David Peterson",
    profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "rafiq@gmail.com",
    phoneNumber: "0552594990",
    rating: 3.4,
    fixedPrice: "$3,200",
    country: "Canada",
    deliveryTime: "14 Days",
    onAccept: () => dispatchAction("asdfsdf", "accept"),
    onSendMessage: () => dispatchAction("asdfsdf", "message"),
    onDelete: () => console.log("Delete action"),
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
          {data?.bidders?.map((bidder: any) => (
            <BidderRow {...sampleBidder} />
          ))}
        </CardSectionWrapper>
      </div>

      {current && (
        <>
          <AcceptOfferContainer
            open={modal === "accept"}
            setOpen={(val: boolean) => setModal(val ? "accept" : undefined)}
            refetch={() => {}}
          />

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
