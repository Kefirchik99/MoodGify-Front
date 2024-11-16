import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { sendPasswordReset } from '../services/firebaseAuth';
import AuthPage from './AuthPage';
import '../styles/form-layout.scss';

const ForgotPwd = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email.');
            return;
        }

        try {
            await sendPasswordReset(email);
            setMessage('Password reset email sent!');
            setError('');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <AuthPage title="Reset Your Password" errorMessage={error} successMessage={message}>
            <form onSubmit={handlePasswordReset} className="form-layout">
                <div className="form-group">
                    <InputGroup
                        leftIcon="envelope"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button type="submit" className="form-button" intent="primary" text="Send Reset Email" />
            </form>
            <div className="extra-links">
                <Button minimal intent="primary" onClick={() => window.history.back()}>
                    Back to Login
                </Button>
            </div>
        </AuthPage>
    );
};

export default ForgotPwd;
