// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect unauthenticated users to the login page
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
