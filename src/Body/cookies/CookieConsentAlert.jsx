import React, { useState, useEffect } from 'react';
import { Alert, Button, Intent } from '@blueprintjs/core';
import Cookies from 'js-cookie'; // Library to manage cookies
import { useNavigate } from 'react-router-dom';
import '../styles/CookieConsent.scss'; // Make sure to style it accordingly

const CookieConsentAlert = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the cookie consent has been set
        const cookieConsent = Cookies.get('cookie-consent');
        if (!cookieConsent) {
            setIsAlertOpen(true); // Show the alert if consent not given
        }
    }, []);

    const handleAcceptCookies = () => {
        // Set a cookie to mark consent given
        Cookies.set('cookie-consent', 'accepted', { expires: 365 });
        setIsAlertOpen(false); // Close the alert
    };

    const handleDeclineCookies = () => {
        // Redirect user away or disable some features
        navigate('/cookie-declined'); // You can define this route in your app
        setIsAlertOpen(false);
    };

    return (
        <Alert
            isOpen={isAlertOpen}
            cancelButtonText="Decline"
            confirmButtonText="Accept"
            intent={Intent.PRIMARY}
            onConfirm={handleAcceptCookies}
            onCancel={handleDeclineCookies}
            icon="info-sign"
        >
            <p>
                MoodGify uses cookies to enhance your browsing experience and to provide analytics. By accepting, you
                agree to our <a href="/cookie-policy">Cookie Policy</a>. You can opt out by declining, but some features
                may not function properly.
            </p>
        </Alert>
    );
};

export default CookieConsentAlert;
