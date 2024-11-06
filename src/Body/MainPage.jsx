import React, { useState } from 'react';
import { InputGroup, Button, Dialog, FormGroup, TextArea } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { fetchGifsByMood } from '../services/api';
import { addCalendarEntry, addNotification } from '../services/firebaseHelper'; // Import addNotification
import { getAuth } from 'firebase/auth';
import '../styles/MainPage.scss';

const MainPage = () => {
    const [mood, setMood] = useState('');
    const [gifs, setGifs] = useState([]);
    const [selectedGif, setSelectedGif] = useState(null);
    const [addedGifs, setAddedGifs] = useState([]); // Track added GIFs by ID
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
    const [comment, setComment] = useState(''); // Comment for GIF entry
    const [selectedMood, setSelectedMood] = useState(''); // Mood for GIF entry

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

    const openGifModal = (gif) => {
        setSelectedGif(gif);
        setIsModalOpen(true);
    };

    const closeGifModal = () => {
        setIsModalOpen(false);
        setSelectedMood('');
        setComment('');
    };

    // Save GIF with mood and comment to Firestore and send a notification
    const handleSaveToCalendar = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const entryData = {
                mood: selectedMood,
                gifUrl: selectedGif.images.fixed_height.url,
                date: new Date().toISOString().split("T")[0], // Store date in YYYY-MM-DD format
                comment
            };

            try {
                await addCalendarEntry(userId, entryData); // Save entry to Firestore

                // Notify user of successful addition
                const notification = {
                    title: "GIF Added to Calendar",
                    message: `Your mood and GIF have been added to your calendar for ${entryData.date}.`,
                };
                await addNotification(userId, notification);

                setAddedGifs((prev) => [...prev, selectedGif.id]);
                console.log("GIF added to calendar with notification.");
            } catch (error) {
                console.error("Failed to add entry and notification:", error);
            } finally {
                closeGifModal();
            }
        } else {
            console.log("User not authenticated");
        }
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
                            onClick={() => openGifModal(gif)}
                        >
                            <FontAwesomeIcon icon={addedGifs.includes(gif.id) ? faCheck : faPlus} />
                        </button>
                        {addedGifs.includes(gif.id) && (
                            <span className="added-text">Added to mood</span>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && selectedGif && (
                <Dialog isOpen={isModalOpen} onClose={closeGifModal} title="Add to Calendar">
                    <div className="bp5-dialog-body">
                        <img src={selectedGif.images.original.url} alt={selectedGif.title} className="gif-large" />
                        <FormGroup label="Select Mood">
                            <InputGroup
                                placeholder="e.g., Happy, Sad, Excited"
                                value={selectedMood}
                                onChange={(e) => setSelectedMood(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup label="Add a Comment">
                            <TextArea
                                placeholder="Add any additional notes..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fill
                            />
                        </FormGroup>
                    </div>
                    <div className="bp5-dialog-footer">
                        <Button intent="primary" onClick={handleSaveToCalendar}>
                            Save to Calendar
                        </Button>
                        <Button onClick={closeGifModal}>Cancel</Button>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default MainPage;
