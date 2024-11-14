// NotificationsPopover.jsx
import React from 'react';
import { Button, Icon } from "@blueprintjs/core";
import { useNotifications } from '../providers/NotificationsContext';
import '../styles/NotifPopover.scss';

const NotificationsPopover = ({ onClear }) => {
    const { notifications, clearAll, remove } = useNotifications();

    return (
        <div className="notifications-popover">
            <h5>Notifications</h5>
            {notifications.length > 0 && (
                <Button
                    text="Clear All"
                    intent="danger"
                    onClick={() => {
                        clearAll();
                        onClear(); // Call onClear to update Navbar indicator
                    }}
                    small
                />
            )}
            <div className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                            <div>
                                <strong>{notification.title}</strong>
                                <p>{notification.message}</p>
                            </div>
                            <Button
                                icon="cross"
                                minimal
                                intent="danger"
                                onClick={() => remove(notification.id)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="no-notifications">No new notifications</p>
                )}
            </div>
        </div>
    );
};

export default NotificationsPopover;
