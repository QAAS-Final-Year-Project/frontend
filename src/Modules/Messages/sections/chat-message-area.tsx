import { Icon } from "@iconify/react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import Header from "Shared/components/layout/header";
import { classNames } from "Shared/utils/ui";
import { FC, useEffect, useRef, useState } from "react";
import ChatBubble from "../components/chat-bubble";
import DateSectionHeader from "../components/date-section-header";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { fireStoreDb } from "config/firebase.config";
import { isValidJSON } from "Shared/utils/data-structures";
import { useCookies } from "react-cookie";
import { showToast } from "Shared/utils/alert";
import Loader from "Shared/components/suspense/loader";
import SendMessageForm from "../components/message-send-form";
import _ from "lodash";
import moment from "moment";

const ChatMessageArea: FC = () => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { id: roomId } = useParams();
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });
  const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchRoomAndMessages = async () => {
      try {
        // Fetch room details
        const roomDocRef = doc(fireStoreDb, "rooms", roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          setRoomDetails(roomDoc.data());
        }
        // Fetch messages
        const messagesQuery = query(
          collection(fireStoreDb, "rooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        );
        const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Mark all messages as read for the current user
          const unreadMessages = snapshot.docs.filter(
            (doc) =>
              doc.data().read === false &&
              doc.data().senderId !== currentUser?._id
          );
          await Promise.all(
            unreadMessages.map((doc) => updateDoc(doc.ref, { read: true }))
          );
          setMessages(messagesData);
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        showToast({
          type: "error",
          title: "Error fetching chat details",
        });
        setLoading(false);
      }
    };

    fetchRoomAndMessages();
  }, [roomId]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const groupedMessages = _.groupBy(messages, (message) => {
    const date = moment(message.timestamp?.toDate()).endOf("day");
    if (date.isSame(moment(), "day")) return "Today";
    if (date.isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
    return date.format("DD/MM/YYYY");
  });

  return (
    <div className='flex-1  h-full overflow-auto  relative'>
      <div className='px-[30px]  h-[82px] border-b py-5  border-neutral-200 flex items-center bg-white justify-between sticky top-0 z-[9]'>
        <div className='text-zinc-800 text-base font-semibold  leading-[27px]'>
          {currentUser?.accountType == "TesterUser"
            ? roomDetails?.developerFullName
            : roomDetails?.testerFullName}
        </div>
        <button className='flex gap-x-1 items-center cursor-pointer'>
          <span className='text-gray-500 sm:text-sm' id='price-currency'>
            <Icon icon={"uil:trash"} />
          </span>
          <div className=' text-stone-500 text-[13px] font-medium  leading-[27px]'>
            {" "}
            Delete Conversation
          </div>
        </button>
      </div>
      {loading ? (
        <div className='min-h-[400px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='flex-1 relative'>
          {/* Chat bubbles */}
          <div className='mb-[120px] pr-3 pl-[30px] pt-[30px] '>
            {Object.keys(groupedMessages).map((dateGroup) => (
              <div className='space-y-6' key={dateGroup}>
                <DateSectionHeader title={dateGroup} />
                {groupedMessages[dateGroup].map((message, index) => {
                  const isMe = currentUser?._id == message?.senderId;
                  function getProfileImageToShow(): {
                    fullName: string;
                    profileImageUrl: string;
                  } {
                    switch (currentUser?.accountType) {
                      case "DeveloperUser":
                        if (isMe) {
                          return {
                            profileImageUrl:
                              roomDetails?.developerProfileImageUrl,
                            fullName: roomDetails?.developerFullName,
                          };
                        } else {
                          return {
                            profileImageUrl: roomDetails?.testerProfileImageUrl,
                            fullName: roomDetails?.testerFullName,
                          };
                        }
                      case "TesterUser":
                        if (isMe) {
                          return {
                            profileImageUrl: roomDetails?.testerProfileImageUrl,
                            fullName: roomDetails?.testerProfileImageUrl,
                          };
                        }
                        return {
                          profileImageUrl:
                            roomDetails?.developerProfileImageUrl,
                          fullName: roomDetails?.developerFullName,
                        };
                    }
                  }
                  const detailsToShow = getProfileImageToShow();
                  console.log("message", message);
                  return (
                    <ChatBubble
                      key={index}
                      ref={index == messages.length - 1 ? messagesEndRef : null}
                      me={isMe}
                      name={detailsToShow.fullName}
                      message={message?.text}
                      date={message?.timestamp?.toDate() || new Date()}
                      avatarSrc={detailsToShow.profileImageUrl}
                    />
                  );
                })}
              </div>
            ))}
            {messages.length < 6 &&
              _.times(6 - messages.length).map((index) => (
                <div className='h-[65px]'></div>
              ))}
          </div>
        </div>
      )}
      <SendMessageForm roomId={roomId} userId={currentUser?._id} />
    </div>
  );
};

export default ChatMessageArea;
