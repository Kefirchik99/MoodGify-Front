
import React from 'react';

import PostCalendar from './PostCalendar';
import MoodList from './MoodList';
import PostFrequencyChart from './PostFrequencyChart';
import ProgressBarWithLabel from './ProgressBarWithLabel';

const Calendar = () => {

    const postData = [
        { day: 'Понедельник', count: 5 },
        { day: 'Вторник', count: 3 },
        { day: 'Среда', count: 4 },
        { day: 'Четверг', count: 6 },
        { day: 'Пятница', count: 7 },
        { day: 'Суббота', count: 2 },
        { day: 'Воскресенье', count: 1 }, ];
    
      
      const progressData = [
        { label: 'Mood 1', value: 70, maxValue: 100 },
        { label: 'Mood 2', value: 45, maxValue: 100 },
        { label: 'Mood 3', value: 90, maxValue: 100 },
      ];
      
    return (
        <>
        <div>
            <h1>Calendar Page</h1>
            <p>This is where the calendar will be displayed.</p>
        </div>

        <PostCalendar />
        <MoodList />

        <PostFrequencyChart data={postData} />

        </>
    );
};

export default Calendar;
