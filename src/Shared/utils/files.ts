import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v5 as uuidv5 } from 'uuid';
import { firebaseStorage } from 'config/firebase.config';

export const uploadFileToFirebase = async (basePath: string, file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = file.name;
    const ext = fileName.substr(fileName.lastIndexOf('.') + 1);
    const fileNameToSend = `${timestamp}-${fileName.trim()}`;
    const uuid = uuidv5(fileNameToSend, uuidv5.DNS);
    console.log(uuid);
    console.log(uuid + '.' + ext);
    const filesStorageRef = ref(firebaseStorage, `${basePath}${uuid + '.' + ext}`);
    const uploadSnapShot = await uploadBytes(filesStorageRef, file);
    const fileUrl = await getDownloadURL(uploadSnapShot.ref);
    return fileUrl;
};

export const deleteFirebaseFileFromUrl = async (basePath: string, url: string): Promise<void> => {
    // Find the index of "images%" in the URL
    const startIndex = url.indexOf(basePath + "%");
    let extractedFileName: string | null = null;

    if (startIndex !== -1) {
        // Find the index of the next "?"
        const endIndex = url.indexOf('?', startIndex);
        if (endIndex !== -1) {
            // Extract the portion between "images%" and the next "?", excluding "images%"
            extractedFileName = url.substring(startIndex + (basePath + "%").length, endIndex);
            extractedFileName = extractedFileName.substring(2);
            console.log(extractedFileName);
        }
    }

    if (extractedFileName !== null) {
        const fileRef = ref(firebaseStorage, `${basePath}/${extractedFileName}`);
        try {
            await deleteObject(fileRef);
        } catch (error) {
            throw error;
        }
    }
};