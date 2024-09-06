import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './journalentry.module.css';
import buttons from '../../css/buttons.module.css'
import { createJournalEntry, getAllJournalEntries } from '../../util/apireq';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../global-components/notify';

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
      async function fetchEntries() {
        const response = await getAllJournalEntries();
        if(response.message === "Network Error"){ serverErrorNotif(); }
        if(response.status === 200){
          const foundEntry = response.data.find(entry => entry._id === id);
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
          return;
        } else if(response.status === 404){
  
        } else if(response.status === 500){
  
        }
      }
      fetchEntries();
      
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
  const changeEmoji = (num) => { if(newEntry){ setSelectedEmoji(num); } };


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
  const handleSave = async () => {
    if(selectedEmoji < 0){return customWarningNotif('Please select an overall mood emoji')}
    if(waterIntake < 1){return customWarningNotif('Please enter if you have drank enough water today')}
    if(dayRating < 1){return customWarningNotif('Please rate your day')}

    const response = await createJournalEntry(gratitudesText, onMyMindText, selectedMoods, selectedSelfCare, waterIntake, dayRating)
    if(response.status === 200){
      customSuccessNotif('Succesfully created entry');
      return navigate('/journal');
    }
    console.log(response);
  }

  
  return (
    <div className={styles.outerdiv}>
      <h1 className="text-2xl font-bold text-blue">
        Journal Entry
        {newEntry ? (
          <span className={styles.date}>New Entry</span>
        ) : (
          entry && <span className={styles.date}>{formatDate((entry.date))}</span>
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
                    <span className={selectedEmoji === 0 ? styles.selectedEmoji : ''} onClick={() => changeEmoji(0)} data-testid="emoji">🤩</span>
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
                        data-testid={`water-drop-${index}`}
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
                        data-testid={`day-star-${index}`}
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
