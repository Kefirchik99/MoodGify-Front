import React, { useState } from 'react';
import { InputGroup, Button, Divider } from '@blueprintjs/core'; // Add Divider
import { loginWithEmail } from '../services/firebaseAuth'; // Firebase function for login
import { Link } from 'react-router-dom'; // Link for navigation
import "../styles/Profile.scss"; // Ensure you create styling if needed

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const user = await loginWithEmail(email, password);
            setErrorMessage(''); // Clear error if successful
            console.log("Logged in user:", user);
        } catch (error) {
            setErrorMessage(error.message); // Show any errors from Firebase
        }
    };

    return (
        <div className="profile-page">
            <h2>Login to Your Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

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
