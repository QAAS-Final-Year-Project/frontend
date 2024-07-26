import { Icon } from "@iconify/react";
import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC, useEffect, useState } from "react";
import ChatRow from "../components/chat-row";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { fireStoreDb } from "config/firebase.config";
import moment from "moment";
import NoChatRoomsAvailable from "../components/no-chat-room";
import { sampleChatData } from "../data/sample-data";
import useUrlState from "Shared/hooks/use-url-state";
import ChatRowShimmer from "../components/chat-row-shimmer";

const ChatSidebar: FC<{ user: any }> = ({ user }) => {
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
      )
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

      if (current) {
        if (
          !roomsData?.find(
            (room) => room?.developerId == current || room?.testerUd == current
          )
        ) {
          setModal("message");
        } else {
          navigate(current as string);
        }
      }
      setRooms(await roomsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='w-[340px] border-r h-full overflow-scroll  flex flex-col'>
      <div className='px-[30px] py-5 border-b  border-neutral-200 flex items-center justify-between h-[82px] sticky top-0 bg-white z-[9]'>
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
      <div className='flex-1'>
        <div>
          {loading ? (
            [1, 2, 3, 4, 5].map((item) => <ChatRowShimmer key={item} />)
          ) : rooms?.length == 0 ? (
            <NoChatRoomsAvailable />
          ) : (
            rooms.map((room, index) => (
              <ChatRow
                id={room?.id}
                key={room?.id}
                idx={index}
                unreadCount={room?.unreadCount}
                active={id === room?.id}
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
                timeAgo={moment(room?.updatedAt?.toDate() || "").fromNow()}
                message={room?.lastMessage}
              />
            ))
          )}
          {/* {sampleChatData.map((data, index) => (
          <ChatRow
          id={index.toString()}
            key={index}
            idx={data.idx}
            active={data.active}
            unreadCount={43}
            avatarSrc={data.avatarSrc}
            userName={data.userName}
            timeAgo={data.timeAgo}
            message={data.message}
          />
        ))}{" "} */}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
