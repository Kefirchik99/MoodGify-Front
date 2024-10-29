

import React, { useState } from 'react';
import { InputGroup, Button, Card, Dialog } from '@blueprintjs/core';
import '../styles/MainPage.scss';

const MainPage = () => {
    const [mood, setMood] = useState('');
    const [gifs, setGifs] = useState([]);
    const [selectedGif, setSelectedGif] = useState(null);

    const handleMoodChange = (event) => setMood(event.target.value);

    const handleSearch = () => {
        // Fetch GIFs based on mood
    };

    const openGifDialog = (gif) => setSelectedGif(gif);
    const closeGifDialog = () => setSelectedGif(null);

    return (
        <div className="mood-to-gif">
            {/* Mood Input Section */}
            <div className="mood-input">
                <InputGroup
                    leftIcon="mood"
                    placeholder="Enter your mood..."
                    onChange={handleMoodChange}
                    value={mood}
                    rightElement={<Button text="Search" onClick={handleSearch} />}
                />
            </div>

            {/* GIF Display Grid */}
            <div className="gif-grid">
                {gifs.map((gif) => (
                    <Card
                        key={gif.id}
                        className="gif-card"
                        interactive
                        elevation={2}
                        onClick={() => openGifDialog(gif)}
                    >
                        <img src={gif.url} alt={gif.title} className="gif-image" />
                    </Card>
                ))}
            </div>

            {/* GIF Details Modal */}
            {selectedGif && (
                <Dialog isOpen={true} onClose={closeGifDialog} title={selectedGif.title}>
                    <div className="bp5-dialog-body">
                        <img src={selectedGif.url} alt={selectedGif.title} className="gif-large" />
                        <p>Additional GIF details go here.</p>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default MainPage;
