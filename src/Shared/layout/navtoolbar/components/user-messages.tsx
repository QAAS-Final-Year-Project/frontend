import { FC, useEffect, useState } from "react";

import { Popover } from "@headlessui/react";

import Avatar from "Shared/components/media/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { wrapClick } from "Shared/utils/ui";
import IconButton from "Shared/components/buttons/icon-button";
import { sampleChatData } from "Modules/Messages/data/sample-data";
import NotificationChatRow from "./notification-chat-row";
import PrimaryButton from "Shared/components/buttons/primary-button";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { fireStoreDb } from "config/firebase.config";
import useUrlState from "Shared/hooks/use-url-state";
import NoChatRoomsAvailable from "Modules/Messages/components/no-chat-room";
import NotificationChatShimmer from "./notification-chat-shimmer";
import moment from "moment";
import _ from "lodash";
const UserMessages: FC<{ user: any }> = ({ user }) => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useUrlState("modal");
  const [current] = useUrlState("current");
  const [toType] = useUrlState("toType");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(fireStoreDb, "rooms"),
      where(
        user?.accountType == "TesterUser" ? "testerId" : "developerId",
        "==",
        user?._id
      ),
      limit(4)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const roomsData: any = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const roomData = doc.data();
          const messagesQuery = query(
            collection(doc.ref, "messages"),
            where("read", "==", false),
            where("senderId", "!=", user?._id)
          );
          const unreadCountSnapshot = await getCountFromServer(messagesQuery);
          const unreadCount = unreadCountSnapshot.data().count;
          console.log(unreadCount, "unreadCount");
          console.log(user?._id, roomData?.senderId);
          return {
            id: doc.id,
            ...roomData,
            unreadCount,
          };
        })
      );

      setRooms(await roomsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
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
              notificationCount={_.sum(rooms.map((room) => room?.unreadCount))}
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
                {loading ? (
                  [1, 2, 3].map((item) => (
                    <NotificationChatShimmer key={item} />
                  ))
                ) : rooms?.length == 0 ? (
                  <NoChatRoomsAvailable />
                ) : (
                  rooms.map((room, index) => (
                    <NotificationChatRow
                      id={room?.id}
                      key={room?.id}
                      unreadCount={room?.unreadCount}
                      avatarSrc={
                        user?.accountType == "DeveloperUser"
                          ? room?.testerProfileImageUrl
                          : room?.developerProfileImageUrl
                      }
                      userName={
                        user?.accountType == "DeveloperUser"
                          ? room?.testerFullName
                          : room?.developerFullName
                      }
                      timeAgo={moment(
                        room?.updatedAt?.toDate() || ""
                      ).fromNow()}
                      message={room?.lastMessage}
                    />
                  ))
                )}
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
