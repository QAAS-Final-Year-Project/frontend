import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import { getTimeLeft } from "Shared/utils/date";
import AppConfig from "config";
import moment from "moment";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface TaskBookMarkRowProps {
  title: string;
  _id: string;
  taskId: string
  date: string;
  deadlineDate;
  biddersCount: number;
  amount: number;
  onDelete: () => void;
}

const TaskBookMarkRow: FC<TaskBookMarkRowProps> = ({
  title,
  _id,
  // status,
  biddersCount,
  amount,
  taskId,
  deadlineDate,
  onDelete,
  // deadlineDate,
  date,
}) => {
  const navigate = useNavigate();
  return (
    <div
      // to={"/dashboard/tasks/" + _id}
      className='py-[22px] px-[30px] flex items-center justify-between border-b border-neutral-200 hover:bg-[#fcfcfc]'
    >
      <div className=''>
        <div className='flex gap-x-1 mb-1 items-center'>
          <div className="text-zinc-800 text-lg font-medium  leading-[30px]">
            {title}
          </div>
        </div>

        <div className='flex gap-x-2 mb-3 items-center'>
          <Icon
            icon={"ic:outline-calendar-month"}
            className='w-5 h-5 text-neutral-500'
          />
          <p className=" text-neutral-500 text-base font-normal  leading-relaxed flex items-center gap-x-5">
            <span>Date: {moment(date).format(AppConfig.date.format)}</span>
          </p>
          <Icon
            icon={"ic:outline-access-time"}
            className='w-5 h-5 text-neutral-500'
          />
          <p className=" text-neutral-500 text-base font-normal  leading-relaxed flex items-center gap-x-5">
            <span>{getTimeLeft(moment(deadlineDate))} left</span>
          </p>
        </div>
        <div className='flex gap-x-2.5 items-stretch'>
          {/* <PrimaryButton
            size='sm'
            // count={biddersCount}
            icon={"ic:outline-remove-red-eye"}
            text='View Task'
            iconPosition='left'
          /> */}
          <ActionButton
            tooltip='Go to Task'
            action='goto'
            onClick={() => navigate("/tasks/" + taskId)}
            className='!bg-primary-500'
            iconClassName='!text-white'
          />
          <ActionButton
            tooltip='Remove Bookmark'
            action='delete'
            onClick={onDelete}
            className='!bg-red-500'
            iconClassName='!text-white'
          />
        </div>
      </div>
      <div className=' py-3.5 px-[25px]  bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold  leading-snug">
            {biddersCount || 0}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal  leading-tight">
            Bids
          </span>
        </div>

        <div className='w-0.5 bg-neutral-200 h-10'></div>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold  leading-snug">
            GHC{amount}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal  leading-tight">
            Amount
          </span>
        </div>
        {/* <div className='w-0.5 bg-neutral-200 h-10'></div> */}
      </div>
    </div>
  );
};

export default TaskBookMarkRow;
