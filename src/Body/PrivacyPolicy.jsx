import React from 'react';
import { Callout } from '@blueprintjs/core';
import '../styles/PrivacyPolicy.scss';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            <h1>Privacy Policy</h1>

            <Callout title="Introduction" intent="primary">
                <p>
                    At MoodGify, we value your privacy and are committed to protecting your personal data. This Privacy
                    Policy outlines how we collect, use, and safeguard your information when you interact with our
                    platform.
                </p>
            </Callout>

            <Callout title="Data We Collect" intent="primary">
                <p>We may collect the following types of information:</p>
                <ul>
                    <li><strong>Personal Information:</strong> This includes your name, email address, and other details you provide when you create an account or use our services.</li>
                    <li><strong>Usage Data:</strong> This includes information about how you use our platform, such as browsing behavior, search terms, and interaction with content.</li>
                    <li><strong>Cookies:</strong> We may use cookies and similar tracking technologies to enhance your experience and gather analytics about our platform's usage.</li>
                </ul>
            </Callout>

            <Callout title="How We Use Your Data" intent="primary">
                <p>We use the data we collect for the following purposes:</p>
                <ul>
                    <li><strong>Providing Services:</strong> To deliver the services and features you request.</li>
                    <li><strong>Improving our Platform:</strong> To analyze how you use our platform and improve functionality and user experience.</li>
                    <li><strong>Communication:</strong> To send you updates, notifications, and other communications related to your account or the platform.</li>
                    <li><strong>Legal Compliance:</strong> To comply with legal obligations, such as data retention laws and regulations.</li>
                </ul>
            </Callout>

            <Callout title="Data Sharing and Disclosure" intent="primary">
                <p>We do not sell, rent, or trade your personal information with third parties. However, we may share your data in the following circumstances:</p>
                <ul>
                    <li><strong>Service Providers:</strong> We may share your data with trusted third-party service providers who help us operate and improve our platform.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your data if required to do so by law or in response to a valid legal request.</li>
                </ul>
            </Callout>

            <Callout title="How We Protect Your Data" intent="primary">
                <p>We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or loss. These measures include:</p>
                <ul>
                    <li>Encryption of sensitive data during transmission.</li>
                    <li>Regular security audits and vulnerability assessments.</li>
                    <li>Strict access controls to limit who can access your information.</li>
                </ul>
                <p>However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security of your data.</p>
            </Callout>

            <Callout title="Your Rights and Choices" intent="primary">
                <p>You have certain rights regarding your personal data:</p>
                <ul>
                    <li><strong>Access and Correction:</strong> You can request access to or correction of your personal information at any time.</li>
                    <li><strong>Data Deletion:</strong> You may request that we delete your account and any associated data.</li>
                    <li><strong>Opt-Out:</strong> You can opt-out of receiving communications from us at any time by adjusting your preferences in your account settings or by contacting us.</li>
                </ul>
            </Callout>

            <Callout title="Changes to This Policy" intent="primary">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will notify you by updating the date at the top of this page or through other appropriate means.</p>
            </Callout>

            <Callout title="Contact Us" intent="primary">
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p>Email: privacy@moodgify.com</p>
                <p>Mail: MoodGify, 123 Main Street, City, Country</p>
            </Callout>
        </div>
    );
};

export default PrivacyPolicy;
