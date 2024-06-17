import { FC } from "react";
import moment from "moment"; // Ensure moment.js is installed and imported
import Avatar from "Shared/components/media/avatar";
import AppConfig from "config";
import { getTimeLeft } from "Shared/utils/date";
import AttachmentCard from "Modules/Tester/Settings/components/attachment-card";
import parse from "html-react-parser";

interface TaskResolutionProps {
  data: any;
}

const TaskResolutionView: FC<TaskResolutionProps> = ({ data }) => {
  return (
    <div className='space-y-6 my-6'>
      <div className={" "}>
        <div
          className={
            "grid grid-cols-3 mb-4 dark:bg-[#242A38] dark:border-gray-600 gap-x-3 gap-y-8  py-4 px-[30px]"
          }
        >
          {data?.resolvedAt && (
            <div>
              <span className='block text-zinc-800 text-lg font-medium leading-[27px]'>
                Resolved At
              </span>
              <div className='text-stone-500 text-base font-normal leading-[27px]'>
                {moment(data?.resolvedAt).format(AppConfig.date.format)}
              </div>
            </div>
          )}

          <div className='col-span-3'>
            <span className='block text-zinc-800 text-lg font-medium leading-[27px] '>
              Notes
            </span>
            <div className='text-stone-500 text-base font-normal leading-[27px]'>
              {parse(data?.resolution?.notes || "N/A")}
            </div>
          </div>

          <div className='col-span-3'>
            <h3 className='mb-3 text-zinc-800 text-lg font-medium  leading-[27px]'>
              Supporting Documents{" "}
            </h3>
            <div className='grid grid-cols-3'>
              {data?.resolution?.supportingDocuments?.map((attachment) => (
                <AttachmentCard
                  fileUrl={attachment?.url}
                  fileName={attachment?.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskResolutionView;
