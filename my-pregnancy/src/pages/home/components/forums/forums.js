import { useState, useEffect } from 'react';
import { getForumsHome } from '../../../../util/apireq';
import { serverErrorNotif, customWarningNotif } from '../../../../global-components/notify';
import styles from './forums.module.css';
import boxes from '../../../../css/boxes.module.css';
import { Link } from 'react-router-dom';
import { dotWave } from 'ldrs';

function Forums(){
  dotWave.register();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      const response = await getForumsHome();
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
    <div className={boxes.standard}>
      {!posts ? (
        <div className={`flex items-center justify-center`} style={{marginTop: "100px", width: "300px"}}>
          <l-dot-wave
            size="47"
            speed="1" 
            color="#f06292" 
            data-testid="loading-indicator">
          </l-dot-wave>
        </div>
      ) : (
        <div>
          <h1>Top Forums</h1>
          <Link to={`/post/${posts.general._id}`}>
            <div className={styles.forumEntry}>
              <h1>{posts.general.title}</h1>
            </div>
          </Link>
          <Link to={`/post/${posts.info._id}`}>
            <div className={styles.forumEntry}>
              <h1>{posts.info.title}</h1>
            </div>
          </Link>
          <Link to={`/post/${posts.support._id}`}>
            <div className={styles.forumEntry}>
              <h1>{posts.support.title}</h1>
            </div>
          </Link>
        </div>
      )}
      
    </div>
  );
}


export default Forums;