// Register.jsx
import React, { useState } from 'react';
import { InputGroup, Button, FormGroup } from '@blueprintjs/core';
import { registerWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import "../styles/Register.scss";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            await registerWithEmail(email, password, username);
            setSuccessMessage("Registration successful! Please check your email to verify your account.");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="register-page">
            <h2>Create Your Account</h2>

            {/* Display messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleRegister} className="register-form">
                <FormGroup label="Username" labelFor="username-input" labelInfo="(required)">
                    <InputGroup
                        id="username-input"
                        leftIcon="user"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </FormGroup>

                <FormGroup label="Email" labelFor="email-input" labelInfo="(required)">
                    <InputGroup
                        id="email-input"
                        leftIcon="envelope"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </FormGroup>

                <FormGroup label="Password" labelFor="password-input" labelInfo="(required)">
                    <InputGroup
                        id="password-input"
                        type="password"
                        leftIcon="lock"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </FormGroup>

                <FormGroup label="Confirm Password" labelFor="confirm-password-input" labelInfo="(required)">
                    <InputGroup
                        id="confirm-password-input"
                        type="password"
                        leftIcon="lock"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </FormGroup>

                <Button type="submit" intent="primary" text="Register" fill />
            </form>

            <div className="extra-links">
                <Link to="/login">Already have an account? Login here.</Link>
            </div>
        </div>
    );
};

export default Register;
