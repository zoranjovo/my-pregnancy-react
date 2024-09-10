import styles from './welcome.module.css';

function Welcome({name}){

  const bookConsultation = () => {
    console.log('booking consultation');
  }

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.nameContainer}>
        <h1>Welcome Dr. {name}</h1>
        <h2>Thank you for being a key contributor to this platform—your impact is truly valued!</h2>
      </div>
      <div className={styles.phoneContainer} onClick={bookConsultation}>
        <div className={styles.phoneCircle}>
          <img src='/assets/phone.png' alt='phone icon'></img>
        </div>
        <h2>Manage consultation</h2>
      </div>
    </div>
  );
}


export default Welcome;
