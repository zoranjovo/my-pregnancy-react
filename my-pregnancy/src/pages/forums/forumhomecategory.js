import { Link } from 'react-router-dom';
import styles from './forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import { formatPostDate } from '../../util/dates';


function ForumHomeCategory({post, name, link, imagesURL}){

  console.log(post.authorID)
  console.log(post.user.pfpExists)

  return (
    <div className={styles.boardContainer1}>
      <Link to={`/discussion/${link}`}>
        <div className={`${styles.boardName} ${buttons.stylisedTitle}`}>
          <h2>{`${name} >`}</h2>
        </div>
      </Link>

      <div className={styles.boardPost}>
        Most Recent Post:
        <h2><Link to="/post/0">{post.title}</Link></h2>
        <p>{post.post}</p>
      </div>

      <Link to="/post/0">
        <button className={styles.readMore}>Read More</button>
      </Link>

        <div className={styles.smallLine}></div>
        <div className={styles.postInfo}>
          <div className={styles.imgContainer}>
            {post.user.pfpExists ? (
              <img 
                src={`${imagesURL}${post.authorID}?t=${Math.floor(Date.now() / 30000)}`}
                alt="Profile" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/blank-profile-picture.webp';
                }}
              />
            ) : (
              <img src={'/assets/blank-profile-picture.webp'} alt="ProfileNoPic"/>
            )}
          </div>
          <div className={styles.postName}>
            <h2>{post.user.fullname}</h2>
            <p>{formatPostDate(post.date)}</p>
          </div>
          <div className={styles.viewsAndReplies}>
            <p className={styles.postView}>{post.views} views</p>
            <p className={styles.postReplies}>{post.replies} replies</p>
          </div>
         
        </div>
        </div>
  );
}

export default ForumHomeCategory;
