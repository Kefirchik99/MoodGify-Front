// NotificationsContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getNotifications,
    addNotification,
    removeNotification,
    clearNotifications,
} from '../services/notifService';
import { useAuth } from './authContext';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let unsubscribe = () => { };

        if (user) {
            // Start real-time listener for notifications
            unsubscribe = getNotifications(user.uid, setNotifications);
        } else {
            setNotifications([]);
        }

        return () => {
            unsubscribe();
        };
    }, [user]);

    const add = async (title, message) => {
        if (!user) return;
        await addNotification(user.uid, title, message);
    };

    const remove = async (id) => {
        if (!user) return;
        await removeNotification(user.uid, id);
    };

    const clearAll = async () => {
        if (!user) return;
        await clearNotifications(user.uid);
        setNotifications([]);
    };

    return (
        <NotificationsContext.Provider value={{ notifications, add, remove, clearAll }}>
            {children}
        </NotificationsContext.Provider>
    );
};
