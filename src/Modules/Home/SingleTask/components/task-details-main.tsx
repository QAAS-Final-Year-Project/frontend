import AttachmentCard from "Modules/Tester/Settings/components/attachment-card";
import React, { FC } from "react";
import TaskDetailsBidders from "./task-details-bidders";
import parse from "html-react-parser";

const TaskDetailsMain: FC<{ data: any }> = ({ data }) => {
  
  return (
    <section className='space-y-[55px]'>
      <div className=' block'>
        <h3 className='mb-6 text-zinc-800 text-xl font-medium leading-[27px]'>
          Project Description
        </h3>
        <p className='text-stone-500 text-base font-normal leading-[27px]'>
          {parse(data?.description || "N/A")}
          bottom line.
        </p>
      </div>
      <div>
        <h3 className='mb-6 text-zinc-800 text-xl font-medium  leading-[27px]'>
          Attachments
        </h3>
        <div className='grid grid-cols-3'>
          {data?.supportingDocuments?.map((attachment) => (
            <AttachmentCard
              fileUrl={attachment?.url}
              title={attachment?.name}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className='mb-6 text-zinc-800 text-xl font-medium  leading-[27px]'>
          Skills Required
        </h3>
        <div className='flex mt-0.5 w-full items-center gap-1 flex-wrap'>
          {data?.tags?.map((val, idx) => (
            <div className=' bg-blue-700/5 rounded px-[15px] py-1.5 flex gap-x-1 items-center hover:bg-gray-100 text-primary-500 text-sm'>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
      <TaskDetailsBidders count={data?.meta?.biddersCount} bidders={data?.bidders}/>
    </section>
  );
};

export default TaskDetailsMain;
