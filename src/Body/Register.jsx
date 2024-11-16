import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { registerWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import '../styles/form-layout.scss';

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
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            await registerWithEmail(email, password, username);
            setSuccessMessage('Registration successful! Please check your email to verify your account.');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <AuthPage title="Create Your Account" errorMessage={errorMessage} successMessage={successMessage}>
            <form onSubmit={handleRegister} className="form-layout">
                <div className="form-group">
                    <InputGroup
                        leftIcon="user"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <InputGroup
                        leftIcon="envelope"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <InputGroup
                        leftIcon="lock"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <InputGroup
                        leftIcon="lock"
                        placeholder="Confirm your password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="form-button" intent="primary" text="Register" />
            </form>
            <div className="extra-links">
                <Link to="/login">Already have an account? Login here.</Link>
            </div>
        </AuthPage>
    );
};

export default Register;
