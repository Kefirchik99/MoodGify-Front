import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/firebaseAuth';
import { getErrorMessage } from '../services/errorMessages';
import { InputGroup, Button } from '@blueprintjs/core';
import "../styles/Login.scss"; // Create this for styling as needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await loginWithEmail(email, password);
            navigate('/welcome'); // Redirect to welcome page after successful login
        } catch (error) {
            setError(getErrorMessage(error.code));
        }
    };

    return (
        <div className="login-page">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <InputGroup
                    leftIcon="envelope"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroup
                    type="password"
                    leftIcon="lock"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" intent="primary" text="Login" />
            </form>
            <div className="extra-links">
                <Button minimal intent="primary" onClick={() => navigate('/recover-password')}>
                    Forgot Password?
                </Button>
            </div>
        </div>
    );
};

export default Login;
