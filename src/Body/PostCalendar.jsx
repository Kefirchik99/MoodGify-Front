import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.scss';
import MoodList from './MoodList';
import PostFrequencyChart from './PostFrequencyChart';
import ProgressBarWithLabel from './ProgressBarWithLabel';

const postData = [
  { date: new Date(2024, 10, 5), content: 'Post 1' }, 
  { date: new Date(2024, 10, 12), content: 'Post 2' }, 
  { date: new Date(2024, 10, 15), content: 'Post 3' }, 
  { date: new Date(2024, 10, 20), content: 'Post 4' }, 
  { date: new Date(2024, 10, 25), content: 'Post 5' }, 
];

const dayData = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 4 },
  { day: 'Thu', count: 6 },
  { day: 'Fri', count: 7 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 1 }, ];

const progressData = [
  { label: 'Mood 1', value: 70, maxValue: 100 },
  { label: 'Mood 2', value: 45, maxValue: 100 },
  { label: 'Mood 3', value: 90, maxValue: 100 },
];

const PostCalendar = () => {
  const [date, setDate] = useState(new Date());
  

  const hasPostsOnDate = (date) => {
    return postData.some(post => 
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };


  const onChange = newDate => {
    setDate(newDate);
  };


  const tileClassName = ({ date, view }) => {
    if (view === 'month' && hasPostsOnDate(date)) {
      return 'has-posts';
    }
    return '';
  };

  return (
    <>
    <div class="container">
      <div class="component">
        <div className="calendar-container">
        <h2>Moods calendar</h2>
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={tileClassName}
          locale="en-EN"
        />
      </div>
      </div>
      <div class="component">
        <MoodList />
      </div>
    </div>

    <div class="container">
      <div class="component">
      <PostFrequencyChart data={dayData} />
      </div>
      <div class="component">
      <div className="App" style={{ padding: '20px' }}>
      {progressData.map((data, index) => (
        <ProgressBarWithLabel
          key={index}
          label={data.label}
          value={data.value}
          maxValue={data.maxValue}
        />
      ))}
    </div>
      </div>
    </div>
    
    </>
  );
};

export default PostCalendar;
