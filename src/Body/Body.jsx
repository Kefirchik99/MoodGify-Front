import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import Calendar from './Calendar';
import Profile from './Profile';
import Notifications from './Notifications';
import Settings from './Settings';
import Register from './Register';
import ForgotPwd from './ForgotPwd';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './cookies/CookiePolicy';
import CookieDeclined from './cookies/CookieDeclined';
import Login from './Login'; // New Login component
import WelcomePage from './WelcomePage'; // Welcome page after login
import ProtectedRoute from './ProtectedRoute'; // Adjust the path if necessary



const Body = () => {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/timeline" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<ForgotPwd />} />
                <Route path="/terms" element={<Terms />} /> {/* Add Terms route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Add Privacy Policy route */}
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/cookie-declined" element={<CookieDeclined />} />
                <Route path="*" element={<Navigate to="/" replace />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

export default Body;
