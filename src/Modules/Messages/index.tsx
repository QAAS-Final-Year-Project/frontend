import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC, useEffect } from "react";
import ChatSidebar from "./sections/chat-sidebar";
import ChatMessageArea from "./sections/chat-message-area";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import NoChatRoom from "./components/no-room";
import { isValidJSON } from "Shared/utils/data-structures";
import useCookies from "Shared/hooks/cookies";
import useUrlState from "Shared/hooks/use-url-state";
import SendNewMessageContainer from "./send-new-message";

const MessagesPage: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useCookies("user");
  const currentUser = isValidJSON(user) ? JSON.parse(user) : undefined;
  const [modal, setModal] = useUrlState("modal");
  const [current] = useUrlState("current");
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <section>
        <div className='p-2.5'>
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
            "bg-white rounded shadow border-b border-neutral-200 flex h-[68vh] items-stretch"
          )}
        >
          <ChatSidebar user={currentUser} />
          {!id && <NoChatRoom />}
          <Outlet />
        </div>
      </section>
      {current && (
        <>
          <SendNewMessageContainer
            currentUser={currentUser}
            open={modal === "message"}
            setOpen={(val: boolean) => {
              if (val) {
                setModal("message");
              } else {
                searchParams.delete("current");
                searchParams.delete("modal");
                searchParams.delete("toType");
                setSearchParams(searchParams);
              }
            }}
            refetch={() => {}}
          />
        </>
      )}
    </>
  );
};

export default MessagesPage;
