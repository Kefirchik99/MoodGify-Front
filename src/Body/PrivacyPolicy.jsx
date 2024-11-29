import React from 'react';
import { Callout } from '@blueprintjs/core';
import '../styles/Policies.scss';

const PrivacyPolicy = () => {
    return (
        <div className="policy-page">
            <h1>Privacy Policy</h1>
            <Callout title="Introduction" intent="primary">
                <p>
                    At MoodGify, we value your privacy and are committed to protecting your personal data. This Privacy
                    Policy outlines how we collect, use, and safeguard your information when you interact with our
                    platform.
                </p>
            </Callout>
            <Callout title="Data We Collect" intent="primary">
                <ul>
                    <li>
                        <strong>Personal Information:</strong> This includes your name, email address, and other details you provide when you create an account or use our services.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> This includes information about how you use our platform, such as browsing behavior, search terms, and interaction with content.
                    </li>
                    <li>
                        <strong>Cookies:</strong> We may use cookies and similar tracking technologies to enhance your experience and gather analytics about our platform's usage.
                    </li>
                </ul>
            </Callout>
        </div>
    );
};

export default PrivacyPolicy;
