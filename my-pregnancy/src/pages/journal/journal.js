import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './journal.module.css';
import buttons from '../../css/buttons.module.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { format } from 'date-fns';
import { getAllJournalEntries } from '../../util/apireq';


// Function to convert Unix timestamp to 'yyyy-MM-dd' format
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return format(date, 'yyyy-MM-dd');
}

// Function to convert Unix timestamp to time format
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
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
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllJournalEntries();
      console.log(response);
      if(response.status === 200){
        setEntries(response.data)
        return;
      } else if(response.status === 404){

      } else if(response.status === 500){

      }
    }
    fetchEntries();
  }, []);

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
      <h1 className="text-3xl font-bold text-blue">My Health Journal</h1>
      <div className={styles.innerdiv}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
        <div className={styles.entriesContainer}>
          <div className={`${styles.entriesTitle} ${buttons.stylisedTitle}`}>
            <h2>Entries</h2>
          </div>
          <div className={styles.entriesListContainer}>
            {selectedEntries.length === 0 ? (
              <h2>No entries found for selected date.</h2>
            ) : (
              selectedEntries.map((entry, index) => (
                <Link to={`/journalentry/${entry._id}`} key={index} className={styles.entry}>
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
