import React from "react";
import { Label } from "@blueprintjs/core";
import { FaSmile, FaFrown, FaMeh, FaLaugh } from "react-icons/fa";
import "../styles/MoodList.scss";

const moods = [
  { id: 1, moodName: "Happy", time: "10:00 AM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaSmile /> },
  { id: 2, moodName: "Sad", time: "12:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaFrown /> },
  { id: 3, moodName: "Neutral", time: "2:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaMeh /> },
  { id: 4, moodName: "Excited", time: "4:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaLaugh /> },
  { id: 5, moodName: "Happy", time: "10:00 AM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaSmile /> },
  { id: 6, moodName: "Sad", time: "12:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaFrown /> },
  { id: 7, moodName: "Neutral", time: "2:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaMeh /> },
  { id: 8, moodName: "Excited", time: "4:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaLaugh /> },
  { id: 9, moodName: "Happy", time: "10:00 AM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaSmile /> },
  { id: 10, moodName: "Sad", time: "12:00 PM", gif: "https://media.giphy.com/media/13ZBw9C14Ez58k/giphy.gif", icon: <FaFrown /> },
];

const MoodList = () => {
  return (
    <div className="mood-container">
      {moods.map((mood) => (
        <div key={mood.id} className="mood-item">
          <div className="mood-info">
            <div className="mood-icon">{mood.icon}</div>
            <div className="mood-details">
              <Label className="mood-name">{mood.moodName}</Label>
              
            </div>
            <div className="mood-time">{mood.time}</div>
          </div>
          <div className="mood-gif">
            <img src={mood.gif} alt={mood.moodName} />
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default MoodList;
