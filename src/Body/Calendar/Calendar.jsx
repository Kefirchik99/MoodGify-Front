import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useAuth } from '../../services/firebaseAuth';
import { addCalendarEntry, getCalendarEntries } from '../../services/firebaseHelper';
import CalendarDayModal from './CalendarDayModal';
import '../../styles/Calendar.scss';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entries, setEntries] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchEntries();
        }
    }, [user]);

    const fetchEntries = async () => {
        try {
            const userEntries = await getCalendarEntries(user.uid);
            const formattedEntries = {};
            userEntries.forEach(entry => {
                formattedEntries[entry.date] = entry;
            });
            setEntries(formattedEntries);
        } catch (error) {
            console.error("Error fetching entries:", error);
        }
    };

    const openModal = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    const handleSaveEntry = async (mood, gifUrl, notes) => {
        const entry = {
            date: selectedDate,
            mood,
            gifUrl,
            comment: notes,
            timestamp: moment().toISOString(),
        };

        try {
            await addCalendarEntry(user.uid, entry);
            setEntries((prev) => ({
                ...prev,
                [selectedDate]: entry,
            }));
            closeModal();
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };

    const daysInMonth = Array.from(
        { length: moment().daysInMonth() },
        (_, i) => moment().startOf('month').add(i, 'days')
    );

    return (
        <div className="calendar">
            <div className="calendar-grid">
                {daysInMonth.map((day) => {
                    const dayKey = day.format('YYYY-MM-DD');
                    return (
                        <div
                            key={dayKey}
                            className="calendar-cell"
                            onClick={() => openModal(dayKey)}
                        >
                            <div className="date-number">{day.format('D')}</div>
                            {entries[dayKey] && (
                                <img
                                    src={entries[dayKey].gifUrl}
                                    alt="Mood GIF"
                                    className="calendar-gif-preview"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <CalendarDayModal
                    day={moment(selectedDate)}
                    onClose={closeModal}
                    onSave={(mood, gifUrl, notes) => handleSaveEntry(mood, gifUrl, notes)}
                />
            )}
        </div>
    );
};

export default Calendar;
