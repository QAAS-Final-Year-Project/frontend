
import { fireStoreDb } from '../../../config/firebase.config';
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';


export async function doCreateRoom({ developerId, testerId, message, testerFullName, testerProfileImageUrl, developerFullName, developerProfileImageUrl, accountType }) {
    const roomRef = collection(fireStoreDb, 'rooms');
    const q = query(roomRef, where('developerId', '==', developerId), where('testerId', '==', testerId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        const newRoomRef = await addDoc(roomRef, {
            developerId,
            testerId,
            testerFullName,
            testerProfileImageUrl: testerProfileImageUrl || "",
            developerFullName,
            developerProfileImageUrl: developerProfileImageUrl || "",
            lastMessage: message,
            updatedAt: serverTimestamp()
        });
        await addDoc(collection(newRoomRef, 'messages'), {
            senderId: accountType == "DeveloperUser" ? developerId : testerId,
            text: message,
            read: false,
            timestamp: serverTimestamp()
        });
    } else {
        // Room already exists, add the message to the existing room
        const roomId = snapshot.docs[0].id;
        const roomDocRef = doc(fireStoreDb, 'rooms', roomId);
        await addDoc(collection(roomDocRef, 'messages'), {
            senderId: accountType == "DeveloperUser" ? developerId : testerId,
            text: message,
            read: false,
            timestamp: serverTimestamp()
        });
        await updateDoc(roomDocRef, {
            lastMessage: message,
            updatedAt: serverTimestamp()
        });
    }
    return {
        roomId: roomRef.id
    }
}


export const doSendMessage = async ({
    message,
    roomId,
    userId
}: {
    message: string;
    roomId: any
    userId: any
}) => {
    if (message.trim() !== '') {
        try {
            await addDoc(collection(fireStoreDb, 'rooms', roomId, 'messages'), {
                senderId: userId,
                text: message,
                timestamp: serverTimestamp(),
                read: false // New messages are unread by default
            });
        } catch (error) {
            throw error
        }
    }
};
