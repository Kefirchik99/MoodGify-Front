import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import PostCalendar from './PostCalendar';
import Profile from './Profile';
import Settings from '../Body/SettingsPage/Settings';
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
    const { user, loading, hasSeenWelcome, setHasSeenWelcome } = useAuth();

    if (loading) {
        return (
            <div className="loading-spinner">
                <p>Loading...</p>
            </div>
        );
    }

    const renderProfileRoute = () => {
        if (!user) return <Navigate to="/login" replace />;
        if (!hasSeenWelcome) return <Navigate to="/welcome" replace />;
        return (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        );
    };

    const renderWelcomeRoute = () => {
        return user ? (
            <WelcomePage onSeen={() => setHasSeenWelcome(true)} />
        ) : (
            <Navigate to="/login" replace />
        );
    };

    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/timeline" element={<PostCalendar />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<ForgotPwd />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/cookie-declined" element={<CookieDeclined />} />
                <Route path="/profile" element={renderProfileRoute()} />
                <Route path="/welcome" element={renderWelcomeRoute()} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    );
};

export default Body;
