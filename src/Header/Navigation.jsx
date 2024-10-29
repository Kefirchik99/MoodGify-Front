// import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import '../styles/Navigation.scss';

const Navbar = () => {
    return (
        <nav className="bp5-navbar">
            <div className="bp5-navbar-group bp5-align-left">
                <div className="bp5-navbar-heading">MoodGify</div>
                <span className="bp5-navbar-divider"></span>
                {/* <input
                    className="bp5-input"
                    placeholder="Search files..."
                    type="text"
                /> */}
            </div>
            <div className="bp5-navbar-group bp5-align-right">
                <span className="bp5-navbar-divider"></span>
                <button className="bp5-button bp5-minimal bp5-icon-home">Home</button>
                <button className="bp5-button bp5-minimal bp5-icon-timeline-events">Your timeline</button>
                <span className="bp5-navbar-divider"></span>
                <button className="bp5-button bp5-minimal bp5-icon-user"></button>
                <button className="bp5-button bp5-minimal bp5-icon-notifications"></button>
                <button className="bp5-button bp5-minimal bp5-icon-cog"></button>
            </div>
        </nav>
    );
};

export default Navbar;
