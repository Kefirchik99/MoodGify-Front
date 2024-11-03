import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { registerWithEmail } from '../services/firebaseAuth';
import { Link } from 'react-router-dom';
import "../styles/Register.scss";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const user = await registerWithEmail(email, password);
            setSuccessMessage("Registration successful! Please check your email to verify your account.");
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-page">
            <h2>Create Your Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon="user"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input-group"
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
                    />
                </div>

                <div className="form-group">
                    <InputGroup
                        type="password"
                        leftIcon="lock"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="custom-input-group"
                    />
                </div>

                <Button type="submit" className="btn-register" intent="primary" text="Register" fill />
            </form>

            <div className="extra-links">
                <Link to="/profile" className="login-link">Already have an account? Login here.</Link>
            </div>
        </div>
    );
};

export default Register;
