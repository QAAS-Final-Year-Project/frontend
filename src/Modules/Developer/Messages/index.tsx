import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";
import ChatSidebar from "./sections/chat-sidebar";
import ChatMessageArea from "./sections/chat-message-area";

const DeveloperMessages: FC = () => {
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title={`Messages`}
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Dashboard",
              to: "/dashboard",
            },
            {
              title: "Messages",
              to: "/dashboard/messages",
            },
          ]}
        />
      </div>
      <div
        className={classNames(
          " bg-white rounded shadow border-b border-neutral-200 flex"
        )}
      >
        <ChatSidebar />
        <ChatMessageArea />
      </div>
    </section>
  );
};

export default DeveloperMessages;
