import { FC } from "react";
import moment from "moment"; // Ensure moment.js is installed and imported
import Avatar from "Shared/components/media/avatar";
import AppConfig from "config";
import { getTimeLeft } from "Shared/utils/date";
import parse from "html-react-parser";
import AssigneeRow from "./assignee-row";
import { useNavigate } from "react-router-dom";

interface TaskOverViewProps {
  data: any;
  isExpired?: boolean;
}

const TaskOverView: FC<TaskOverViewProps> = ({ data, isExpired }) => {
  const navigate = useNavigate();
  return (
    <div className='space-y-6 my-6'>
      <div className={" "}>
        <div
          className={
            "grid grid-cols-3 mb-4 dark:bg-[#242A38] dark:border-gray-600 gap-x-3 gap-y-8 py-4 px-[30px]"
          }
        >
          <div>
            <span className='block text-zinc-800 text-lg font-medium leading-[27px]'>
              Title
            </span>
            <p className='text-stone-500 text-base font-normal leading-[27px]'>
              {data?.title}
            </p>
          </div>

          <div className='col-span-3'>
            <span className='block text-zinc-800 text-lg font-medium leading-[27px]'>
              Description
            </span>
            <p className='text-stone-500 text-base font-normal leading-[27px]'>
              {parse(data?.description || "N/A")}
            </p>
          </div>
          <div>
            <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
              Date created
            </span>
            <p className=' text-neutral-500 mt-1 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
              <span>
                Date: {moment(data?.createdAt).format(AppConfig.date.format)}
              </span>{" "}
            </p>
          </div>
          {["Resolved", "Completed", "Pending"].includes(data?.status) ||
          (["Assigned", "InProgress"].includes(data?.status) && isExpired) ? (
            <div>
              <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
                Deadline Date
              </span>
              <p className=' text-neutral-500 mt-1 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
                <span>
                  {moment(data?.deadlineDate).format(AppConfig.date.format)}{" "}
                  left
                </span>
              </p>
            </div>
          ) : (
            <div>
              <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
                Time left
              </span>
              <p className=' text-neutral-500 mt-1 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
                <span>{getTimeLeft(moment(data?.deadlineDate))} left</span>
              </p>
            </div>
          )}

          <div>
            <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
              Amount
            </span>
            <div className='text-stone-500 text-base font-normal leading-[27px] mt-1'>
              GHC {data?.amount}
            </div>
          </div>
          {data?.assignedAt && (
            <div>
              <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
                Assigned At
              </span>
              <div className='text-stone-500 text-base font-normal leading-[27px] mt-1'>
                {moment(data?.assignedAt).format(AppConfig.date.format)}
              </div>
            </div>
          )}
          {data?.resolvedAt && (
            <div>
              <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
                Resolved At
              </span>
              <div className='text-stone-500 text-base font-normal leading-[27px] mt-1'>
                {moment(data?.resolvedAt).format(AppConfig.date.format)}
              </div>
            </div>
          )}
          {data?.completedAt && (
            <div>
              <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
                Completed At
              </span>
              <div className='text-stone-500 text-base font-normal leading-[27px] mt-1'>
                {moment(data?.completedAt).format(AppConfig.date.format)}
              </div>
            </div>
          )}

          <div>
            <span className=' text-zinc-800 block text-lg font-medium leading-[27px]'>
              Tags
            </span>
            <div className='flex mt-1 w-full items-center gap-1.5 flex-wrap'>
              {data?.tags?.map((val, idx) => (
                <div className=' bg-blue-700/5 rounded px-[15px] py-1.5 flex gap-x-1 items-center hover:bg-gray-100 text-primary-500 text-sm'>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
          {data?.assignee && (
            <div className='col-span-3'>
              <span className='  mb-2 text-zinc-800 block text-lg font-medium leading-[27px]'>
                Assigned Tester
              </span>
              <AssigneeRow
                id={data?.assignee?._id}
                country={data?.assignee?.country}
                email={data?.assignee?.emailAddress}
                fullName={data?.assignee?.fullName}
                phoneNumber={data?.assignee?.phoneNumber}
                profileImageUrl={data?.assignee?.profileImageUrl}
                rating={data?.assignee?.rating}
                onSendMessage={() =>
                  navigate(
                    `/dashboard/messages?current=${data?.assignee?._id}&toType=TesterUser`
                  )
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverView;
