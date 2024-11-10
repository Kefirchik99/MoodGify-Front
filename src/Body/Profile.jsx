// Profile.jsx
import React, { useState } from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useAuth } from '../services/authContext';
import { sendEmailVerification } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import "../styles/Profile.scss";

const Profile = () => {
    const { user, logout, autoLogoutMessage } = useAuth(); // Get user, logout function, and auto-logout message from context
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to resend email verification
    const handleResendVerification = async () => {
        if (user && !user.emailVerified) {
            try {
                await sendEmailVerification(user);
                setSuccessMessage('Verification email has been resent. Please check your inbox.');
                setErrorMessage('');
            } catch {
                setErrorMessage('Error sending verification email.');
                setSuccessMessage('');
            }
        }
    };

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>

            {/* User Information */}
            <div className="profile-info">
                <p><strong>Name:</strong> {user.displayName || 'Anonymous'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
            </div>

            {/* Message Display */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {autoLogoutMessage && <p className="auto-logout-message">{autoLogoutMessage}</p>}

            {/* Resend Verification Button */}
            {!user.emailVerified && (
                <Button intent="warning" onClick={handleResendVerification} text="Resend Verification Email" />
            )}

            {/* Logout Button */}
            <Button intent="danger" onClick={logout} text="Logout" className="logout-button" />

            <Divider className="terms-divider" />

            {/* Terms and Privacy Links */}
            <div className="terms">
                <p>
                    By using this application, you agree to our
                    <Link to="/terms"> Terms and Conditions</Link> and
                    <Link to="/privacy-policy"> Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default Profile;
