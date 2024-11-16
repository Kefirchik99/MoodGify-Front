import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { useAuth } from '../providers/authContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import '../styles/form-layout.scss';

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
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthPage title="Sign In" errorMessage={error}>
            <form onSubmit={handleLogin} className="form-layout">
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
                <Button type="submit" className="form-button" intent="primary" text="Login" />
            </form>
            <div className="extra-links">
                <Link to="/recover-password">Forgot Password?</Link>
                <Link to="/register">New here? Register</Link>
            </div>
        </AuthPage>
    );
};

export default Login;
