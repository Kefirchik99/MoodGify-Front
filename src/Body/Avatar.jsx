// Avatar.jsx

import React from 'react';
import { toSvg } from 'jdenticon';
import { useAuth } from '../providers/authContext';

const Avatar = ({ size = 100 }) => {
    const { avatarSeed } = useAuth();

    if (avatarSeed === null) {
        return (
            <div
                className="avatar placeholder"
                style={{ width: size, height: size, backgroundColor: '#f0f0f0' }}
            />
        );
    }

    const svgString = toSvg(avatarSeed.toString(), size);

    return (
        <div
            className="avatar"
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svgString }}
        />
    );
};

export default Avatar;
