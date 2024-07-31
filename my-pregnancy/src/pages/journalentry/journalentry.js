import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './journalentry.module.css';
import buttons from '../../css/buttons.module.css'

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

const moods = [
  'Happy',
  'Fantastic',
  'Bored',
  'Excited',
  'Tired',
  'Angry',
  'Frustrated',
  'Sick',
  'Overwhelmed'
];

const selfCareActivities = [
  'Ate Breakfast',
  'Exercised',
  'Ate Lunch',
  'Talked with a Friend',
  'Ate Dinner',
  'Took a Break',
  'Slept 7-9 Hours'
];
  
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = format(date, 'do');
  const monthYear = format(date, 'MMM yyyy');
  return `${day} ${monthYear}`;
}

function JournalEntry(){
  const { id } = useParams();
  const [newEntry, setNewEntry] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [entry, setEntry] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(-1);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [customMood, setCustomMood] = useState('');
  const [selectedSelfCare, setSelectedSelfCare] = useState([]);
  const [customSelfCare, setCustomSelfCare] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [hoveredWaterIntake, setHoveredWaterIntake] = useState(0);
  const [dayRating, setDayRating] = useState(0);
  const [hoveredDayRating, setHoveredDayRating] = useState(0);
  const [gratitudesText, setGratitudesText] = useState('');
  const [onMyMindText, setOnMyMindText] = useState('');

  const navigate = useNavigate();


  // setup new or existing entry
  useEffect(() => {
    if (id === 'new') {
      setNewEntry(true);
    } else {
      const foundEntry = entries.find(entry => entry.id === id);
      if (!foundEntry) {
        setNotFound(true);
      } else {
        setSelectedEmoji(foundEntry.mood);
        setEntry(foundEntry);
        setSelectedMoods(foundEntry.selectedMoods);
        
        const customMood = foundEntry.selectedMoods.find(mood => !moods.includes(mood));
        if (customMood) {setCustomMood(customMood);}

        setSelectedSelfCare(foundEntry.selfCare || []);
        
        const customSelfCare = foundEntry.selfCare?.find(care => !selfCareActivities.includes(care));
        if (customSelfCare) {setCustomSelfCare(customSelfCare);}

        setWaterIntake(foundEntry.waterIntake || 0);
        setDayRating(foundEntry.dayRating || 0);
      }
    }
  }, [id]);


  // are you sure you want to leave without saving
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {window.removeEventListener('beforeunload', handleBeforeUnload);};
  }, []);


  // alow change emoji only if it is a new entry
  const changeEmoji = (num) => {
    if (newEntry) {
      setSelectedEmoji(num);
    }
  };


  // mood change logic
  const handleMoodChange = (mood) => {
    setSelectedMoods((prevSelectedMoods) => {
      if (prevSelectedMoods.includes(mood)) {
        return prevSelectedMoods.filter((m) => m !== mood);
      } else {
        return [...prevSelectedMoods, mood];
      }
    });
  }
  const handleCustomMoodChange = (event) => {setCustomMood(event.target.value);}
  const handleCustomMoodToggle = () => {
    const trimmedCustomMood = customMood.trim();
    if (trimmedCustomMood !== '') {
      setSelectedMoods((prevSelectedMoods) => {
        if (prevSelectedMoods.includes(trimmedCustomMood)) {
          return prevSelectedMoods.filter((m) => m !== trimmedCustomMood);
        } else {
          return [...prevSelectedMoods, trimmedCustomMood];
        }
      });
    }
  }

  // self care change logic
  const handleSelfCareChange = (activity) => {
    setSelectedSelfCare((prevSelectedSelfCare) => {
      if (prevSelectedSelfCare.includes(activity)) {
        return prevSelectedSelfCare.filter((a) => a !== activity);
      } else {
        return [...prevSelectedSelfCare, activity];
      }
    });
  };
  const handleCustomSelfCareChange = (event) => {setCustomSelfCare(event.target.value);}
  const handleCustomSelfCareToggle = () => {
    const trimmedCustomSelfCare = customSelfCare.trim();
    if (trimmedCustomSelfCare !== '') {
      setSelectedSelfCare((prevSelectedSelfCare) => {
        if (prevSelectedSelfCare.includes(trimmedCustomSelfCare)) {
          return prevSelectedSelfCare.filter((a) => a !== trimmedCustomSelfCare);
        } else {
          return [...prevSelectedSelfCare, trimmedCustomSelfCare];
        }
      });
    }
  };


  // handle water and day rating changes
  const handleWaterIntakeChange = (value) => {if(newEntry){setWaterIntake(value);}};
  const handleDayRatingChange = (value) => {if(newEntry){setDayRating(value);}};

  const handleMouseEnterWater = (index) => {if(newEntry){setHoveredWaterIntake(index + 1);}};
  const handleMouseLeaveWater = () => setHoveredWaterIntake(0);

  const handleMouseEnterDay = (index) => {if(newEntry){setHoveredDayRating(index + 1);}}
  const handleMouseLeaveDay = () => setHoveredDayRating(0);


  // handle saving
  const handleSave = () => {
    // TODO save logic - the alert messages will probably change

    if(selectedEmoji < 0){return alert('Please select an overall mood emoji')}
    if(waterIntake < 1){return alert('Please enter if you have drank enough water today')}
    if(dayRating < 1){return alert('Please rate your day plss')}

    alert("pretend it saved successfully");
    navigate('/journal');
  }

  
  return (
    <div className={styles.outerdiv}>
      <h1 className="text-2xl font-bold text-blue">
        Journal Entry
        {newEntry ? (
          <span className={styles.date}>New Entry</span>
        ) : (
          entry && <span className={styles.date}>{formatDate((entry.date*1000))}</span>
        )}
      </h1>
      <div className={styles.backBtn}>
        <Link to={`/journal`}>
          {newEntry ? (
            <h2>← Discard</h2>
          ) : (
            <h2>← Back to Journal</h2>
          )}
          
        </Link>
      </div>
      <div className={styles.innerdiv}>
        {notFound ? (
          <div>
            <h2>Journal entry ID {id} not found.</h2>
            <Link to={`/journal`} className={styles.backBtnNotFound}>
              <h2>← Back to Journal</h2>
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            <div className={styles.col}>
              <div className={`${styles.section} ${styles.feelingDiv}`}>
                <div className={`${buttons.stylisedTitle} ${styles.sectionTitle}`}>
                  <h2>Feeling:</h2>
                  <div className={styles.feelingEmojiDiv}>
                    <span className={selectedEmoji === 0 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(0)}>🤩</span>
                    <span className={selectedEmoji === 1 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(1)}>😀</span>
                    <span className={selectedEmoji === 2 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(2)}>😯</span>
                    <span className={selectedEmoji === 3 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(3)}>😢</span>
                    <span className={selectedEmoji === 4 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(4)}>😡</span>
                  </div>
                </div>
                <div>
                  {moods.map((mood, index) => (
                    <div key={index} className={styles.moodItem}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectedMoods.includes(mood)}
                        onChange={() => handleMoodChange(mood)}
                        disabled={!newEntry}
                      />
                      <span>{mood}</span>
                    </div>
                  ))}
                  <div className={styles.customMood}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedMoods.includes(customMood.trim())}
                      onChange={handleCustomMoodToggle}
                      disabled={!newEntry}
                    />
                    <input
                      type="text"
                      placeholder="Add custom mood"
                      value={customMood}
                      onChange={handleCustomMoodChange}
                      disabled={!newEntry}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.col}>
              <div className={`${styles.section} ${styles.gratitudesDiv}`}>
                <div className={`${buttons.stylisedTitle} ${styles.sectionTitle}`}>
                  <h2>Gratitudes:</h2>
                  <h3>What moment, person or thing are you grateful for today?</h3>
                </div>
                {newEntry ? (
                  <textarea 
                    placeholder='Enter text here'
                    onChange={(e) => setGratitudesText(e.target.value)}
                    value={gratitudesText}
                  ></textarea>
                ) : (
                  entry && <textarea placeholder='Enter text here' readOnly value={entry.gratitude}></textarea>
                )}
              </div>
              <div className={`${styles.section} ${styles.onMyMindDiv}`}>
                <div className={`${buttons.stylisedTitle} ${styles.sectionTitle}`}>
                  <h2>On My Mind:</h2>
                  <h3>What thoughts have been stuck on my mind?</h3>
                </div>
                {newEntry ? (
                  <textarea 
                    placeholder='Enter text here'
                    onChange={(e) => setOnMyMindText(e.target.value)}
                    value={onMyMindText}
                  ></textarea>
                ) : (
                  entry && <textarea placeholder='Enter text here' readOnly value={entry.onMyMind}></textarea>
                )}
              </div>
            </div>

            <div className={styles.col}>
              <div className={`${styles.section} ${styles.selfCareDiv}`}>
                <div className={`${buttons.stylisedTitle} ${styles.sectionTitle}`}>
                  <h2>Self-Care:</h2>
                  <h3>How did I take care of my body and mind today?</h3>
                </div>
                <div className={styles.selfCareGrid}>
                  {selfCareActivities.map((activity, index) => (
                    <div key={index} className={styles.selfCareItem}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectedSelfCare.includes(activity)}
                        onChange={() => handleSelfCareChange(activity)}
                        disabled={!newEntry}
                      />
                      <span>{activity}</span>
                    </div>
                  ))}
                  <div className={styles.customSelfCare}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedSelfCare.includes(customSelfCare.trim())}
                      onChange={handleCustomSelfCareToggle}
                      disabled={!newEntry}
                    />
                    <input
                      type="text"
                      placeholder="Add custom activity"
                      value={customSelfCare}
                      onChange={handleCustomSelfCareChange}
                      disabled={!newEntry}
                    />
                  </div>
                </div>

                <div className={styles.waterIntakeDiv}>
                  <h2>Did you drink enough water today?</h2>
                  <div className={styles.ratingContainer}>
                    {[...Array(10)].map((_, index) => (
                      <span
                        key={index}
                        className={`${styles.ratingItem} ${index < hoveredWaterIntake ? styles.hovered : ''} ${index < waterIntake ? styles.selected : ''}`}
                        onMouseEnter={() => handleMouseEnterWater(index)}
                        onMouseLeave={handleMouseLeaveWater}
                        onClick={() => handleWaterIntakeChange(index + 1)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={index < waterIntake ? "#1E90FF" : "none"} stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2C12 2 7 10 7 14C7 17.3137 9.68629 20 13 20C16.3137 20 19 17.3137 19 14C19 10 12 2 12 2Z" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.dayRatingDiv}>
                  <h2>Rate your day:</h2>
                  <div className={styles.ratingContainer}>
                    {[...Array(10)].map((_, index) => (
                      <span
                        key={index}
                        className={`${styles.ratingItem} ${index < hoveredDayRating ? styles.hovered : ''} ${index < dayRating ? styles.selected : ''}`}
                        onMouseEnter={() => handleMouseEnterDay(index)}
                        onMouseLeave={handleMouseLeaveDay}
                        onClick={() => handleDayRatingChange(index + 1)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={index < dayRating ? "#FFD700" : "none"} stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {newEntry && (
          <div className={styles.saveBtn}>
            <button className={buttons.stylisedBtn} onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalEntry;
