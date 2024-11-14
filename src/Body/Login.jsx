// Login.jsx
import React, { useState } from 'react';
import { Button, Card, Elevation, InputGroup, FormGroup, Intent } from '@blueprintjs/core';
import { useAuth } from '../providers/authContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
    const { loginWithEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await loginWithEmail(email, password);
            navigate('/welcome'); // Redirect to WelcomePage after successful login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <Card elevation={Elevation.TWO} className="login-card">
                <h2>Sign In</h2>
                {error && <p className="error-message">{error}</p>}

                <FormGroup label="Email" labelFor="email-input" labelInfo="(required)">
                    <InputGroup
                        id="email-input"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup label="Password" labelFor="password-input" labelInfo="(required)">
                    <InputGroup
                        id="password-input"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <Button intent={Intent.PRIMARY} text="Login" onClick={handleLogin} fill />

                <div className="login-links">
                    <Link to="/recover-password">Forgot Password?</Link>
                    <Link to="/register">New here? Register</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
