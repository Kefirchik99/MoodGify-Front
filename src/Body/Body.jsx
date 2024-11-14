// Body.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import Calendar from './Calendar';
import Profile from './Profile';
import Settings from './Settings';
import Register from './Register';
import ForgotPwd from './ForgotPwd';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './cookies/CookiePolicy';
import CookieDeclined from './cookies/CookieDeclined';
import Login from './Login';
import WelcomePage from './WelcomePage';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../providers/authContext';

const Body = () => {
    const { user, hasSeenWelcome, setHasSeenWelcome } = useAuth();

    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/timeline" element={<Calendar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<ForgotPwd />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/cookie-declined" element={<CookieDeclined />} />

                {/* Conditional Redirect to WelcomePage or Profile */}
                <Route
                    path="/profile"
                    element={
                        user ? (
                            hasSeenWelcome ? (
                                <ProtectedRoute><Profile /></ProtectedRoute>
                            ) : (
                                <Navigate to="/welcome" replace />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/welcome"
                    element={
                        user ? (
                            <WelcomePage onSeen={() => setHasSeenWelcome(true)} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

export default Body;
