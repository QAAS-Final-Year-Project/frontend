import { FC } from "react";
import moment from "moment"; // Ensure moment.js is installed and imported
import Avatar from "Shared/components/media/avatar";

interface TaskOverViewProps {
  data: any;
}

const TaskOverView: FC<TaskOverViewProps> = ({ data }) => {
  return (
    <div className='space-y-6 my-6'>
      <div className={" "}>
        <div
          className={
            "grid grid-cols-2 mb-4 dark:bg-[#242A38] dark:border-gray-600 gap-x-3 gap-y-6 py-4 px-4"
          }
        >
          <div>
            <span className='block text-zinc-800 text-base'>Code</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.code}
            </div>
          </div>
          <div className='col'>
            <span className='block text-zinc-800 text-base'>Brief</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>{data?.notes}</div>
          </div>
          <div className="col-span-2">
            <span className='block text-zinc-800 text-base '>Description</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.description}
            </div>
          </div>
          <div>
            <span className='block text-zinc-800 text-base'>Deadline</span>
            <div className='mt-1 block w-full  text-stone-500 text-base font-normal leading-[27px]'>
              {data?.deadlineDate}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TaskOverView;
