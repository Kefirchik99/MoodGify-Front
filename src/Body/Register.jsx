import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { registerWithEmail } from '../services/firebaseAuth';
import "../styles/Register.scss";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const user = await registerWithEmail(email, password);
            setErrorMessage('');
            console.log("Registered user:", user);
        } catch (error) {
            setErrorMessage(error);
        }
    };

    return (
        <div className="register-page">
            <h2>Create Your Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <InputGroup
                        leftIcon={(!emailFocused && email === '') ? "user" : null}
                        placeholder={(!emailFocused && email === '') ? "Enter your email" : ''}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(email !== '')}
                        className="custom-input-group"
                    />
                </div>

                <div className="form-group">
                    <InputGroup
                        type="password"
                        leftIcon={(!passwordFocused && password === '') ? "lock" : null}
                        placeholder={(!passwordFocused && password === '') ? "Enter your password" : ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(password !== '')}
                        className="custom-input-group"
                    />
                </div>

                <div className="form-group">
                    <InputGroup
                        type="password"
                        leftIcon={(!confirmPasswordFocused && confirmPassword === '') ? "lock" : null}
                        placeholder={(!confirmPasswordFocused && confirmPassword === '') ? "Confirm your password" : ''}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setConfirmPasswordFocused(true)}
                        onBlur={() => setConfirmPasswordFocused(confirmPassword !== '')}
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
