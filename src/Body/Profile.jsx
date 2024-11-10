import React, { useState } from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useAuth } from '../services/authContext';
import { sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import "../styles/Profile.scss";

const Profile = () => {
    const { user } = useAuth(); // Get the authenticated user from context
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Resend email verification
    const handleResendVerification = async () => {
        try {
            if (user && !user.emailVerified) {
                await sendEmailVerification(user);
                setSuccessMessage('Verification email has been resent. Please check your inbox.');
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage('Error sending verification email.');
            setSuccessMessage('');
        }
    };

    // Display a message if the user is not logged in
    if (!user) {
        return (
            <div className="profile-page">
                <p>Please log in to view your profile.</p>
                <Link to="/login">Go to Login</Link>
            </div>
        );
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

            {/* Error and Success Messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Resend Verification Email */}
            {!user.emailVerified && (
                <Button intent="warning" onClick={handleResendVerification} text="Resend Verification Email" />
            )}

            <Divider className="terms-divider" />

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
