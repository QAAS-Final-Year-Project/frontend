import { FC } from "react";
import moment from "moment"; // Ensure moment.js is installed and imported
import Avatar from "Shared/components/media/avatar";
import AppConfig from "config";
import { getTimeLeft } from "Shared/utils/date";

interface TaskOverViewProps {
  data: any;
}

const TaskOverView: FC<TaskOverViewProps> = ({ data }) => {
  return (
    <div className='space-y-6 my-6'>
      <div className={" "}>
        <div
          className={
            "grid grid-cols-3 mb-4 dark:bg-[#242A38] dark:border-gray-600 gap-x-3 gap-y-6 py-4 px-[30px]"
          }
        >
          <div>
            <span className='block text-zinc-800 text-base'>Title</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.title}
            </div>
          </div>

          <div className='col-span-3'>
            <span className='block text-zinc-800 text-base '>Description</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.description}
            </div>
          </div>
          <div>
            <span className='block text-zinc-800 text-base'>Deadline</span>
            <p className=" text-neutral-500 mt-1 text-base font-normal font-['Nunito'] leading-relaxed flex items-center gap-x-5">
              <span>
                Date: {moment(data?.createdAt).format(AppConfig.date.format)}
              </span>
              <span>{getTimeLeft(moment(data?.deadlineDate))} left</span>
            </p>
          </div>

          <div>
            <span className='block text-zinc-800 text-base'>Amount</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.amount}
            </div>
          </div>
          <div>
            <span className='block text-zinc-800 text-base'>Tags</span>
            <div className='flex mt-1 w-full items-center gap-1.5 flex-wrap'>
              {data?.tags?.map((val, idx) => (
                <div className='bg-zinc-100 rounded px-3 py-2 flex gap-x-1 items-center hover:bg-gray-100 text-stone-500 text-sm'>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverView;
