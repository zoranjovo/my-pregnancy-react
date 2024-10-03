import { useState, useEffect } from 'react';
import styles from './forumhome.module.css';
import { getForumsHome } from '../../util/apireq';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import ForumHomeCategory from './forumhomecategory.js';
import { dotWave } from 'ldrs';

function ForumHome(){
  dotWave.register();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      const response = await getForumsHome();
      console.log(response)
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        return setPosts(response.data);
      } else {
		    return customWarningNotif("Server Error");
      }
    }
    fetchEntries();
  }, []);


  return (
    <div className={styles.outerdiv}>
      <h1 className="text-3xl font-bold text-blue">Welcome to the Forums</h1>
      <br />
      <h2 className="text-2xl font-bold text-blue">Boards</h2>
      <br />
      {!posts ? (
        <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
          <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"/>
        </div>
      ) : (
        <div>
          {posts.general && (
            <div>
              <ForumHomeCategory post={posts.general} name={"General Discussion"} link={"general"} imagesURL={posts.imagesURL}/>
              <br/>
              <br/>
              <div className={styles.bigLine}></div>
              <br/>
            </div>
          )}

          {posts.info && (
            <div>
              <ForumHomeCategory post={posts.info} name={"Information Sharing"} link={"info"} imagesURL={posts.imagesURL}/>
              <br/>
              <br/>
              <div className={styles.bigLine}></div>
              <br/>
            </div>
          )}

          <ForumHomeCategory post={posts.support} name={"Support Groups"} link={"support"} imagesURL={posts.imagesURL}/>  
          
          
          
        </div> 
      )}
    <br/>
    <br/>
	</div>
  );
}

export default ForumHome;
