import React from 'react';
import { useAuth } from '../services/authContext';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome, {user?.displayName || 'User'}!</h1>
            <p>We’re glad to have you back.</p>
            <Link to="/profile">Go to Profile</Link>
        </div>
    );
};

export default WelcomePage;
