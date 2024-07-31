import styles from './forums.module.css';

function Forums({name}){


  return (
    <div className={styles.forumsDiv}>
      <h1>Top Forums</h1>
      <div className={styles.forumEntry}>
        <h1>My experience in last 2 months</h1>
      </div>
    </div>
  );
}


export default Forums;