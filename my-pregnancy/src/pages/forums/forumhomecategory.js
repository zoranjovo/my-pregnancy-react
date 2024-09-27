import { Link } from 'react-router-dom';
import styles from './forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import { formatPostDate } from '../../util/dates';
import ProfileView from './profileView.js';


function ForumHomeCategory({post, name, link, imagesURL}){

  return (
    <div className={styles.boardContainer1}>
      <Link to={`/discussion/${link}`}>
        <div className={`${styles.boardName} ${buttons.stylisedTitle}`}>
          <h2>{`${name} >`}</h2>
        </div>
      </Link>

      <div className={styles.boardPost}>
        Most Recent Post:
        <h2 className={styles.postTitle}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
        <p>{post.post}</p>
      </div>

      <Link to={`/post/${post._id}`}>
        <button className={styles.readMore}>Read More</button>
      </Link>

      <div className={styles.smallLine}></div>
        <ProfileView post={post} imagesURL={imagesURL}/>
      </div>
  );
}

export default ForumHomeCategory;
