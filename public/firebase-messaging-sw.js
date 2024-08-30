importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyA2zp1ZL59CaQc7c1PaPIZu552Oz0k7qCs",
    authDomain: "test-universal-2a81a.firebaseapp.com",
    projectId: "test-universal-2a81a",
    storageBucket: "test-universal-2a81a.appspot.com",
    messagingSenderId: "475437209800",
    appId: "1:475437209800:web:f8a3d65d20029dd7dc6dfd",
    measurementId: "G-C4ZV2XT92J",
    vapidKey: 'BHxpbbD9DNWDu_bcGuRbxOfJt-SqWkcy6CgOnv_P4EjVBXen6AYVOqKH7Uq9XIh-uvuXm0qf_-ue4AK26zJZ25U'
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

