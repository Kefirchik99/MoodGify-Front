// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Button, Popover, Position, Icon } from '@blueprintjs/core';
import NotificationsPopover from '../Body/NotifPopover';
import { useAuth } from '../providers/authContext';
import "@blueprintjs/core/lib/css/blueprint.css";
import '../styles/Navigation.scss';

const Navbar = () => {
    const { user, loading } = useAuth();
    const [hasNewNotifications, setHasNewNotifications] = useState(true);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleNotificationsClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
        setHasNewNotifications(false);
    };

    return (
        <nav className="bp5-navbar">
            <div className="bp5-navbar-group bp5-align-left">
                <Link to="/" className="bp5-navbar-heading">MoodGify</Link>
                <span className="bp5-navbar-divider"></span>
            </div>
            <div className="bp5-navbar-group bp5-align-right">
                <Link to="/home" className="bp5-button bp5-minimal bp5-icon-home">Home</Link>
                <Link to="/timeline" className="bp5-button bp5-minimal bp5-icon-timeline-events">Your Timeline</Link>

                <Tooltip content="Profile">
                    <Link to='/profile' className="bp5-button bp5-minimal bp5-icon-user"></Link>
                </Tooltip>

                {/* Notifications Icon with dot */}
                {(loading || user) && (
                    <Tooltip content="Notifications" disabled={isPopoverOpen}>
                        <Popover
                            content={<NotificationsPopover />}
                            isOpen={isPopoverOpen}
                            onInteraction={(state) => setIsPopoverOpen(state)}
                            position={Position.BOTTOM_RIGHT}
                        >
                            <Button
                                className="bp5-button bp5-minimal notification-bell"
                                onClick={handleNotificationsClick}
                                icon={<Icon icon="notifications" />}
                            >
                                <span
                                    className={`notification-indicator ${hasNewNotifications ? 'visible' : ''}`}
                                />
                            </Button>
                        </Popover>
                    </Tooltip>
                )}

                <Tooltip content="Settings">
                    <Link to='/settings' className="bp5-button bp5-minimal bp5-icon-cog"></Link>
                </Tooltip>
            </div>
        </nav>
    );
};

export default Navbar;
