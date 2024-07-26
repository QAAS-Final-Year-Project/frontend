import Avatar from "Shared/components/media/avatar";
import { classNames, wrapClick } from "Shared/utils/ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NotificationChatRowProps {
  idx?: number;
  id: any;
  avatarSrc: string;
  userName: string;
  timeAgo: string;
  unreadCount: number;

  message: string;
}

const NotificationChatRow: FC<NotificationChatRowProps> = ({
  idx,
  avatarSrc,
  userName,
  timeAgo,
  id,
  message,
  unreadCount,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={wrapClick(() => navigate(id))}
      className={classNames(
        "flex items-center border-b relative border-neutral-200 gap-x-5 py-5 px-[25px]"
      )}
    >
      <div className='relative'>
        <Avatar size='sm' alt={userName} src={avatarSrc} />
        <div
          className={classNames(
            "w-[11px] h-[11px]  rounded-md absolute bottom-0 right-0 shadow border-2 border-white",
            "bg-green-500"
          )}
        />
      </div>
      <div className='flex-1 space-y-1'>
        <p className='text-zinc-800 text-sm font-semibold  leading-[23px]'>
          {userName}
        </p>
        <p className='text-stone-500 text-ellipsis text-sm font-normal  leading-[23px]'>
          {message}
        </p>
        <span className='text-blue-700 text-sm font-normal  leading-[23px]'>
          {timeAgo}
        </span>
      </div>
      {unreadCount ? (
        <div
          className={classNames(
            "absolute right-2.5 bottom-6  rounded-full px-1  flex items-center justify-center  w-[20px] h-[20px] text-center text-white text-xs font-bold ",
            "bg-primary-500  "
          )}
        >
          {unreadCount}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NotificationChatRow;
