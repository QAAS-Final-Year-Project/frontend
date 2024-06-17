import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import { getTimeLeft } from "Shared/utils/date";
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
          <div className="text-zinc-800 text-lg font-medium font-['Nunito'] leading-[30px]">
            {title}
          </div>
          <StatusChip size='sm' info={status} type={getStatusType(status)} />
        </div>
        <div className='flex gap-x-1 mb-3 items-center'>
          <Icon
            icon={"ic:baseline-access-time"}
            className='w-5 h-5 text-neutral-500'
          />
          <p className=" text-neutral-500 text-base font-normal font-['Nunito'] leading-relaxed flex items-center gap-x-5">
            <span>Date: {moment(date).format(AppConfig.date.format)}</span>
            <span>{getTimeLeft(moment(deadlineDate))} left</span>
          </p>
        </div>
        <div className='flex gap-x-2.5 items-stretch'>
          <PrimaryButton
            size='sm'
            // count={biddersCount}
            icon={"ic:outline-build-circle"}
            text='Manage Task'
            iconPosition='left'
          />
          {/* <ActionButton action='delete' onClick={onDelete} />
          <ActionButton action='update' onClick={onUpdate} /> */}
        </div>
      </div>
      <div className=' py-3.5 px-[25px]  bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        

        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            ${amount}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Bid Amount
          </span>
        </div>
        {/* <div className='w-0.5 bg-neutral-200 h-10'></div> */}
      </div>
    </Link>
  );
};

export default TesterTaskRow;
