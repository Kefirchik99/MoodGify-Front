import React, { useState } from 'react';
import { InputGroup, Button, Checkbox } from '@blueprintjs/core'; // Importing Blueprint components
import { Link } from 'react-router-dom';
import "../styles/Profile.scss";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // States to track focus
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorMessage("Please fill in both fields.");
        } else {
            setErrorMessage('');
            // Proceed with login logic
        }
    };

    return (
        <div className="profile-page">
            <h2>Login to Your Account</h2>

            {/* Error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon={!emailFocused && !email ? "user" : null} // Hide icon when focused or filled
                        placeholder={!emailFocused ? "Enter your email" : ""} // Hide placeholder when focused
                        value={email}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        onChange={(e) => setEmail(e.target.value)}
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
                        leftIcon={!passwordFocused && !password ? "lock" : null} // Hide icon when focused or filled
                        placeholder={!passwordFocused ? "Enter your password" : ""} // Hide placeholder when focused
                        value={password}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) => setPassword(e.target.value)}
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
