import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./components/task-row";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import SelectInput from "Shared/components/input/select-input";
import FilterSelectInput from "Shared/components/input/filter-select-input";
import { sortBy } from "lodash";
import BidderRow from "./components/bidder-row";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTask } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Loader from "Shared/components/suspense/loader";
import ActionButton from "Shared/components/buttons/action-button";
import CompleteTaskContainer from "./complete";
import TaskResolutionView from "./components/task-resolution";

const DeveloperViewTaskDetailsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");
  const [tab, setTab] = useUrlState("tab", "overview");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  const dispatchAction = (id: string, action: "complete") => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  const TabMappings = {
    overview: <TaskOverView data={query?.data?.data} />,
    bidders: <TaskBidders refetch={query.refetch} data={query?.data?.data} />,
    activity: <TaskActivity data={query?.data?.data} />,
    resolution: <TaskResolutionView data={query?.data?.data} />,
    attachments: (
      <TaskAttachments data={query?.data?.data} refetch={query.refetch} />
    ),
    // settings: <TaskSettings />,
  };

  const taskStatusMapping: { [key in string]: StatusType } = {
    Pending: "warning",
    Assigned: "info",
    InProgress: "warning",
    Resolved: "info",
    Completed: "success",
    Rejected: "danger",
    "": "info", // Default case or empty status
  };
  return (
    <>
      <section>
        <div className='p-2.5 mb-8'>
          <Header
            title='Task Details'
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
                title: query?.data?.data ? "#" + query?.data?.data?.code : "",
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
          {query.isLoading ? (
            <div className='min-h-[400px] flex items-center justify-center'>
              <Loader />
            </div>
          ) : (
            <>
              <div className='px-6 pt-4 border-b border-neutral-200 flex items-center justify-between'>
                <TabList
                  tabs={[
                    {
                      icon: "ic:outline-dashboard",
                      label: "Overview",
                      href: "overview",
                    },
                    {
                      icon: "ic:baseline-supervisor-account",
                      label: "Bidders",
                      href: "bidders",
                      notificationsCount:
                        query?.data?.data?.meta?.biddersCount || 0,
                    },
                    {
                      icon: "ic:outline-notifications",
                      label: "Activity",
                      href: "activity",
                      notificationsCount:
                        query?.data?.data?.history?.length || 0,
                    },
                    {
                      icon: "ic:outline-note-add",

                      label: "Attachments",
                      href: "attachments",
                    },
                    ...(["Resolved", "Completed"]?.includes(
                      query?.data?.data?.status
                    )
                      ? [
                          {
                            icon: "ic:outline-view-timeline",
                            label: "Resolution",
                            href: "resolution",
                          },
                        ]
                      : []),
                  ]}
                  value={tab}
                  onChange={setTab}
                />
                <div className='flex gap-2 items-center'>
                  <StatusChip
                    info={query?.data?.data?.status}
                    type={taskStatusMapping[query?.data?.data?.status]}
                    size='md'
                  />

                  {query?.data?.data?.status === "Resolved" && (
                    <ActionButton
                      tooltip='Mark as completed'
                      action='complete'
                      onClick={() =>
                        dispatchAction(query?.data?.data?._id, "complete")
                      }
                      className='!bg-green-600'
                      iconClassName='!text-white'
                    />
                  )}
                </div>
              </div>

              <div className=''>{TabMappings[tab]}</div>
            </>
          )}
        </div>
      </section>
      {query?.data?.data && (
        <CompleteTaskContainer
          values={{
            amount: query?.data?.data?.assignedAmount || 0,
          }}
          open={modal === "complete"}
          setOpen={(val: boolean) => setModal(val ? "complete" : undefined)}
          refetch={query.refetch}
        />
      )}
    </>
  );
};

export default DeveloperViewTaskDetailsPage;
