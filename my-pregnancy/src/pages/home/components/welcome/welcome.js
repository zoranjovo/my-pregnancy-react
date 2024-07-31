import styles from './welcome.module.css';

function Welcome({name}){

  const bookConsultation = () => {
    console.log('booking consultation');
  }

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.nameContainer}>
        <h1>Welcome {name}</h1>
        <h2>How are you today?</h2>
      </div>
      <div className={styles.phoneContainer} onClick={bookConsultation}>
        <div className={styles.phoneCircle}>
          <img src='/assets/phone.png' alt='phone icon'></img>
        </div>
        <h2>Book a <span>free</span> consultation</h2>
      </div>
    </div>
  );
}


export default Welcome;