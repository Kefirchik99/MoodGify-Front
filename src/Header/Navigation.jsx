// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Button, Popover, Position, Icon } from '@blueprintjs/core';
import NotificationsPopover from '../Body/NotifPopover'; // Directly render notifications content here
import "@blueprintjs/core/lib/css/blueprint.css";
import '../styles/Navigation.scss';

const Navbar = () => {
    const [hasNewNotifications, setHasNewNotifications] = useState(true);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleNotificationsClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
        setHasNewNotifications(false); // Clear the new notifications indicator
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
                    <Link to="/profile" className="bp5-button bp5-minimal bp5-icon-user" />
                </Tooltip>

                {/* Notifications Button with Direct Popover for Notifications */}
                <Popover
                    content={<NotificationsPopover onClear={() => setHasNewNotifications(false)} />}
                    isOpen={isPopoverOpen}
                    onInteraction={(state) => setIsPopoverOpen(state)}
                    position={Position.BOTTOM_RIGHT}
                >
                    <Button
                        className="bp5-button bp5-minimal bp5-icon-notifications"
                        onClick={handleNotificationsClick}
                    >
                        {hasNewNotifications && <span className="notification-indicator" />}
                    </Button>
                </Popover>

                <Tooltip content="Settings">
                    <Link to="/settings" className="bp5-button bp5-minimal bp5-icon-cog" />
                </Tooltip>
            </div>
        </nav>
    );
};

export default Navbar;
