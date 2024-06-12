import { Icon } from "@iconify/react";
import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";
import ChatRow from "../components/chat-row";
import { sampleChatData } from "../data/sample-data";

const ChatSidebar: FC = () => {
  return (
    <div className='w-[340px] border-r '>
      <div className='px-[30px] py-5 border-b  border-neutral-200 flex items-center justify-between h-[82px]'>
        <div className='relative'>
          <input
            type='search'
            placeholder='Search'
            className={classNames(
              "border-none focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500",
              "shadow-sm block w-full sm:text-base rounded placeholder:font-medium placeholder:text-zinc-500 placeholder:text-sm h-[38px] bg-neutral-100"
            )}
          />
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              <Icon icon={"uil:search"} />
            </span>
          </div>
        </div>
      </div>
      <div>
        {sampleChatData.map((data, index) => (
          <ChatRow
            key={index}
            idx={data.idx}
            active={data.active}
            avatarSrc={data.avatarSrc}
            userName={data.userName}
            timeAgo={data.timeAgo}
            message={data.message}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default ChatSidebar;
