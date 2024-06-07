import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import { FC } from "react";
import { Link } from "react-router-dom";

interface TaskRowProps {
  taskName: string;
  id: string
  status: string;
  statusType: StatusType;
  timeLeft: string;
  biddersCount: number;
  avgBid: number;
  hourlyRate: string;
  onDelete: () => void;
  onUpdate: () => void;
}

const TaskRow: FC<TaskRowProps> = ({
  taskName,
  id,
  status,
  statusType,
  timeLeft,
  biddersCount,
  avgBid,
  hourlyRate,
  onDelete,
  onUpdate,
}) => {
  return (
    <Link to={"/dashboard/tasks/" + id + "/assign"} className='py-[22px] px-[30px] flex items-center justify-between border-b border-neutral-200 hover:bg-[#fcfcfc]'>
      <div className=''>
        <div className='flex gap-x-1 mb-1 items-center'>
          <div className="text-zinc-800 text-lg font-medium font-['Nunito'] leading-[30px]">
            {taskName}
          </div>
          <StatusChip size='sm' info={status} type={statusType} />
        </div>
        <div className='flex gap-x-1 mb-3'>
          <Icon
            icon={"ic:baseline-access-time"}
            className='w-5 h-5 text-neutral-500'
          />
          <p className=" text-neutral-500 text-base font-normal font-['Nunito'] leading-relaxed">
            {timeLeft}
          </p>
        </div>
        <div className='flex gap-x-2.5 items-stretch'>
          <PrimaryButton
            size='sm'
            count={biddersCount}
            icon={"ic:baseline-supervisor-account"}
            text='Manage Bidders'
            iconPosition='left'
          />
          <ActionButton action='delete' onClick={onDelete} />
          <ActionButton action='update' onClick={onUpdate} />
        </div>
      </div>
      <div className=' py-3.5 px-[25px]  bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            {biddersCount}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Bids
          </span>
        </div>

        <div className='w-0.5 bg-neutral-200 h-10'></div>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            ${avgBid}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Avg. Bid
          </span>
    </div>
        <div className='w-0.5 bg-neutral-200 h-10'></div>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            {hourlyRate}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Hourly Rate
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskRow;
