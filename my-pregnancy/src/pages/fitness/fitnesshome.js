import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FitnessVideo from './fitnessvideo.js';
import styles from './fitnesshome.module.css';
import { getAllFitnesVideos } from '../../util/apireq';
import { serverErrorNotif } from '../../global-components/notify.js';

function FitnessHome(){
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllFitnesVideos();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setVideos(response.data)
        return;
      } else if(response.status === 404){

      } else if(response.status === 500){

      }
    }
    fetchEntries();
  }, []);

  const isVideoVisible = (video) => {
    return video.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || video.desc.toLowerCase().includes(searchTerm.toLowerCase().trim());
  };
  const visibleVideos = videos.filter(isVideoVisible);

  
  return (
    <div className={styles.outerdiv}>
      <h1 className="text-3xl font-bold text-blue">Fitness Videos and Webinars</h1>
      <div className={styles.innerdiv}>
        <input 
          className={`${styles.searchbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}>
        </input>
        
        <div className={styles.videosdiv}>
          {visibleVideos.length === 0 && (
            <h1 className={styles.nonefound}>No videos found</h1>
          )}
          {videos.map((v, i) => (
            <div key={i} className={!isVideoVisible(v) ? styles.hidden : ''}>
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

export default FitnessHome;
