import React from 'react';
import { Button } from "@blueprintjs/core";
import { useNotifications } from '../providers/NotificationsContext';
import '../styles/NotifPopover.scss';

const NotificationsPopover = () => {
    const { notifications, clearAll, remove } = useNotifications();

    return (
        <div className="notifications-popover">
            <h5>Notifications</h5>
            <div className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                            <div className="notification-content">
                                <strong>{notification.title}</strong>
                                <p>{notification.message}</p>
                            </div>
                            <Button
                                icon="cross"
                                minimal
                                intent="danger"
                                onClick={() => remove(notification.id)}
                                className="delete-notification-btn"
                            />
                        </div>
                    ))
                ) : (
                    <p className="no-notifications">No new notifications</p>
                )}
            </div>
            {notifications.length > 0 && (
                <Button
                    text="Clear All"
                    intent="danger"
                    onClick={clearAll}
                    className="clear-all-btn"
                />
            )}
        </div>
    );
};

export default NotificationsPopover;
