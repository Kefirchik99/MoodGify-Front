import React, { useState } from 'react';
import { InputGroup, Button, Dialog } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { fetchGifsByMood } from '../services/api';
import '../styles/MainPage.scss';

const MainPage = () => {
    const [mood, setMood] = useState('');
    const [gifs, setGifs] = useState([]);
    const [selectedGif, setSelectedGif] = useState(null);
    const [addedGifs, setAddedGifs] = useState([]); // Track added GIFs by ID

    const handleMoodChange = (event) => setMood(event.target.value);

    const handleSearch = async () => {
        if (mood.trim() !== '') {
            const results = await fetchGifsByMood(mood);
            setGifs(results);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const openGifDialog = (gif) => setSelectedGif(gif);
    const closeGifDialog = () => setSelectedGif(null);

    // Toggle GIF added status
    const handleAddClick = (gifId) => {
        setAddedGifs((prevAddedGifs) =>
            prevAddedGifs.includes(gifId) ? prevAddedGifs : [...prevAddedGifs, gifId]
        );
    };

    return (
        <div className="mood-to-gif">
            <div className="mood-input">
                <InputGroup
                    leftIcon="emoji"
                    placeholder="Enter your mood..."
                    onChange={handleMoodChange}
                    onKeyDown={handleKeyDown}
                    value={mood}
                    rightElement={<Button text="Search" onClick={handleSearch} />}
                />
            </div>

            <div className="gif-grid">
                {gifs.map((gif) => (
                    <div key={gif.id} className="gif-container">
                        <img src={gif.images.fixed_height.url} alt={gif.title} className="gif-image" />
                        <button
                            className="add-button"
                            title={addedGifs.includes(gif.id) ? "Added to mood" : "Add to current mood"}
                            onClick={() => handleAddClick(gif.id)}
                        >
                            <FontAwesomeIcon icon={addedGifs.includes(gif.id) ? faCheck : faPlus} />
                        </button>
                        {addedGifs.includes(gif.id) && (
                            <span className="added-text">Added to mood</span>
                        )}
                    </div>
                ))}
            </div>

            {selectedGif && (
                <Dialog isOpen={true} onClose={closeGifDialog} title={selectedGif.title}>
                    <div className="bp5-dialog-body">
                        <img src={selectedGif.images.original.url} alt={selectedGif.title} className="gif-large" />
                        <p>Additional GIF details go here.</p>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default MainPage;
