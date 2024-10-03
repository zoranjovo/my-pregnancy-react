import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './journal.module.css';
import buttons from '../../../../css/buttons.module.css';
import boxes from '../../../../css/boxes.module.css';
import { useEffect } from 'react';

function Journal({conceptionDate, weight}){

  const [nextCycle, setNextCycle] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!conceptionDate) {
      setNextCycle("Unknown");
      setCurrentStage("Unknown");
      return;
    }

    // Conception date is passed in, let's calculate based on that
    const conception = new Date(conceptionDate); // Convert to date object
    const now = new Date(); // Get current date

    // Calculate days since conception
    const diffInMs = now - conception;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Calculate the next cycle based on a 28-day cycle from conception (you can adjust this)
    const cycleLength = 28; // Standard cycle length in days (for pregnancy, this might not apply)
    const daysUntilNextCycle = cycleLength - (diffInDays % cycleLength);
    setNextCycle(daysUntilNextCycle);

    // Calculate the pregnancy stage (assuming 40 weeks of pregnancy)
    const weeksSinceConception = Math.floor(diffInDays / 7);
    
    if (weeksSinceConception <= 13) {
      setCurrentStage("First Trimester");
    } else if (weeksSinceConception <= 26) {
      setCurrentStage("Second Trimester");
    } else if (weeksSinceConception <= 40) {
      setCurrentStage("Third Trimester");
    } else {
      setCurrentStage("Postpartum");
    }

  }, [conceptionDate]);

  return (
    <div className={`${boxes.standard} ${styles.box}`}>
      <div className={styles.top}>
        <button className={buttons.stylisedBtn} onClick={() => navigate('/journalentry/new')}>Report Health Journal</button>
        <div onClick={() => navigate('/journal')}>
          <img src='/assets/calendar.png' alt='calendar icon'/>
        </div>
        
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          {nextCycle ? (
            <h2>Next cycle <span>in {nextCycle} {nextCycle === 1 ? "day" : "days"}</span></h2>
          ) : (
            <h2>Next cycle <span>Unknown</span></h2>
          )}
          {weight ? (
            <h2>Weight <span>{weight} kg</span></h2>
          ) : (
            <h2>Weight <span>Unknown</span></h2>
          )}
          {currentStage ? (
            <h2>Current stage <span>{currentStage}</span></h2>
          ) : (
            <h2>Current stage <span>Unknown</span></h2>
          )}
          
        </div>
      </div>
    </div>
  );
}


export default Journal;