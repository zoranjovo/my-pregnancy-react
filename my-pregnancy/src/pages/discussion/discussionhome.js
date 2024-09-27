import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import { dotWave } from 'ldrs';
import { getForumsInCategory } from '../../util/apireq';
import { formatPostDate } from '../../util/dates';

const validCategories = ["general", "info", "support"];
function mapCategoryName(category) {
  const categoryMap = {
    general: "General Discussion",
    info: "Information Sharing",
    support: "Support Groups",
  };
  return categoryMap[category] || "Unknown Category";
}

function DiscussionHome(){
  const { id } = useParams();

	dotWave.register();
  const [posts, setPosts] = useState(null);
  const [imagesURL, setImagesURL] = useState("");

  useEffect(() => {
    async function fetchEntries() {
      if(!validCategories.includes(id)){ return customWarningNotif("Invalid category"); }
      const response = await getForumsInCategory(id);
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setPosts(response.data.posts);
        setImagesURL(response.data.imagesURL);
        return;
      } else {
        customWarningNotif("Server Error");
      }
    }
    fetchEntries();
    // eslint-disable-next-line
  }, []);

  return (
	<div className={styles.outerdiv}>
		<h1 className="text-3xl font-bold text-blue">Welcome to the Forums</h1>
		<br/>
		<Link to="/forums">
			<h2 className="text-2xl text-blue underline inline">Boards</h2>
    </Link>
		<h2 className="text-2xl font-bold text-blue inline"> &gt;&gt; {mapCategoryName(id)}</h2>
		<br/>
		<br/>
		<div className={`${styles.boardName} ${buttons.stylisedTitle}`}>
			<h2 className="inline float-left">Posts</h2>
			<h2 className="inline float-right mr-12">Sort:   
				<div className={styles.top}>Top</div>
				<div className={styles.new}>New</div>
			</h2>
		</div>
		<br/>
		<br/>
    {!posts ? (
      <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
        <l-dot-wave
          size="47"
          speed="1" 
          color="#f06292" 
          data-testid="loading-indicator">
        </l-dot-wave>
      </div>
    ) : (
      posts.map((post, index) => (
        <div className={styles.boardContainer2} key={post._id}>
          <div className={styles.boardPost}>
            <h2><Link to={`/post/${post.id}`} key={index}>{post.title}</Link></h2>
            <p>{post.post}</p>
          </div>
          <Link to={`/post/${post.id}`} key={index}>
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
            <div className={styles.postName}><h2>{post.user.fullname}</h2><p>{formatPostDate(post.date)}</p></div>
            <div className={styles.postView}>{post.views} views</div>
            <div className={styles.postReplies}>{post.replies} replies</div>
          </div>
        </div>
      ))
    )}
		
	</div>
  );
}

export default DiscussionHome;

