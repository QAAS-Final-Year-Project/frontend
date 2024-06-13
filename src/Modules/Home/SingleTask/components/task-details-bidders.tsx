import { Icon } from "@iconify/react";
import React, { FC } from "react";
import TaskDetailsBidderRow from "./task-details-didder-row";
import { classNames } from "Shared/utils/ui";

const TaskDetailsBidders: FC<{
  bidders: any[];
  count: number;
}> = ({ bidders, count }) => {
  return (
    <div className='flex flex-col items-stretch'>
      <div className='rounded  bg-zinc-100 py-5 px-[35px]'>
        <h3 className='text-zinc-800 text-lg font-medium   flex items-center gap-x-2'>
          <Icon
            icon={"ic:baseline-supervisor-account"}
            className='w-5 h-5 block text-blue-700 mr-1'
          />
          Testers Bidding
          <span
            className={classNames(
              "bg-primary-100 text-primary-500",
              "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
            )}
          >
            {count || 0}
          </span>
        </h3>
      </div>
      {bidders.map((bidder, idx) => (
        <TaskDetailsBidderRow
          idx={idx}
          country={bidder?.bidder?.country}
          // deliveryTime={bidder?.deliveryTime}
          email={bidder?.bidder?.email}
          fixedPrice={bidder?.amount}
          fullName={bidder?.bidder?.fullName}
          phoneNumber={bidder?.bidder?.phoneNumber}
          profileImageUrl={bidder?.bidder?.profileImageUrl}
          rating={bidder?.bidder?.rating}
        />
      ))}
    </div>
  );
};

export default TaskDetailsBidders;
