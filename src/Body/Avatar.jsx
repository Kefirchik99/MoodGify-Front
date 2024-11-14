// Avatar.jsx
import React from 'react';

import { toSvg } from 'jdenticon';


const Avatar = ({ value, size = 100 }) => {
    const svgString = toSvg(value, size); // Use `toSvg` from jdenticon

    return (
        <div
            className="avatar"
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svgString }}
        />
    );
};

export default Avatar;
