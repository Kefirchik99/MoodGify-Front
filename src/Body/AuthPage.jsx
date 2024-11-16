// AuthPage.jsx
import React from 'react';
import "../styles/AuthPage.scss";

const AuthPage = ({ title, children, errorMessage, successMessage }) => {
    return (
        <div className="auth-page form-container">
            <h2>{title}</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {children}
        </div>
    );
};

export default AuthPage;
