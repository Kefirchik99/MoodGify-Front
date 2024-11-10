// WelcomePage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../services/authContext';
import { Link } from 'react-router-dom';

const WelcomePage = ({ onSeen }) => {
    const { user } = useAuth();

    useEffect(() => {
        onSeen(); // Mark the welcome page as seen on component mount
    }, [onSeen]);

    return (
        <div className="welcome-page">
            <h1>Welcome, {user?.displayName || 'User'}!</h1>
            <p>We’re glad to have you back.</p>
            <Link to="/profile">Go to Profile</Link>
        </div>
    );
};

export default WelcomePage;

