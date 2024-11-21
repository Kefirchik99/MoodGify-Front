import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import Avatar from '../Avatar';

const AvatarSettings = () => {
    const [avatarKey, setAvatarKey] = useState(0);

    const handleGenerateNewAvatar = () => {
        setAvatarKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="settings-avatar">
            <Avatar value={avatarKey} size={100} />
            <Button
                intent="primary"
                text="Generate New Avatar"
                onClick={handleGenerateNewAvatar}
                className="settings-avatar-btn"
            />
        </div>
    );
};

export default AvatarSettings;
