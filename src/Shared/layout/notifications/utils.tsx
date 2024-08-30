import {
  getMessaging,
  getToken,
  onMessage,
  MessagePayload,
} from "firebase/messaging";
import { initializeApp } from "firebase/app";
import {
  firebaseMessaging,
  firebaseNotificationVapidKey,
} from "config/firebase.config";

// Initialize Firebase

export const getPushToken = () => {
  return new Promise((resolve, reject) => {
    getToken(firebaseMessaging, { vapidKey: firebaseNotificationVapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          resolve(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          reject();
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        reject(err);
      });
  });
};

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(firebaseMessaging, (payload) => {
      resolve(payload);
    });
  });
