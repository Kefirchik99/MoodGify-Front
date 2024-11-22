// notifService.js

import { db } from '../firebase';
import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    doc,
    writeBatch,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';

// Fetch notifications in real-time
export const getNotifications = (userId, setNotifications) => {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const notificationsQuery = query(notificationsRef, orderBy('timestamp', 'desc'));

    return onSnapshot(notificationsQuery, (snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNotifications(notificationsData);
    });
};

// Add a new notification
export const addNotification = async (userId, title, message) => {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    await addDoc(notificationsRef, {
        title,
        message,
        timestamp: new Date(),
        read: false,
    });
};

// Remove a notification
export const removeNotification = async (userId, notificationId) => {
    const notificationDocRef = doc(db, 'users', userId, 'notifications', notificationId);
    await deleteDoc(notificationDocRef);
};

// Clear all notifications
export const clearNotifications = async (userId) => {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const notificationsSnapshot = await getDocs(notificationsRef);
    const batch = writeBatch(db);

    notificationsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
};
