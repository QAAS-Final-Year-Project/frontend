import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./components/task-row";
import { StatusType } from "Shared/components/chips/status-chip";
import SelectInput from "Shared/components/input/select-input";
import FilterSelectInput from "Shared/components/input/filter-select-input";
import { sortBy } from "lodash";
import BidderRow from "./components/bidder-row";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AcceptOfferContainer from "./accept";
import SendMessageContainer from "./send-message";
import { classNames } from "Shared/utils/ui";
import TabList from "Shared/components/nav/TabList";
import TaskOverView from "./components/task-overview";
import { sampleTask } from "./data/sample-data";
import TaskBidders from "./components/task-bidders";
import TaskActivity from "./components/task-activity";
import TaskAttachments from "./components/task-attachments";

const ViewTaskDetailsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");
  const [tab, setTab] = useUrlState("tab", "overview");

  const dispatchAction = (
    id: string,
    action: "delete" | "accept" | "message"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  const TabMappings = {
    overview: <TaskOverView data={sampleTask} />,
    bidders: <TaskBidders />,
    activity: <TaskActivity />,
    files: <TaskAttachments data={sampleTask} />,
    // settings: <TaskSettings />,
  };

  return (
    <>
      <section>
        <div className='p-2.5 mb-8'>
          <Header
            title='Task Details'
            // subtitle={
            //   <>
            //     Bids for{" "}
            //     <span className='text-primary-500'>Mobile Application</span>
            //   </>
            // }
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
                title: "Tasks",
                to: "#",
              },
              {
                title: "#1234",
                to: "#",
              },
            ]}
          />
        </div>
        <div
          className={classNames(
            " bg-white rounded shadow border-b border-neutral-200"
          )}
        >
          <div className='px-6 pt-4 border-b border-neutral-200 flex items-center justify-between'>
            <TabList
              tabs={[
                {
                  icon: "overview",
                  label: "Overview",
                  href: "overview",
                  notificationsCount: 2,
                },
                { icon: "bidders", label: "Bidders", href: "bidders" },
                { icon: "activity", label: "Activity", href: "activity" },
                { icon: "Attachments", label: "Attachments", href: "attachments" },
                // { icon: "settings", label: "Settings", href: "settings" },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>

          <div className=''>{TabMappings[tab]}</div>
        </div>
      </section>
    </>
  );
};

export default ViewTaskDetailsPage;
