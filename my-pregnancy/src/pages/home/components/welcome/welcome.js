import styles from './welcome.module.css';
import { Link } from 'react-router-dom';

function Welcome({user}){
  const isProfileIncomplete = !user.specialization || !user.yearsExperience || !user.aphraVerification;

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.nameContainer}>
        <h1>Welcome {user.firstname}</h1>
        <h2>How are you today?</h2>
        {isProfileIncomplete && (
          <p className={styles.warningMessage}>Please <Link to="/account"><span className={styles.completeAccLink}>complete your account</span></Link> to appear in searches</p>
        )}
      </div>
      <Link className={styles.phoneContainer} to="/consultation/book">
        <div className={styles.phoneCircle}>
          <img src='/assets/phone.png' alt='phone icon'></img>
        </div>
        <h2>Book a <span>free</span> consultation</h2>
      </Link>
    </div>
  );
}


export default Welcome;