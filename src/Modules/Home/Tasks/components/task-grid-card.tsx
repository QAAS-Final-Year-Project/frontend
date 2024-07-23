import { Icon } from "@iconify/react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import Avatar from "Shared/components/media/avatar";
import RatingComponent from "Shared/components/status/rating";
import { getTimeLeft } from "Shared/utils/date";
import AppConfig from "config";
import { Nationalities } from "data";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";
interface TaskGridCardProps {
  title: string;
  date?: string;
  deadlineDate: string;
  biddersCount: number;
  amount: number;
  onBid: () => void;
  _id: any;
}

const TaskGridCard: FC<TaskGridCardProps> = ({
  title,
  date,
  deadlineDate,
  biddersCount,
  amount,
  _id,
  onBid,
}) => {
  return (
    <div className=' bg-white rounded shadow flex-col justify-center items-start inline-flex'>
      <div className='py-7 px-8 '>
        <p className=' text-zinc-800 text-lg font-semibold  leading-7 mb-1'>
          {title}
        </p>
        <div className='flex gap-x-1 mb-1 items-center'>
          <div className='flex gap-x-3.5 mb-3 items-center'>
            <div className='flex items-center'>
              <Icon
                icon={"ic:outline-calendar-month"}
                className='w-5 h-5 text-neutral-500'
              />
              <span className='text-zinc-500 text-base font-normal  leading-relaxed'>
                Date: {moment(date).format(AppConfig.date.format)}
              </span>
            </div>
            <div className='flex items-center'>
              <Icon
                icon={"ic:baseline-access-time"}
                className='w-5 h-5 text-neutral-500'
              />
              <span className='text-zinc-500 text-base font-normal  leading-relaxed'>
                {getTimeLeft(moment(deadlineDate))} left
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-7 px-8  bg-neutral-50 rounded-bl rounded-br w-full space-y-4'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-x-4'>
            <div>
              <p className=" text-zinc-800 text-base font-semibold  leading-normal">
                ${amount}
              </p>
              <div className=" text-zinc-500 text-base font-normal  leading-normal">
                Fixed Price
              </div>
            </div>
            <div className='w-0.5 bg-neutral-200 h-10'></div>
            <div>
              <p className=" text-zinc-800 text-base font-semibold  leading-normal">
                {biddersCount}
              </p>
              <div className=" text-zinc-500 text-base font-normal  leading-normal">
                Bids
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2.5'>
            <Link to={"/tasks/" + _id}>
              <PrimaryButton
                className=''
                text='View Task'
                icon={"ic:baseline-arrow-outward"}
                size='sm'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskGridCard;
