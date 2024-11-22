// settingsHooks.js

import { useState, useEffect } from 'react';
import { getChangeHistory } from '../services/changeHistoryService';

export const useFetchChangeHistory = (user) => {
    const [changeHistory, setChangeHistory] = useState([]);

    useEffect(() => {
        if (user) {
            const unsubscribe = getChangeHistory(user.uid, setChangeHistory);
            return () => unsubscribe();
        } else {
            setChangeHistory([]); // Clear change history when user logs out
        }
    }, [user]);

    return { changeHistory };
};
