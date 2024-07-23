import Header from "Shared/components/layout/header";
import { FC } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import { classNames, wrapClick } from "Shared/utils/ui";
import TabList from "Shared/components/nav/TabList";
import TaskOverView from "./components/task-overview";
import TaskActivity from "./components/task-activity";
import TaskAttachments from "./components/task-attachments";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTask } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Loader from "Shared/components/suspense/loader";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import ActionButton from "Shared/components/buttons/action-button";
import AcceptTaskContainer from "./start";
import TaskResolutionView from "./components/task-resolution";
import moment from "moment";
import DeclineTaskContainer from "./decline";

const TesterViewTaskDetailsPage: FC = () => {
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

  const dispatchAction = (id: string, action: "accept" | "delete") => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  const hasExpired = moment(query?.data?.data?.deadlineDate).isBefore(moment());

  const TabMappings = {
    overview: <TaskOverView data={query?.data?.data} isExpired={hasExpired} />,
    activity: <TaskActivity data={query?.data?.data} />,
    attachments: (
      <TaskAttachments
        data={query?.data?.data}
        refetch={query.refetch}
        hasExpired={hasExpired}
      />
    ),
    resolution: <TaskResolutionView data={query?.data?.data} />,

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
                    size='md'
                    info={
                      hasExpired &&
                      ![
                        "Assigned",
                        "InProgress",
                        "Resolved",
                        "Completed",
                      ].includes(query?.data?.data?.status)
                        ? "Expired"
                        : query?.data?.data?.status
                    }
                    type={
                      hasExpired &&
                      ![
                        "Assigned",
                        "InProgress",
                        "Resolved",
                        "Completed",
                      ].includes(query?.data?.data?.status)
                        ? "danger"
                        : taskStatusMapping[query?.data?.data?.status]
                    }
                  />

                  {query?.data?.data?.status === "Assigned" && !hasExpired && (
                    <>
                      <ActionButton
                        tooltip='Accept Task and Start'
                        action='start'
                        onClick={() =>
                          dispatchAction(query?.data?.data?._id, "accept")
                        }
                        className='!bg-green-600'
                        iconClassName='!text-white'
                      />
                      <ActionButton
                        tooltip='Cancel Task'
                        action='cancel'
                        onClick={() =>
                          dispatchAction(query?.data?.data?._id, "delete")
                        }
                        className='!bg-red-600'
                        iconClassName='!text-white'
                      />
                    </>
                  )}
                  {query?.data?.data?.status === "InProgress" && (
                    <ActionButton
                      tooltip='Resolve Task'
                      action='resolve'
                      onClick={() =>
                        navigate("/dashboard/tasks/" + id + "/resolve")
                      }
                      className='!bg-teal-600'
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
        <>
          <AcceptTaskContainer
            values={{
              amount: query?.data?.data?.assignedAmount || 0,
            }}
            open={modal === "accept"}
            setOpen={(val: boolean) => setModal(val ? "accept" : undefined)}
            refetch={query.refetch}
          />
          <DeclineTaskContainer
            open={modal === "delete"}
            setOpen={(val: boolean) => setModal(val ? "delete" : undefined)}
            refetch={query.refetch}
          />
        </>
      )}
    </>
  );
};

export default TesterViewTaskDetailsPage;
