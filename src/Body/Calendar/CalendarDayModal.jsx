// src/components/Calendar/CalendarDayModal.jsx
import React, { useState } from 'react';
import { Button, Dialog, InputGroup, FormGroup, TextArea } from "@blueprintjs/core";
// import '../../styles/CalendarDayModal.scss';

const CalendarDayModal = ({ day, onSave, onClose }) => {
    const [mood, setMood] = useState('');
    const [gifURL, setGifURL] = useState('');
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        if (mood && gifURL) { // Ensure mood and GIF URL are provided
            onSave(mood, gifURL, notes);
            onClose();
        } else {
            alert("Please fill in the mood and GIF URL.");
        }
    };

    return (
        <Dialog
            isOpen={true}
            onClose={onClose}
            title={`Add Entry for ${day.format('MMMM Do, YYYY')}`}
        >
            <div className="bp5-dialog-body">
                <FormGroup label="Mood">
                    <InputGroup
                        placeholder="e.g., Happy, Sad, Neutral"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="GIF URL">
                    <InputGroup
                        placeholder="Enter GIF URL or search on GIPHY"
                        value={gifURL}
                        onChange={(e) => setGifURL(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Notes">
                    <TextArea
                        placeholder="Additional notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        fill
                    />
                </FormGroup>
            </div>
            <div className="bp5-dialog-footer">
                <Button onClick={handleSave} intent="primary">Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </Dialog>
    );
};

export default CalendarDayModal;