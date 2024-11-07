import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '../styles/Navigation.scss';
import NotifPopover from '../Body/NotifPopover';
import { useAuth } from '../services/firebaseAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bp5-navbar">
            <div className="bp5-navbar-group bp5-align-left">
                <Link to="/" className="bp5-navbar-heading">MoodGify</Link>
                <span className="bp5-navbar-divider"></span>
            </div>
            <div className="bp5-navbar-group bp5-align-right">
                <span className="bp5-navbar-divider"></span>
                <Link to="/home" className="bp5-button bp5-minimal bp5-icon-home">Home</Link>
                <Link to="/timeline" className="bp5-button bp5-minimal bp5-icon-timeline-events">Your Timeline</Link>
                <span className="bp5-navbar-divider"></span>

                {user ? (
                    <>
                        <Tooltip content="Profile">
                            <Link to='/profile' className="bp5-button bp5-minimal bp5-icon-user">Profile</Link>
                        </Tooltip>
                        <Tooltip content="Notifications">
                            <NotifPopover />
                        </Tooltip>
                        <Tooltip content="Settings">
                            <Link to='/settings' className="bp5-button bp5-minimal bp5-icon-cog"></Link>
                        </Tooltip>
                        <Button onClick={logout} className="bp5-button bp5-minimal" text="Logout" intent="danger" />
                    </>
                ) : (
                    <Tooltip content="Login">
                        <Link to='/login' className="bp5-button bp5-minimal bp5-icon-log-in">Login</Link>
                    </Tooltip>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
