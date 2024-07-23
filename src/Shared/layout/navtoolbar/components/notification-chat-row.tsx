import Avatar from "Shared/components/media/avatar";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

interface NotificationChatRowProps {
  active?: boolean;
  idx?: number;
  avatarSrc: string;
  userName: string;
  timeAgo: string;
  message: string;
}

const NotificationChatRow: FC<NotificationChatRowProps> = ({
  active,
  idx,
  avatarSrc,
  userName,
  timeAgo,
  message,
}) => {
  return (
    <div className={classNames("flex items-center border-b border-neutral-200 gap-x-5 py-5 px-[25px]")}>
      <div className='relative'>
        <Avatar size='sm' alt={userName} src={avatarSrc} />
        <div
          className={classNames(
            "w-[11px] h-[11px]  rounded-md absolute bottom-0 right-0 shadow border-2 border-white",
            active ? "bg-green-500" : "bg-stone-300"
          )}
        />
      </div>
      <div className='flex-1 space-y-1'>
        <p className='text-zinc-800 text-sm font-semibold  leading-[23px]'>
          {userName}
        </p>
        <p className="text-stone-500 text-ellipsis text-sm font-normal  leading-[23px]">
          {message}
        </p>
        <span className='text-blue-700 text-sm font-normal  leading-[23px]'>
          {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default NotificationChatRow;
