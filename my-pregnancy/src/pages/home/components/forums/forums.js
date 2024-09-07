import styles from './forums.module.css';
import boxes from '../../../../css/boxes.module.css';

function Forums(){


  return (
    <div className={boxes.standard}>
      <h1>Top Forums</h1>
      <div className={styles.forumEntry}>
        <h1>My experience in last 2 months</h1>
      </div>
    </div>
  );
}


export default Forums;