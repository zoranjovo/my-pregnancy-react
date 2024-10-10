import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFitnesVideos } from '../../../../util/apireq.js';
import FitnessVideo from '../../../fitness/fitnessvideo.js';
import { serverErrorNotif, customWarningNotif } from '../../../../global-components/notify.js';

import styles from './recommended.module.css';


function RecommendedVideos(){
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllFitnesVideos();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        return setVideos(response.data.slice(0, 6));
      } else {
        return customWarningNotif("Error");
      }
    }
    fetchEntries();
  }, []);

  return (
    <div className={styles.recommendedDiv}>
      <div className={styles.videos}>
        <div className={styles.videosHeader}>
          <h1>Fitness videos recommended for you</h1>
          <Link to={`/fitness`}>
            <h1 style={{fontWeight: '700'}}>View More</h1>
          </Link>
        </div>
        
        <div className={styles.videosDiv}>
          {videos && videos.map((v, i) => (
            <div key={i}>
              <Link to={`/fitnessarticle/${v.url}`}>
                <FitnessVideo name={v.name} desc={v.desc} url={v.url} time={v.time} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default RecommendedVideos;