import { useState, useEffect } from 'react';
import styles from './recommended.module.css';
import buttons from '../../../../css/buttons.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserPostedVideos } from '../../../../util/apireq';
import { serverErrorNotif, customWarningNotif } from '../../../../global-components/notify';
import { Link } from 'react-router-dom';
import FitnessVideo from '../../../fitness/fitnessvideo';

function DoctorsVideos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await getUserPostedVideos();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setVideos(response.data);
      } else {
        return customWarningNotif("Error");
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className={styles.recommendedDiv}>
      <div className={styles.videosHeader}>
        <h1>Recommended videos by you</h1>
      </div>


      <div>
        {videos.length > 0 ? (
          <div>
            <div className={styles.videosDiv}>
              {videos.map((v, i) => (
                <div key={i}>
                  <Link to={`/fitnessarticle/${v.url}`}>
                    <FitnessVideo name={v.name} desc={v.desc} url={v.url} time={v.time} />
                  </Link>
                </div>
              ))}
            </div>
            <button style={{marginLeft: "20px", marginTop: "10px"}} className={buttons.stylisedBtn} onClick={() => navigate('/fitness/manage')}>Manage Videos</button>
          </div>
        ) : (
          <div style={{margin: "20px"}}>
            <p>No videos added yet</p>
            <button style={{marginTop: "10px"}} className={buttons.stylisedBtn} onClick={() => navigate('/fitness/manage')}>Add Video</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsVideos;
