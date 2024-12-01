import React, { useState } from 'react';
import { InputGroup, Button, Collapse } from '@blueprintjs/core';
import { registerWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import PasswordValidationBar from './PasswordValidationBar';
import '../styles/form-layout.scss';

const passwordRules = [
    'At least 8 characters long',
    'Contains an uppercase letter',
    'Contains a special character (!, @, #, etc.)',
    'Contains a numeric digit (0-9)',
];

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isPasswordRulesOpen, setIsPasswordRulesOpen] = useState(false);

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
            setSuccessMessage('Registration successful! Please verify your email.');
        } catch (err) {
            setErrorMessage(err.message || 'An error occurred during registration.');
        }
    };

    return (
        <AuthPage
            title="Create Your Account"
            errorMessage={errorMessage}
            successMessage={successMessage}
        >
            <form onSubmit={handleRegister} className="form-layout">
                <div className="form-group">
                    <InputGroup
                        leftIcon="user"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="form-group">
                    <InputGroup
                        leftIcon="envelope"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <InputGroup
                        leftIcon="lock"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <PasswordValidationBar password={password} rules={passwordRules} />
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
                        autoComplete="new-password"
                    />
                    <PasswordValidationBar
                        password={password}
                        confirmPassword={confirmPassword}
                        showWarning={true}
                        isForConfirm={true}
                    />
                </div>
                <Button
                    type="submit"
                    className="form-button"
                    intent="primary"
                    text="Register"
                />
            </form>
            <div className="extra-links">
                <Link to="/login">Already have an account? Login here.</Link>
            </div>
        </AuthPage>
    );
};

export default Register;
