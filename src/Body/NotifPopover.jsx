// src/components/NotificationsPopover.jsx

import React from 'react';
import { Button, Classes, Popover, Icon } from "@blueprintjs/core";
import { useNotifications } from '../providers/NotifContext';
import '../styles/NotifPopover.scss';

const NotifPopover = () => {
    const { notifications, clearAll, remove } = useNotifications();

    return (
        <Popover
            popoverClassName={Classes.POPOVER_CONTENT_SIZING}
            placement="bottom"
            content={
                <div className="notifications-content">
                    <h5>Notifications</h5>
                    {/* Conditionally render Clear All button only if there are notifications */}
                    {notifications.length > 0 && (
                        <Button
                            text="Clear All"
                            intent="danger"
                            onClick={clearAll}
                            small
                            className="clear-all-btn"
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
            }
        >
            <Button icon={<Icon icon="notifications" />} minimal className="notifications-icon-btn">
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
            </Button>
        </Popover>
    );
};

export default NotifPopover;
