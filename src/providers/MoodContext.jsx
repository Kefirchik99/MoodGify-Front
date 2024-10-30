
import React, { createContext, useState } from 'react';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
    const [calendarData, setCalendarData] = useState({});

    const addGifToDate = (date, gif, comment = '') => {
        setCalendarData((prevData) => ({
            ...prevData,
            [date]: {
                gifs: [...(prevData[date]?.gifs || []), gif],
                comment: comment || prevData[date]?.comment || '',
            }
        }));
    };

    const getMoodStats = (period) => {
        return {}; // Implement as needed
    };

    return (
        <MoodContext.Provider value={{ calendarData, addGifToDate, getMoodStats }}>
            {children}
        </MoodContext.Provider>
    );
};

export default MoodProvider;