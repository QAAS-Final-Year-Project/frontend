import { Icon } from "@iconify/react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";
import ChatBubble from "../components/chat-bubble";
import { sampleMessages } from "../data/sample-data";
import DateSectionHeader from "../components/date-section-header";

const ChatMessageArea: FC = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <div className='px-[30px] py-5 border-b  border-neutral-200 flex items-center justify-between h-[82px]'>
        <div className="text-zinc-800 text-base font-semibold font-['Nunito'] leading-[27px]">
          Sindy Forest
        </div>
        <div className='flex gap-x-1 items-center'>
          <span className='text-gray-500 sm:text-sm' id='price-currency'>
            <Icon icon={"uil:trash"} />
          </span>
          <div className=" text-stone-500 text-[13px] font-medium font-['Nunito'] leading-[27px]">
            {" "}
            Delete Conversation
          </div>
        </div>
      </div>
      <div className='flex-1 relative'>
        {/* Chat bubbles */}
        <div className='mb-[120px] pr-3 pl-[30px] pt-[30px] space-y-6'>
          <DateSectionHeader title="Today" />
          {sampleMessages.map((data, index) => (
            <ChatBubble
              key={index}
              me={data.me}
              message={data.message}
              avatarSrc={data.avatarSrc}
            />
          ))}{" "}
        </div>
        <div className='px-[30px] absolute bottom-0 gap-x-5 p-[30px] border-t w-full border-neutral-200 flex items-center justify-between '>
          <input
            type='text'
            placeholder='Your Message'
            className='bg-none border-none flex-1 outline-none focus:outline-none leading-relaxed placeholder:text-zinc-500 placeholder:text-[15px] placeholder:font-normal'
          />
          <PrimaryButton text='Send' size='md' />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageArea;
