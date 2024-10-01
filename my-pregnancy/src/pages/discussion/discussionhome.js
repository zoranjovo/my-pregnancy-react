import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import { dotWave } from 'ldrs';
import { getForumsInCategory } from '../../util/apireq';
import ProfileView from '../forums/profileView.js';
import NewPostPane from './NewPostPane.js';

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
  const [sort, setSort] = useState("new");
  const [newPostPaneVisible, setNewPostPaneVisible] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      if(!validCategories.includes(id)){ return customWarningNotif("Invalid category"); }
      const response = await getForumsInCategory(id);
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setPosts(response.data.posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setImagesURL(response.data.imagesURL);
        return;
      } else {
        customWarningNotif("Server Error");
      }
    }
    fetchEntries();
  }, [id]);

  const handleSortNew = () => {
    setSort("new");
    setPosts(prevPosts => [...prevPosts].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleSortTop = () => {
    setSort("top");
    setPosts(prevPosts => [...prevPosts].sort((a, b) => b.views - a.views));
  };

  return (
	  <div className={styles.outerdiv}>
      <h1 className="text-3xl font-bold text-blue">Welcome to the Forums</h1>
      <br/>
      <div className={styles.nav}>
        <Link to="/forums">
          <h2 className="text-2xl text-blue underline inline">Boards</h2>
        </Link>
        <h2 className="text-2xl font-bold text-blue inline"> &gt;&gt; {mapCategoryName(id)}</h2>
      </div>

      <div className={styles.newPostBtnContainer}>
        <button className={buttons.stylisedBtn} onClick={() => setNewPostPaneVisible(true)}>New Post</button>
      </div>
      
      <div className={`${styles.boardName} ${buttons.stylisedTitle}`}>
        <h2 className="inline float-left">Posts</h2>
        <h2 className="inline float-right mr-12">Sort:   
          <div 
            className={`${styles.top} ${sort === "top" ? styles.activeSort : ""}`} 
            onClick={handleSortTop}>
            Top
          </div>
          <div 
            className={`${styles.new} ${sort === "new" ? styles.activeSort : ""}`} 
            onClick={handleSortNew}>
            New
          </div>
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
              <h2 className={styles.postTitle}><Link to={`/post/${post._id}`} key={index}>{post.title}</Link></h2>
              <p>{post.post}</p>
            </div>
            <Link to={`/post/${post._id}`} key={index}>
              <button className={styles.readMore}>Read More</button>
            </Link>
            <div className={styles.smallLine}></div>
            <ProfileView post={post} imagesURL={imagesURL}/>
          </div>
        ))
      )}

      <NewPostPane visible={newPostPaneVisible} setVisible={setNewPostPaneVisible} id={id}/>

	  </div>
  );
}

export default DiscussionHome;

