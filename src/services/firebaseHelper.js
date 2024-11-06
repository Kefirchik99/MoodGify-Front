import { db } from '../firebase';
import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    serverTimestamp,
} from "firebase/firestore";

/**
 * Add a new calendar entry for a user in Firestore.
 * @param {string} userId - The ID of the user.
 * @param {object} data - The entry data (mood, gifUrl, date, comment).
 * @returns {Promise<void>}
 */
export const addCalendarEntry = async (userId, data) => {
    try {
        const entryId = `${data.date}_${userId}`; // Unique ID based on date and user
        await setDoc(doc(db, "users", userId, "calendarEntries", entryId), {
            mood: data.mood,
            gifUrl: data.gifUrl,
            date: data.date,
            comment: data.comment || "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            streakCount: data.streakCount || 0, // Optional field for tracking streaks
        });
        console.log("Calendar entry added successfully");
    } catch (error) {
        console.error("Error adding calendar entry:", error);
        throw new Error("Failed to add calendar entry. Please try again.");
    }
};

/**
 * Fetch all calendar entries for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object[]>} - A list of calendar entries.
 */
export const getCalendarEntries = async (userId) => {
    try {
        const q = query(collection(db, "users", userId, "calendarEntries"));
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return entries;
    } catch (error) {
        console.error("Error fetching calendar entries:", error);
        throw new Error("Failed to fetch calendar entries.");
    }
};

/**
 * Add a notification for a user in Firestore.
 * @param {string} userId - The ID of the user.
 * @param {object} notification - The notification data (title, message).
 * @returns {Promise<void>}
 */
export const addNotification = async (userId, notification) => {
    try {
        const notificationId = `${Date.now()}`; // Unique ID based on timestamp
        await setDoc(doc(db, "users", userId, "notifications", notificationId), {
            title: notification.title,
            message: notification.message,
            createdAt: serverTimestamp(),
        });
        console.log("Notification added successfully");
    } catch (error) {
        console.error("Error adding notification:", error);
        throw new Error("Failed to add notification. Please try again.");
    }
};

/**
 * Fetch all notifications for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object[]>} - A list of notifications.
 */
export const getNotifications = async (userId) => {
    try {
        const q = query(collection(db, "users", userId, "notifications"));
        const querySnapshot = await getDocs(q);
        const notifications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Failed to fetch notifications.");
    }
};
