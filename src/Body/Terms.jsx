import React from 'react';
import { Callout } from '@blueprintjs/core';
import '../styles/Terms.scss';

const Terms = () => {
    return (
        <div className="terms-page">
            <h1>Terms and Conditions</h1>

            <Callout intent="primary" title="Introduction">
                <p>
                    Welcome to our application! By using our services, you agree to the following terms and conditions.
                    Please read them carefully.
                </p>
            </Callout>

            <Callout intent="primary" title="User Responsibilities">
                <p>
                    As a user of our application, you agree to use it in a lawful and respectful manner. You must not
                    use the application for any illegal activities or violate the rights of others.
                </p>
            </Callout>

            <Callout intent="primary" title="Privacy">
                <p>
                    We take your privacy seriously. Please refer to our <a href="/privacy-policy">Privacy Policy</a> to
                    understand how we handle your personal information.
                </p>
            </Callout>

            <Callout intent="primary" title="Modifications to the Terms">
                <p>
                    We reserve the right to modify these terms and conditions at any time. We will notify you of any
                    changes, and it is your responsibility to review the terms regularly.
                </p>
            </Callout>

            {/* Additional sections can be added here in a similar fashion */}
        </div>
    );
};

export default Terms;
