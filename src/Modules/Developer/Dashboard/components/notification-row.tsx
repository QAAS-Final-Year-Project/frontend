import { FC } from "react";

import { Icon } from "@iconify/react";
import moment from "moment";

interface DashboardNotificationProps {
  action: string;
  actorName: string;
  date: any;
  entity: string;
  isRead: boolean;
}

const ActionIcons = {
  Initiate: "ic:outline-group",
  Bid: "ic:outline-gavel",
  EditBid: "ic:outline-gavel",
  CancelBid: "ic:baseline-do-not-disturb",
  Cancel: "ic:outline-cancel",
  AddNote: "ic:outline-note-add",
  RemoveNote: "ic:outline-note-remove",
  Assign: "ic:outline-assignment",
  Resolve: "ic:outline-done",
  Start: "ic:outline-play-arrow",
  Complete: "ic:outline-check-circle",
  Review: "ic:outline-rate-review",
  ApproveVerification: "ic:outline-done",
  RejectVerification: "ic:outline-cancel",
  DeadlineUpdate: "ic:outline-calendar-month",
  Deposit: "ic:outline-payment",
  Payout: "ic:outline-payment",
  WithdrawalFailed: "ic:outline-payment",
  WithdrawalSuccess: "ic:outline-payment",

};

const ActionTexts = {
  Initiate: "created task",
  Bid: "placed a bid on task",
  EditBid: "edited bid on task",
  CancelBid: "canceled bid on task",
  Cancel: "canceled task",
  AddNote: "added a note to task",
  RemoveNote: "removed a note from task",
  Assign: "assigned you to task",
  Resolve: "resolved task",
  Start: "started task",
  Complete: "completed task",
  Review: "reviewed task",
  ApproveVerification: "approved verification",
  RejectVerification: "rejected verification",
  DeadlineUpdate: "updated deadline for task",
  Deposit: "deposit successful",
  Payout: "payout made for task",
  WithdrawalSuccess: "withdrawal successful",
  WithdrawalFailed: "withdrawal failed",

};

const DashboardNotificationRow: FC<DashboardNotificationProps> = ({
  action,
  actorName,
  entity,
  date,
  isRead,
}) => {
  const getActionIcon = (action: string) => {
    if (!ActionIcons.hasOwnProperty(action)) return "ic:outline-notifications";
    return ActionIcons[action];
  };
  const getActionText = (action: string) => {
    if (!ActionTexts.hasOwnProperty(action)) return "did action";
    return ActionTexts[action];
  };

  return (
    <div className='py-[22px] px-[30px] flex items-center justify-between w-full  border-b border-neutral-200 hover:bg-[#fcfcfc]'>
      <div className='flex items-center gap-x-5 '>
        <div className='w-10 h-10 px-2 pt-[6.50px] pb-[9.50px] bg-zinc-100 rounded flex-col justify-start items-center inline-flex'>
          <div className='text-center text-neutral-400 text-2xl font-normal  leading-normal'>
            <Icon icon={getActionIcon(action)} />
          </div>
        </div>
        <div className='flex items-center gap-1 '>
          <p className='flex items-center gap-1'>
            <span className='text-zinc-800 text-sm font-semibold  leading-[23px]'>
              {actorName}
            </span>
            <span className='text-stone-500 text-sm font-normal   leading-[23px]'>
              {getActionText(action)}
            </span>
          </p>
          <p className='text-blue-700 text-sm font-normal leading-[23px]'>
            {" "}
            {entity}
          </p>
        </div>
        {date && (
          <div className='text-neutral-400 text-sm font-normal  leading-snug'>
            {moment(date).fromNow()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNotificationRow;
