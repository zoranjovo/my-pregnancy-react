import styles from './forumhome.module.css';
import { formatPostDate } from '../../util/dates';


function ProfileView({post, imagesURL}){

  return (
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
  );
}

export default ProfileView;
