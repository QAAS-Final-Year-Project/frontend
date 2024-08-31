import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC, useEffect, useState } from "react";
import DashboardNotificationRow from "./notification-row";
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
import { fireStoreDb } from "config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isValidJSON } from "Shared/utils/data-structures";
import { playNotificationSound } from "Shared/utils/notifications";

const DashboardNotificationsOverviewList: FC = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });  
  const parsedUser = cookies.user ? JSON.parse(cookies.user) : null;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const notificationsCollectionRef = collection(fireStoreDb, "notifications");
  const notificationsQuery = query(
    notificationsCollectionRef,
    orderBy("timeStamp", "desc"),
    where("assignee", "==", parsedUser?._id),
    where("assigneeType", "==", parsedUser?.accountType),
    limit(5)
  );

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
    <CardSectionWrapper
      className='col-span-1'
      title='Notifications'
      icon={"ic:outline-notifications"}
    >
      <div className=''>
        {notifications.length === 0 && (
          <div className='flex items-center justify-center h-[100px]'>
            No Notifications
          </div>
        )}

        { notifications.map((notification, index) => (
          <DashboardNotificationRow key={index} {...notification} />
        ))}
      </div>
    </CardSectionWrapper>
  );
};

export default DashboardNotificationsOverviewList;
