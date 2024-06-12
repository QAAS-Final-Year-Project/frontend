import Header from "Shared/components/layout/header";
import Avatar from "Shared/components/media/avatar";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

interface ChatRowProps {
  active?: boolean;
  idx?: number;
  avatarSrc: string;
  userName: string;
  timeAgo: string;
  message: string;
}

const ChatRow: FC<ChatRowProps> = ({ active, idx, avatarSrc, userName, timeAgo, message }) => {
  const isOdd = idx % 2 !== 0;
  return (
    <div
      className={classNames(
        "flex items-center gap-x-4 pl-6 pr-2 py-6 relative",
        isOdd ? "bg-[#FAFAFA]" : ""
      )}
    >
      <Avatar
        alt={userName}
        src={avatarSrc}
      />
      <div className='flex-1'>
        <div className='w-full flex justify-between mb-1'>
          <p className=" text-zinc-800 text-sm font-semibold font-['Nunito'] leading-[23px]">
            {userName}
          </p>
          <span className="text-zinc-500 text-[13px] font-normal font-['Nunito'] leading-[27px]">
            {timeAgo}
          </span>
        </div>
        <p className=" text-zinc-500 text-sm font-normal font-['Nunito'] leading-[25px]">
          {message}
        </p>
      </div>

      {active && (
        <div className='w-[3px] h-full absolute left-0 top-0 bg-primary-500' />
      )}
    </div>
  );
};

export default ChatRow;
