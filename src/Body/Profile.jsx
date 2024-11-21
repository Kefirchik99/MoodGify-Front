import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useAuth } from '../providers/authContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import Avatar from './Avatar';
import { db } from '../firebase'; // Ensure db is imported correctly
import "../styles/Profile.scss";

const Profile = () => {
    const { user, logout, autoLogoutMessage } = useAuth();
    const [username, setUsername] = useState('User');
    const [registrationDate, setRegistrationDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true); // Loading state to control when content displays

    useEffect(() => {
        if (!user) return;

        const userDocRef = doc(db, 'users', user.uid);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(
            userDocRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsername(userData.username || 'User');
                } else {
                    setErrorMessage('User data not found.');
                }
            },
            (error) => {
                console.error('Error fetching user data:', error.message);
                setErrorMessage('Failed to fetch user data. Please try again later.');
            }
        );

        // Set registration date only once, as it doesn't change
        const regDate = new Date(user.metadata.creationTime);
        setRegistrationDate(
            regDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
        );

        setLoading(false);

        return () => unsubscribe(); // Cleanup subscription
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>
            <Avatar className="profile-avatar" value={user.uid} size={100} /> {/* Display avatar with unique user identifier */}

            <div className="profile-info">
                <p><strong>Username:</strong> <span>{username}</span></p>
                <p><strong>Email:</strong> <span>{user.email}</span></p>
                <p><strong>Registered:</strong> <span>{registrationDate}</span></p>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {autoLogoutMessage && <p className="auto-logout-message">{autoLogoutMessage}</p>}

            <Button intent="danger" onClick={logout} text="Logout" className="logout-button" />
            <Divider className="terms-divider" />
            <Link to="/settings" className="settings-link">Go to Settings</Link> {/* Link to settings page */}
        </div>
    );
};

export default Profile;
