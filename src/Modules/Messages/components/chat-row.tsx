import Header from "Shared/components/layout/header";
import Avatar from "Shared/components/media/avatar";
import { classNames, wrapClick } from "Shared/utils/ui";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ChatRowProps {
  active?: boolean;
  idx?: number;
  id: any;
  avatarSrc: string;
  userName: string;
  timeAgo: string;
  message: string;
  unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({
  active,
  id,
  idx,
  avatarSrc,
  userName,
  unreadCount,
  timeAgo,
  message,
}) => {
  const isOdd = idx % 2 !== 0;
  const navigate = useNavigate();
  return (
    <div
      onClick={wrapClick(() => navigate(id))}
      className={classNames(
        "flex items-center gap-x-4 pl-6 pr-2 py-6 border-b relative cursor-pointer hover:bg-neutral-100",
        isOdd ? "bg-[#FAFAFA]" : ""
      )}
    >
      <Avatar alt={userName} src={avatarSrc} />
      <div className='flex-1'>
        <div className='w-full flex justify-between mb-1'>
          <p className=' text-zinc-800 text-sm font-semibold  leading-[23px]'>
            {userName}
          </p>
          <span className='text-zinc-500 text-[13px] font-normal  leading-[27px]'>
            {timeAgo}
          </span>
        </div>
        <p className=' text-zinc-500 text-sm font-normal  leading-[25px]'>
          {message}
        </p>
      </div>

      {active && (
        <div className='w-[3px] h-full absolute left-0 top-0 bg-primary-500' />
      )}

      {unreadCount ? (
        <div
          className={classNames(
            "absolute right-2.5 bottom-6  rounded-full px-1  flex items-center justify-center  w-[20px] h-[20px] text-center text-white text-xs font-bold ",
            "bg-primary-500  "
          )}
        >
          {unreadCount}
        </div>
      ) : <></>}
    </div>
  );
};

export default ChatRow;
