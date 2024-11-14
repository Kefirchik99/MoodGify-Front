// NotificationsContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { getNotifications, addNotification, removeNotification, clearNotifications } from '../services/notifService';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(getNotifications());

    const add = (title, message) => {
        const newNotification = addNotification(title, message);
        setNotifications(getNotifications());
        return newNotification;
    };

    const remove = (id) => {
        removeNotification(id);
        setNotifications(getNotifications());
    };

    const clearAll = () => {
        clearNotifications();
        setNotifications([]);
    };

    return (
        <NotificationsContext.Provider value={{ notifications, add, remove, clearAll }}>
            {children}
        </NotificationsContext.Provider>
    );
};
