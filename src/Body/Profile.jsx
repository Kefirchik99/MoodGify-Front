import React, { useState } from 'react';
import { InputGroup, Button, Divider } from '@blueprintjs/core';
import { loginWithEmail } from '../services/firebaseAuth';
import { sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../services/errorMessages'; // Import error messages
import "../styles/Profile.scss";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState(null); // Track the user state

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (email === '' || password === '') {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const loggedInUser = await loginWithEmail(email, password);

            // Check if the email is verified
            if (!loggedInUser.emailVerified) {
                setErrorMessage('Your email is not verified. Please verify your email.');
                setUser(loggedInUser); // Store the user so we can resend the verification email
                return;
            }

            setErrorMessage('');
            setSuccessMessage('Login successful!');
            console.log("Logged in user:", loggedInUser);
        } catch (error) {
            setErrorMessage(getErrorMessage(error.code)); // Use the centralized error handler
        }
    };

    // Resend email verification
    const handleResendVerification = async () => {
        try {
            if (user) {
                await sendEmailVerification(user); // Send the verification email
                setSuccessMessage('Verification email has been resent. Please check your inbox.');
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage(getErrorMessage(error.code)); // Handle errors during verification
        }
    };

    return (
        <div className="profile-page">
            <h2>Login to Your Account</h2>

            {/* Error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Success message */}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon="user"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input-group"
                        autoComplete="email"
                    />
                </div>

                <div className="form-group">
                    <InputGroup
                        type="password"
                        leftIcon="lock"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input-group"
                        autoComplete="current-password"
                    />
                </div>

                <Button type="submit" className="btn-login" intent="primary" text="Sign In" fill />
            </form>

            {/* Show button to resend verification email if needed */}
            {errorMessage === 'Your email is not verified. Please verify your email.' && (
                <Button intent="warning" onClick={handleResendVerification} text="Resend Verification Email" />
            )}

            <div className="extra-links">
                <Link to="/recover-password" className="recover-password-link">Forgot Password?</Link>
                <Link to="/register" className="register-link">New here? Register</Link>
            </div>

            <Divider className="terms-divider" />

            <div className="terms">
                <p>
                    By signing in, you agree to our
                    <Link to="/terms"> Terms and Conditions</Link> and
                    <Link to="/privacy-policy"> Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default Profile;
