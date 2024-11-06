import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import '../styles/Navigation.scss';
import NotifPopover from '../Body/NotifPopover';

const Navbar = () => {
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

                <Tooltip content="Profile">
                    <Link to='/profile' className="bp5-button bp5-minimal bp5-icon-user"></Link>
                </Tooltip>


                <Tooltip content="Notifications">
                    <NotifPopover />
                </Tooltip>

                <Tooltip content="Settings">
                    <Link to='/settings' className="bp5-button bp5-minimal bp5-icon-cog"></Link>
                </Tooltip>
            </div>
        </nav>
    );
};

export default Navbar;
