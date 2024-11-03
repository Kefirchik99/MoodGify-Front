import React, { useState } from 'react';
import { InputGroup, Button, Divider } from '@blueprintjs/core'; // Add Divider
import { loginWithEmail } from '../services/firebaseAuth'; // Firebase function for login
import { Link } from 'react-router-dom'; // Link for navigation
import "../styles/Profile.scss"; // Ensure you create styling if needed
import { sendEmailVerification } from 'firebase/auth'; // Import to resend email verification

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Message for successful actions

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        if (email === '' || password === '') {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const user = await loginWithEmail(email, password);

            // Check if the email is verified
            if (!user.emailVerified) {
                setErrorMessage('Your email is not verified. Please verify your email.');
                return;
            }

            setErrorMessage(''); // Clear error if successful
            console.log("Logged in user:", user);
        } catch (error) {
            setErrorMessage(error.message); // Show any errors from Firebase
        }
    };

    // Function to resend the email verification
    const handleResendVerification = async () => {
        try {
            const user = await loginWithEmail(email, password);
            await sendEmailVerification(user); // Send verification email
            setSuccessMessage('Verification email has been resent. Please check your inbox.');
        } catch (error) {
            setErrorMessage('Failed to resend verification email.');
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

            {/* Button to resend verification email if not verified */}
            {errorMessage === 'Your email is not verified. Please verify your email.' && (
                <Button intent="warning" onClick={handleResendVerification} text="Resend Verification Email" />
            )}

            <div className="extra-links">
                <Link to="/recover-password" className="recover-password-link">Forgot Password?</Link>
                <Link to="/register" className="register-link">New here? Register</Link>
            </div>

            {/* Add Divider here */}
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
