import React from 'react';
import { Callout } from '@blueprintjs/core';

const CookieDeclined = () => {
    return (
        <div className="cookie-declined-page">
            <Callout intent="danger" title="Cookies Declined">
                <p>
                    You have declined cookies. As a result, some features of this application may not function
                    correctly. To fully experience MoodGify, please consider enabling cookies.
                </p>
            </Callout>
        </div>
    );
};

export default CookieDeclined;
