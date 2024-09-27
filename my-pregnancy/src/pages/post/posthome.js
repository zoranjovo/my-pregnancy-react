import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import repliesStyle from './replies.module.css';
import { getPost } from '../../util/apireq';
import { dotWave } from 'ldrs';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import ProfileView from '../forums/profileView.js';

function mapCategoryName(category) {
  const categoryMap = {
    general: "General Discussion",
    info: "Information Sharing",
    support: "Support Groups",
  };
  return categoryMap[category] || "Unknown Category";
}


function PostPage(){
  const { id } = useParams();
	dotWave.register();

	const [post, setPost] = useState(null);
	const [replies, setReplies] = useState([]);
	const [imagesURL, setImagesURL] = useState("");

	useEffect(() => {
    async function fetchEntries() {
      const response = await getPost(id);
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setPost(response.data.post);
        setReplies(response.data.replies);
        console.log(response.data.replies)
        setImagesURL(response.data.imagesURL);
        return;
      } else {
        customWarningNotif("Server Error");
      }
    }
    fetchEntries();
  }, [id]);
  
  return (
    <div className={styles.outerdiv}>
		<h1 className="text-3xl font-bold text-blue">Welcome to the Forums</h1>
		<br />

		{!post ? (
      <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
        <l-dot-wave
          size="47"
          speed="1" 
          color="#f06292" 
          data-testid="loading-indicator">
        </l-dot-wave>
      </div>
    ) : (
			<div>
				<Link to="/forums">
					<h2 className="text-2xl text-blue underline inline">Boards</h2>
				</Link>
				<h2 className="text-2xl text-blue inline"> &gt;&gt; </h2>
				<Link to={`/discussion/${post.category}`}>
					<h2 className="text-2xl text-blue underline inline">{mapCategoryName(post.category)}</h2>
				</Link>
				<h2 className="text-2xl font-bold text-blue inline"> &gt;&gt; {post.title}</h2>
				<br/>
				<br/>
				<div className={styles.postContainer}>
          <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
          <p>{post.post}</p>
          <ProfileView post={post} imagesURL={imagesURL}/>
				</div>
        <div className={repliesStyle.container}>
          <div className={repliesStyle.headerItem}>
            <h2>Replies</h2>
            <button className={buttons.stylisedBtn}>Add Reply</button>
          </div>
          {replies.map((reply, index) => (
            <div className={repliesStyle.item} key={index}>
              
              <div className={repliesStyle.profile}>
                <div className={repliesStyle.imgContainer}>
                  {post.user.pfpExists ? (
                    <img 
                      src={`${imagesURL}${reply.userID}?t=${Math.floor(Date.now() / 30000)}`}
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
                <p>{reply.user.fullname}</p>
              </div>
              <p>{reply.message}</p>
              
            </div>
          ))}
        </div>
			</div>
		)}

	</div>
  );
}

export default PostPage;
