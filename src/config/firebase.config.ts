// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2zp1ZL59CaQc7c1PaPIZu552Oz0k7qCs",
    authDomain: "test-universal-2a81a.firebaseapp.com",
    projectId: "test-universal-2a81a",
    storageBucket: "test-universal-2a81a.appspot.com",
    messagingSenderId: "475437209800",
    appId: "1:475437209800:web:f8a3d65d20029dd7dc6dfd",
    measurementId: "G-C4ZV2XT92J"
};


export const firebaseNotificationVapidKey= "BHxpbbD9DNWDu_bcGuRbxOfJt-SqWkcy6CgOnv_P4EjVBXen6AYVOqKH7Uq9XIh-uvuXm0qf_-ue4AK26zJZ25U"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseMessaging = getMessaging(app);
const analytics = getAnalytics(app);
export const firebaseStorage = getStorage(app);
export const fireStoreDb = getFirestore(app);






