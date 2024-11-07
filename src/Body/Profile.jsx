import React, { useState } from 'react';
import { InputGroup, Button, Divider } from '@blueprintjs/core';
import { loginWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../services/errorMessages';
import { useAuth } from '../services/firebaseAuth';
import "../styles/Profile.scss";

const Profile = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            setSuccessMessage('Login successful!');
        } catch (error) {
            setErrorMessage(getErrorMessage(error.code));
        }
    };

    if (user) {
        return (
            <div className="profile-page">
                <h2>Welcome back, {user.email}!</h2>
                <p>You are logged in. Enjoy using MoodGify!</p>
                <Link to="/home" className="bp5-button bp5-intent-primary">Go to Home</Link>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h2>Login to Your Account</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
