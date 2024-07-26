import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './journal.module.css';
import buttons from '../../css/buttons.module.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { format } from 'date-fns';

// Sample entries with Unix timestamps
const entries = [
  { id: "0", date: 1721509484, gratitude: "Went for a morning walk and enjoyed the fresh air", onMyMind: "Thinking about if it will be a boy or a girl", mood: 1, selectedMoods: ['Happy', 'Bored', 'Hungry'], selfCare: ['Ate Breakfast', 'Exercised', 'Talked with a Friend', 'sharted'], waterIntake: 4, dayRating: 8 },
  { id: "1", date: 1721548715, gratitude: "Had a productive workday and finished an important project", onMyMind: "Need to prepare for the meeting tomorrow", mood: 3, selectedMoods: ['Excited'], selfCare: ['Ate Lunch', 'Took a Break'] },
  { id: "2", date: 1721547154, gratitude: "Watched a movie with friends in the evening", onMyMind: "The movie's plot twist was mind-blowing", mood: 4, selectedMoods: ['Fantastic'], selfCare: ['Ate Dinner', 'Talked with a Friend'], waterIntake: 6, dayRating: 7 },
  { id: "4", date: 1721718093, gratitude: "Took a yoga class and felt very relaxed afterwards", onMyMind: "I should do yoga more often", mood: 4, selectedMoods: ['Relaxed'], selfCare: ['Exercised', 'Took a Break'], waterIntake: 7, dayRating: 8 },
  { id: "5", date: 1721702902, gratitude: "Read a new book and learned a lot", onMyMind: "Can't wait to share the book's ideas with my friends", mood: 3, selectedMoods: ['Curious'], selfCare: ['Ate Lunch', 'Slept 7-9 Hours'], waterIntake: 5, dayRating: 7 },
  { id: "6", date: 1721853703, gratitude: "Went hiking in the mountains, the view was amazing", onMyMind: "Nature is truly breathtaking", mood: 4, selectedMoods: ['Happy'], selfCare: ['Exercised', 'Took a Break'], waterIntake: 8, dayRating: 9 },
  { id: "9", date: 1721992605, gratitude: "Attended a cooking class and made delicious dishes", onMyMind: "Excited to try the recipes at home", mood: 4, selectedMoods: ['Excited'], selfCare: ['Ate Dinner', 'Talked with a Friend'], waterIntake: 6, dayRating: 8 },
  { id: "10", date: 1721982839, gratitude: "Went to a concert in the evening, it was fantastic", onMyMind: "The band was incredible", mood: 4, selectedMoods: ['Happy', 'Excited'], selfCare: ['Ate Dinner', 'Took a Break'], waterIntake: 5, dayRating: 9 },
  { id: "11", date: 1722110094, gratitude: "Spent the day cleaning and organizing the house", onMyMind: "Feeling productive and satisfied", mood: 2, selectedMoods: ['Tired', 'Satisfied'], selfCare: ['Ate Lunch', 'Took a Break'], waterIntake: 7, dayRating: 6 },
  { id: "12", date: 1722204760, gratitude: "Went to the beach and enjoyed the sun and sea", onMyMind: "The ocean is so calming", mood: 4, selectedMoods: ['Relaxed', 'Happy'], selfCare: ['Exercised', 'Took a Break'], waterIntake: 8, dayRating: 9 },
  { id: "13", date: 1722207204, gratitude: "Had dinner with old friends, it was great to catch up", onMyMind: "Friendship is priceless", mood: 4, selectedMoods: ['Happy', 'Nostalgic'], selfCare: ['Ate Dinner', 'Talked with a Friend'], waterIntake: 6, dayRating: 8 },
  { id: "14", date: 1722290741, gratitude: "Fantastic exercise and workout, feeling very energetic", onMyMind: "Proud of my progress", mood: 0, selectedMoods: ['Energetic'], selfCare: ['Exercised', 'Took a Break'], waterIntake: 9, dayRating: 10 },
  { id: "15", date: 1722325320, gratitude: "Visited the museum and saw some impressive art", onMyMind: "Inspired by the creativity", mood: 3, selectedMoods: ['Inspired'], selfCare: ['Ate Lunch', 'Took a Break'], waterIntake: 6, dayRating: 7 },
  { id: "16", date: 1722419949, gratitude: "Good yoga class today, feeling very relaxed", onMyMind: "Yoga is great for mental clarity", mood: 1, selectedMoods: ['Relaxed'], selfCare: ['Exercised', 'Took a Break'], waterIntake: 7, dayRating: 8 },
  { id: "18", date: 1722613994, gratitude: "Went hiking in the mountains, felt great", onMyMind: "I love the outdoors", mood: 3, selectedMoods: ['Happy'], selfCare: ['Exercised', 'Talked with a Friend'], waterIntake: 8, dayRating: 9 },
  { id: "19", date: 1722714482, gratitude: "Read a fascinating book, learned a lot", onMyMind: "Books are a window to the world", mood: 4, selectedMoods: ['Curious', 'Happy'], selfCare: ['Ate Dinner', 'Slept 7-9 Hours'], waterIntake: 5, dayRating: 7 },
  { id: "20", date: 1722801200, gratitude: "Had a relaxing day at the spa, very refreshing", onMyMind: "Need to do this more often", mood: 4, selectedMoods: ['Relaxed', 'Happy'], selfCare: ['Took a Break', 'Slept 7-9 Hours'], waterIntake: 6, dayRating: 9 },
  { id: "23", date: 1722931878, gratitude: "Visited a new city, explored different attractions", onMyMind: "Travel broadens the mind", mood: 3, selectedMoods: ['Excited', 'Curious'], selfCare: ['Ate Breakfast', 'Took a Break'], waterIntake: 7, dayRating: 8 },
  { id: "24", date: 1723040883, gratitude: "Tried a new recipe and it turned out great", onMyMind: "Cooking can be so rewarding", mood: 4, selectedMoods: ['Happy'], selfCare: ['Ate Dinner', 'Talked with a Friend'], waterIntake: 6, dayRating: 8 },
  { id: "26", date: 1723210834, gratitude: "Went to the gym, had a good workout session", onMyMind: "Feeling strong and healthy", mood: 0, selectedMoods: ['Energetic'], selfCare: ['Exercised', 'Slept 7-9 Hours'], waterIntake: 9, dayRating: 10 },
  { id: "27", date: 1723315504, gratitude: "Spent the day at the library reading various books", onMyMind: "Libraries are a treasure trove of knowledge", mood: 2, selectedMoods: ['Curious', 'Content'], selfCare: ['Ate Lunch', 'Took a Break'], waterIntake: 6, dayRating: 7 },
];


// Function to convert Unix timestamp to 'yyyy-MM-dd' format
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'yyyy-MM-dd');
}

// Function to convert Unix timestamp to time format
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'h:mma').toLowerCase();
}

const moodMapping = {
  0: ':D',
  1: ':)',
  2: ':/',
  3: ':(',
  4: '>:(',
};

const parseMood = (value) => moodMapping[value] || ':)';

function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Add dot for marked dates
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      if (entries.map(e => formatDate(e.date)).includes(formattedDate)) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };

  const selectedEntries = entries
    .filter(entry => formatDate(entry.date) === format(selectedDate, 'yyyy-MM-dd'))
    .sort((a, b) => a.date - b.date);

  return (
    <div className={styles.outerdiv}>
      <h1 className="text-3xl font-medium text-blue">My Health Journal</h1>
      <div className={styles.innerdiv}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
        <div className={styles.entriesContainer}>
          <div className={styles.entriesTitle}>
            <h2>Entries</h2>
          </div>
          <div className={styles.entriesListContainer}>
            {selectedEntries.length === 0 ? (
              <h2>No entries found for selected date.</h2>
            ) : (
              selectedEntries.map((entry, index) => (
                <Link to={`/journalentry/${entry.id}`} key={index} className={styles.entry}>
                  <p className={styles.entryDesc}>{formatTime(entry.date)} - {entry.gratitude}</p>
                  <p className={styles.entryMood}>Mood {parseMood(entry.mood)}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={styles.addBtnContainer}>
        <Link to={`/journalentry/new`}>
          <button className={`${buttons.stylisedBtn} ${styles.addBtn}`}>+ Add Journal Entry</button>
        </Link>
        
      </div>
      
    </div>
  );
}

export default Journal;
