import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import { getTimeLeft } from "Shared/utils/date";
import { classNames } from "Shared/utils/ui";
import AppConfig from "config";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

interface TaskRowProps {
  title: string;
  _id: string;
  status: string;
  date: string;
  deadlineDate;
  biddersCount: number;
  amount: number;
}

const TesterTaskRow: FC<TaskRowProps> = ({
  title,
  _id,
  status,
  biddersCount,
  amount,

  deadlineDate,
  date,
}) => {
  const hasExpired = moment(deadlineDate).isBefore(moment());

  const getStatusType = (status: string): StatusType => {
    switch (status) {
      case "Pending":
        return "warning";
      case "InProgress":
        return "warning";
      case "Assigned":
        return "info";
      case "Resolved":
        return "info";
      case "Completed":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "info";
    }
  };
  return (
    <Link
      to={"/dashboard/tasks/" + _id}
      className='py-[22px] px-[30px] flex items-center justify-between border-b border-neutral-200 hover:bg-[#fcfcfc]'
    >
      <div className=''>
        <div className='flex gap-x-1 mb-1 items-center'>
          <div className="text-zinc-800 text-lg font-medium  leading-[30px]">
            {title}
          </div>
          <StatusChip
            size='sm'
            info={
              hasExpired &&
              !["Assigned", "InProgress", "Resolved", "Completed"].includes(
                status
              )
                ? "Expired"
                : status
            }
            type={
              hasExpired &&
              !["Assigned", "InProgress", "Resolved", "Completed"].includes(
                status
              )
                ? "danger"
                : getStatusType(status)
            }
          />{" "}
        </div>
        <div className='flex items-center mb-1 gap-x-5'>
          <div className='flex gap-x-1 mb-3 items-center'>
            <Icon
              icon={"ic:baseline-calendar-month"}
              className='w-5 h-5 text-neutral-500'
            />
            <p className=' text-neutral-500 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
              <span>Date: {moment(date).format(AppConfig.date.format)}</span>
            </p>
          </div>

          <div className='flex gap-x-1 mb-3 items-center'>
            {!["Resolved", "Completed"].includes(status) && (
              <>
                {hasExpired ? (
                  <>
                    <Icon
                      icon={"ic:baseline-access-time"}
                      className='w-5 h-5 text-neutral-500'
                    />
                    <p className=' text-neutral-500 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
                      <span>
                        Deadline:{" "}
                        {moment(deadlineDate).format(AppConfig.date.format)}
                      </span>

                      {["Assigned", "InProgress"].includes(status) && (
                        <span
                          className={classNames(
                            "bg-gray-100 text-gray-800",
                            `bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100`,
                            "inline-flex rounded-full  px-2 py-1 text-xs items-center space-x-1"
                          )}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 10 10'
                            fill='currentColor'
                            className='w-1.5 h-1.5'
                          >
                            <circle
                              fillRule='evenodd'
                              cx='5'
                              cy='5'
                              r='5'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span>expired</span>
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <Icon
                      icon={"ic:baseline-access-time"}
                      className='w-5 h-5 text-neutral-500'
                    />
                    <p className=' text-neutral-500 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
                      <span>{getTimeLeft(moment(deadlineDate))} left</span>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className='flex gap-x-2.5 items-stretch'>
          <PrimaryButton
            size='sm'
            // count={biddersCount}
            icon={!["Resolved", "Completed"].includes(status) ?  "ic:outline-build-circle" : "ic:outline-remove-red-eye"}
            text={!["Resolved", "Completed"].includes(status) ? 'Manage Task' : "View Task"}
            iconPosition='left'
          />
          {/* <ActionButton action='delete' onClick={onDelete} />
          <ActionButton action='update' onClick={onUpdate} /> */}
        </div>
      </div>
      <div className=' py-3.5 px-[25px]  bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold  leading-snug">
            ${amount}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal  leading-tight">
            Bid Amount
          </span>
        </div>
        {/* <div className='w-0.5 bg-neutral-200 h-10'></div> */}
      </div>
    </Link>
  );
};

export default TesterTaskRow;
