import React, { useState } from 'react';
import { InputGroup, Button, Collapse } from '@blueprintjs/core';
import { registerWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import '../styles/form-layout.scss';

const passwordRules = [
    "At least 8 characters long",
    "Contains an uppercase letter",
    "Contains a special character (!, @, #, etc.)",
    "Contains a numeric digit (0-9)",
];

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isPasswordRulesOpen, setIsPasswordRulesOpen] = useState(false); // State for the collapse
    const [passwordValid, setPasswordValid] = useState(false); // Track password validity

    const validatePassword = (password) => {
        const rules = [
            password.length >= 8, // Minimum length
            /[A-Z]/.test(password), // At least one uppercase letter
            /[!@#$%^&*]/.test(password), // At least one special character
            /[0-9]/.test(password), // At least one numeric digit
        ];
        return rules.every(Boolean);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(validatePassword(newPassword)); // Validate password and update state
    };

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
                        onChange={handlePasswordChange}
                    />
                    <div
                        className={`password-bar ${passwordValid ? 'valid' : 'invalid'}`}
                    ></div>
                    <Button
                        minimal
                        intent="none"
                        text={isPasswordRulesOpen ? "Hide Password Rules" : "Show Password Rules"}
                        onClick={() => setIsPasswordRulesOpen(!isPasswordRulesOpen)}
                        className="password-rules-toggle"
                    />
                    <Collapse isOpen={isPasswordRulesOpen}>
                        <ul className="password-rules">
                            {passwordRules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </Collapse>
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
