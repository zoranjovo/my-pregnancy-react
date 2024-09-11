import styles from './welcome.module.css';
import { Link } from 'react-router-dom';

function Welcome({user}){
  const isProfileIncomplete = !user.specialization || !user.yearsExperience || !user.aphraVerification;

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.nameContainer}>
        <h1>Welcome {user.firstname}</h1>
        {user.role === "pregnant" ? (
          <h2>How are you today?</h2>
        ) : user.role === "doctor" ? (
          <h2>Thank you for being a key contributor to this platform—your impact is truly valued!</h2>
        ) : (
          <></>
        )}
        {user.role === "doctor" && isProfileIncomplete && (
          <p className={styles.warningMessage}>Please <Link to="/account"><span className={styles.completeAccLink}>complete your account</span></Link> to appear in searches</p>
        )}
      </div>
      {user.role === "pregnant" && (
        <Link className={styles.phoneContainer} to="/consultation/book">
          <div className={styles.phoneCircle}>
            <img src='/assets/phone.png' alt='phone icon'></img>
          </div>
          <h2>Book a <span>free</span> consultation</h2>
        </Link>
      )}
      
    </div>
  );
}


export default Welcome;