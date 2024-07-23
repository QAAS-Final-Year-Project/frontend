import { FC } from "react";

import { Popover } from "@headlessui/react";

import Avatar from "Shared/components/media/avatar";
import { useNavigate } from "react-router-dom";
import { wrapClick } from "Shared/utils/ui";
import IconButton from "Shared/components/buttons/icon-button";
import { sampleChatData } from "Modules/Developer/Messages/data/sample-data";
import NotificationChatRow from "./notification-chat-row";
import PrimaryButton from "Shared/components/buttons/primary-button";
const UserMessages: FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
         {open && (
              <div className='w-0 h-0 border-l-8 border-r-8  absolute border-b-8 border-b-zinc-300 top-[32px] right-1 z-[10000000] border-r-transparent border-l-transparent'></div>
            )}
          <Popover.Button className=''>
            <IconButton
              icon={"lucide:mail"}
              notificationType='info'
              notificationCount={3}
            />
          </Popover.Button>
          <Popover.Panel
            // transition
            className='absolute  -right-6 z-10 top-[40px]  flex     px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
          >
            <div className='w-screen max-w-[360px] flex-auto overflow-hidden rounded  bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
              <div className='p-[25px] border-b py-3.5 border-neutral-200 '>
                <h6 className='text-zinc-800 text-base font-medium  leading-normal'>
                  Messages
                </h6>
              </div>
              <div className='max-h-[280px] overflow-y-scroll'>
                {sampleChatData.map((data, index) => (
                  <NotificationChatRow
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
              <PrimaryButton
                text='View All Messages'
                onClick={wrapClick(() => navigate("/dashboard/messages"))}
                icon={"ic:baseline-arrow-right-alt"}
                iconPosition='right'
                className='w-full rounded-none '
              />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default UserMessages;
