// changeHistoryService.js

import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

// Add a change history entry
export const addChangeHistoryEntry = async (userId, changeEntry) => {
    const changeHistoryRef = collection(db, 'users', userId, 'changeHistory');
    await addDoc(changeHistoryRef, {
        ...changeEntry,
        timestamp: new Date(),
    });
};

// Fetch change history in real-time
export const getChangeHistory = (userId, setChangeHistory) => {
    const changeHistoryRef = collection(db, 'users', userId, 'changeHistory');
    const changeHistoryQuery = query(changeHistoryRef, orderBy('timestamp', 'desc'));

    return onSnapshot(changeHistoryQuery, (snapshot) => {
        const changes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setChangeHistory(changes);
    });
};
