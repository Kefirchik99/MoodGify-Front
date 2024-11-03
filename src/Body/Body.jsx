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
import PrivacyPolicy from './ProvacyPolicy';


const Body = () => {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/timeline" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<ForgotPwd />} />
                <Route path="/terms" element={<Terms />} /> {/* Add Terms route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Add Privacy Policy route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

export default Body;
