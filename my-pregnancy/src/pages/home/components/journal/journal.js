import { useNavigate } from 'react-router-dom';

import styles from './journal.module.css';
import buttons from '../../../../css/buttons.module.css';
import boxes from '../../../../css/boxes.module.css';

function Journal({currentDay, nextCycle, weight, currentStage}){
  const navigate = useNavigate()

  return (
    <div className={boxes.standard}>
      <div className={styles.top}>
        <button className={buttons.stylisedBtn} onClick={() => navigate('/journalentry/new')}>Report Health Journal</button>
        <div onClick={() => navigate('/journal')}>
          <img src='/assets/calendar.png' alt='calendar icon'/>
        </div>
        
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          <h2>Next cycle <span>{nextCycle} days</span></h2>
          <h2>Weight <span>{weight} kg</span></h2>
          <h2>Current stage <span>{currentStage}</span></h2>
        </div>
      </div>
    </div>
  );
}


export default Journal;