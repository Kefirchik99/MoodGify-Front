

let notifications = [
    { id: 1, title: 'Welcome', message: 'Thanks for joining Moodgify!' },
    { id: 2, title: 'Update', message: 'New features have been added to your dashboard.' },
];

// Get all notifications
export const getNotifications = () => [...notifications];

// Add a new notification
export const addNotification = (title, message) => {
    const newNotification = { id: Date.now(), title, message };
    notifications = [newNotification, ...notifications];
    return newNotification;
};

// Remove a specific notification by ID
export const removeNotification = (id) => {
    notifications = notifications.filter((notification) => notification.id !== id);
};

// Clear all notifications
export const clearNotifications = () => {
    notifications = [];
};
