import { useEffect, useState } from 'react';
import { getAllFitnesVideos } from '../../util/apireq';
import { serverErrorNotif } from '../../global-components/notify';
import { Link } from 'react-router-dom';
import { dotWave } from "ldrs";

import styles from './fitnessarticle.module.css'

function FitnessArticle(param){
  dotWave.register();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchEntries() {
      const response = await getAllFitnesVideos();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setLoading(false);
        return setVideo(response.data.find(video => video.url === param.id));
      }
    }
    fetchEntries();
  });
  

  return (
    <div>
      <div className={styles.topinfo}>
        <Link to={`/fitness`}>
          <h3 className={styles.backBtn}>&#8592; All Videos</h3>
        </Link>
        {video && (
          <h1 className="text-3xl font-medium">{video.name}</h1>
        )}
      </div>
      <div className={styles.body}>
        { loading ? (
          <div className={styles.loadingContainer}>
            <l-dot-wave
              size="47"
              speed="1" 
              color="#f06292" 
              data-testid="loading-indicator">
            </l-dot-wave>
          </div>
        ) : (
          <div>
            {!video ? (
              <h3 className={styles.invalidID}>Invalid video ID</h3>
            ) : (
              <div className={styles.innerbody}>
                <h1 className="text-2xl font-medium">{video.name}</h1>
                <iframe 
                  className={styles.embed}
                  src={`https://www.youtube-nocookie.com/embed/${video.url}`}
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  rel="0"
                  referrerPolicy="strict-origin-when-cross-origin" >
                </iframe>
                <h3 className={styles.time}>{`${video.time} watch`}</h3>
                <h3 className={styles.desc}>{`${video.desc}`}</h3>
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default FitnessArticle;