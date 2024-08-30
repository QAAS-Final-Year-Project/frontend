import { FC, useEffect, useState } from "react";

import { Popover } from "@headlessui/react";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import IconButton from "Shared/components/buttons/icon-button";
import NotificationNotificationRow from "./notification-notification-row";
import { fireStoreDb } from "config/firebase.config";
import { playNotificationSound } from "Shared/utils/notifications";

const UserNotifications: FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const notificationsCollectionRef = collection(fireStoreDb, "notifications");
  const notificationsQuery = query(
    notificationsCollectionRef,
    orderBy("timeStamp", "desc"),
    where("assignee", "==", user?._id),
    where("assigneeType", "==", user?.accountType),
    limit(100)
  );

  useEffect(() => {
    if (isOpen) {
      const unreadNotifcationsQuery = query(
        notificationsCollectionRef,
        where("assignee", "==", user?._id),
        where("assigneeType", "==", user?.accountType),
        where("isRead", "==", false)
      );
      getDocs(unreadNotifcationsQuery).then((notificationsSnapShot) => {
        notificationsSnapShot.forEach(async (doc) => {
          updateDoc(doc.ref, { isRead: true });
        });
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      notificationsQuery,
      (notificationsSnapshot) => {
        setNotifications((prevNotifications) => {
          const newNotifications: any = notificationsSnapshot.docs.map(
            (doc) => {
              return { ...doc.data(), id: doc.id };
            }
          );

          if (
            newNotifications.filter(
              (notification) => notification?.isRead === false
            ).length > 0 &&
            newNotifications.length > prevNotifications.length
          ) {
            playNotificationSound();
          }

          return newNotifications;
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Popover className='relative z-[99]'>
      {({ open }) => {
        useEffect(() => {
          setIsOpen(open);
        }, [open]);
        return (
          <>
            {open && (
              <div className='w-0 h-0 border-l-8 border-r-8  absolute border-b-8 border-b-zinc-300 top-[32px] right-1 z-[10000000] border-r-transparent border-l-transparent'></div>
            )}

            <Popover.Button className=''>
              <IconButton
                icon={"lucide:bell"}
                notificationCount={
                  notifications.filter(
                    (notification) => notification?.isRead === false
                  ).length || 0
                }
                notificationType='info'
              />
            </Popover.Button>
            <Popover.Panel
              // transition
              className='absolute -right-6 z-10 top-[40px]  flex     px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
            >
              <div className='w-screen max-w-[360px] flex-auto overflow-hidden rounded  bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                <div className='p-[25px] border-b py-3.5 border-neutral-200 '>
                  <h6 className='text-zinc-800 text-base font-medium  leading-normal'>
                    Notifications
                  </h6>
                </div>
                <div className='max-h-[280px] overflow-y-auto'>
                  {notifications.length === 0 && (
                    <div className='flex items-center justify-center h-[100px]'>
                      No Notifications
                    </div>
                  )}
                  {notifications.map((notification, index) => (
                    <NotificationNotificationRow
                      key={index}
                      action={notification?.action}
                      actorName={notification?.actorName}
                      entity={notification?.entity}
                      isRead={notification?.isRead}
                      date={notification?.timeStamp?.toDate()}
                    />
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );
};

export default UserNotifications;
