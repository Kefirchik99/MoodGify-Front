import React, { useState } from 'react';
import { InputGroup, Button, Checkbox } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { loginWithEmail } from '../services/firebaseAuth';
import "../styles/Profile.scss";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (email === '' || password === '') {
                setErrorMessage("Please fill in both fields.");
            } else {
                const user = await loginWithEmail(email, password);
                setErrorMessage('');
                console.log("Logged in user:", user);
            }
        } catch (error) {
            setErrorMessage(error);
        }
    };

    return (
        <div className="profile-page">
            <h2>Login to Your Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon={(!emailFocused && email === '') ? "user" : null} // Hide icon if focused or has content
                        placeholder={(!emailFocused && email === '') ? "Enter your email" : ''} // Hide placeholder if focused or has content
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)} // Handle focus
                        onBlur={() => setEmailFocused(email !== '')} // Handle blur (keep focused if input is not empty)
                        className="custom-input-group"
                    />
                </div>

                <div className="form-group">
                    <InputGroup
                        type={showPassword ? 'text' : 'password'}
                        rightElement={
                            <Button
                                icon={showPassword ? "eye-off" : "eye-open"}
                                minimal={true}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        }
                        leftIcon={(!passwordFocused && password === '') ? "lock" : null}
                        placeholder={(!passwordFocused && password === '') ? "Enter your password" : ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)} // Handle focus
                        onBlur={() => setPasswordFocused(password !== '')} // Handle blur
                        className="custom-input-group"
                    />
                </div>

                <div className="form-group">
                    <Checkbox
                        label="Remember Me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="custom-checkbox"
                    />
                </div>

                <Button type="submit" className="btn-login" intent="primary" text="Sign In" fill />
            </form>

            <div className="extra-links">
                <Link to="/recover-password" className="recover-password-link">Forgot Password?</Link>
                <Link to="/register" className="register-link">New here? Register</Link>
            </div>

            <div className="terms">
                <p>
                    By signing in, you agree to our <Link to="/terms">Terms and Conditions</Link> and
                    <Link to="/privacy-policy"> Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default Profile;
