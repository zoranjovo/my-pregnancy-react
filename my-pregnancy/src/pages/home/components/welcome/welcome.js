import styles from './welcome.module.css';
import { Link } from 'react-router-dom';

function Welcome({name}){

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.nameContainer}>
        <h1>Welcome {name}</h1>
        <h2>How are you today?</h2>
      </div>
      <Link className={styles.phoneContainer} to="/consultation">
        <div className={styles.phoneCircle}>
          <img src='/assets/phone.png' alt='phone icon'></img>
        </div>
        <h2>Book a <span>free</span> consultation</h2>
      </Link>
    </div>
  );
}


export default Welcome;