// src/services/api.js
import axios from 'axios';

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
const apiUrl = 'https://api.giphy.com/v1/gifs';

export const fetchGifsByMood = async (mood) => {
    try {
        const response = await axios.get(`${apiUrl}/search`, {
            params: {
                api_key: apiKey,
                q: mood,
                limit: 65, // Increase desired
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return [];
    }
};
