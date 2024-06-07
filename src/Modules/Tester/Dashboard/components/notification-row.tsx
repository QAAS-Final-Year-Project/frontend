import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { string } from "yup";
import { Icon } from "@iconify/react";
import moment from "moment";
import AppConfig from "config";

interface NotificationRowProps {
  actionType: string;
  actorName: string;
  date: string | Date;
  action: string;
  entity: string;
}

const ActionIcons = {
  Apply: "ic:outline-group",
  Bid: "ic:outline-gavel",
  Expiring: "ic:outline-gavel",
  Review: "ic:outline-rate-review",
};

const NotificationRow: FC<NotificationRowProps> = ({
  action,
  actionType,
  actorName,
  date,
  entity,
}) => {
  const getActionIcon = (actionType: string) => {
    if (!ActionIcons.hasOwnProperty(actionType))
      return "ic:outline-notifications";
    return ActionIcons[actionType];
  };

  return (
    <div className='py-[22px] px-[30px] flex items-center justify-between w-full  border-b border-neutral-200 hover:bg-[#fcfcfc]'>
      <div className='flex items-center gap-x-5 '>
        <div className='w-10 h-10 px-2 pt-[6.50px] pb-[9.50px] bg-zinc-100 rounded flex-col justify-start items-center inline-flex'>
          <div className='text-center text-neutral-400 text-2xl font-normal  leading-normal'>
            <Icon icon={getActionIcon(actionType)} />
          </div>
        </div>
        <div className='flex items-center gap-1 '>
          <p>
            <span className='text-zinc-800 text-sm font-semibold  leading-[23px]'>
              {actorName}
            </span>
            <span className='text-stone-500 text-sm font-normal   leading-[23px]'>
              {" "}
              {action}
            </span>
          </p>
          <p className='text-blue-700 text-sm font-normal leading-[23px]'>
            {" "}
            {entity}
          </p>
        </div>
      {date && (
        <div className="text-neutral-400 text-sm font-normal font-['Nunito'] leading-snug">
          {moment(date).fromNow()}
        </div>
      )}
      </div>
    </div>
  );
};

export default NotificationRow;
