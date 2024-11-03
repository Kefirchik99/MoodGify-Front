import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core'; // Using Blueprint for UI components
import { sendPasswordReset } from '../services/firebaseAuth'; // Firebase function to send reset email
import "../styles/ForgotPwd.scss"; // Ensure you create styling if needed

const ForgotPwd = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (email === '') {
            setError('Please enter your email.');
            return;
        }

        try {
            await sendPasswordReset(email);
            setMessage('Password reset email sent!');
            setError(''); // Clear error if successful
        } catch (error) {
            setMessage('');
            setError(error.message); // Show any errors from Firebase
        }
    };

    return (
        <div className="forgot-password-page">
            <h2>Reset Your Password</h2>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handlePasswordReset} className="forgot-password-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon="envelope"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input-group"
                    />
                </div>

                <Button type="submit" className="btn-reset" intent="primary" text="Send Reset Email" fill />
            </form>

            <div className="extra-links">
                <Button minimal intent="primary" onClick={() => window.history.back()}>
                    Back to Login
                </Button>
            </div>
        </div>
    );
};

export default ForgotPwd;
