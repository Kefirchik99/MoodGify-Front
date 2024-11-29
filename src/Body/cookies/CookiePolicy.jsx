import React from 'react';
import { Callout } from '@blueprintjs/core';
import '../../styles/Policies.scss';

const CookiePolicy = () => {
    return (
        <div className="policy-page">
            <h1>Cookie Policy</h1>
            <Callout intent="primary" title="What are Cookies?">
                <p>
                    Cookies are small text files stored on your device that help websites track user preferences and
                    behaviors. We use cookies to enhance your experience and to analyze site traffic.
                </p>
            </Callout>
            <Callout intent="primary" title="How We Use Cookies">
                <ul>
                    <li>To track your preferences and settings</li>
                    <li>To analyze how you interact with our platform</li>
                    <li>To personalize your experience</li>
                    <li>To maintain security and prevent fraud</li>
                </ul>
            </Callout>
            <Callout intent="primary" title="Your Cookie Choices">
                <p>
                    You can opt to accept or decline cookies. If you decline, some features of the app may not work as
                    expected. You can also change your cookie preferences anytime in your browser settings.
                </p>
            </Callout>
        </div>
    );
};

export default CookiePolicy;
