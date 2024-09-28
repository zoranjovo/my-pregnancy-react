import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import repliesStyle from './replies.module.css';
import { getPost, addReply } from '../../util/apireq';
import { dotWave } from 'ldrs';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../global-components/notify';
import ProfileView from '../forums/profileView.js';
import { formatPostDate } from '../../util/dates.js'

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
  const [replyBox, setReplyBox] = useState("");
  const [lastSent, setLastSent] = useState("");

	useEffect(() => {
    console.log('fetching')
    fetchEntries();
    // eslint-disable-next-line
  }, [id]);

  async function fetchEntries() {
    const response = await getPost(id);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setPost(response.data.post);
      const sortedReplies = [...response.data.replies].sort((a, b) => new Date(b.date) - new Date(a.date));
      setReplies(sortedReplies);
      setImagesURL(response.data.imagesURL);
      return;
    } else {
      customWarningNotif("Server Error");
    }
  }


  const reply = async () => {
    if(replyBox === ""){ return customWarningNotif("Please enter a reply"); }
    if(replyBox === lastSent){ return customWarningNotif("Please do not spam"); }
    const response = await addReply(post._id, replyBox);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif("Added Reply");
      setLastSent(replyBox);
      fetchEntries();
      return;
    } else if(response.response.status === 400){
      return customWarningNotif(response.response.data.error);
    } else {
      return customWarningNotif("Server Error");
    }
  }
  
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
            <textarea
              type='text'
              className={repliesStyle.input}
              placeholder='Reply...'
              value={replyBox}
              onChange={e => setReplyBox(e.target.value)}
            ></textarea>
            <button
              className={buttons.stylisedBtn}
              onClick={reply}
            >Add Reply</button>
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
                    <img src={'/assets/blank-profile-picture.webp'} alt="ProfileNoPic" />
                  )}
                </div>
                <p>{reply.user.fullname}</p>
              </div>
              
              <div className={repliesStyle.messageContainer}>
                <p>{reply.message}</p>
                <div className={repliesStyle.dateContainer}>
                  <p>{formatPostDate(reply.date)}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
			</div>
		)}

	</div>
  );
}

export default PostPage;
