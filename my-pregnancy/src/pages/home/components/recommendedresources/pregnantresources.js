import styles from './pregnantresources.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllResources } from '../../../../util/apireq';
import { serverErrorNotif } from '../../../../global-components/notify.js';

function RecommendedResources(){
  const [resources, setResources] = useState(null);
  const [imgsURL, setImgsURL] = useState("");

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setImgsURL(response.data.imagesURL);
        return setResources(response.data.resources);
      }
    }
    fetchEntries();
  }, []);

  return (
    <div className={styles.outerdiv}>
      <h1 style={{fontSize: '24px'}}>Resources recommended for you</h1>
      <div className={styles.resourcesDiv}>
      {!resources ? (
        <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave></div>
      ) : (
        resources.length === 0 ? (
          <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><p>No Resources Found</p></div>
        ) : (
          resources.map((r, i) => (
            <Link key={i} to={`/resourcearticle/${r.url}`} className={styles.resourceLink} style={{background: `linear-gradient(to right, #F6A2B8 50%, rgba(246, 162, 184, 0) 80%), url('${r.imgurl}') right center / cover no-repeat`}}>
              <div className={styles.imageContainer}>
                {!r.pfpExists ? (
                  <img src='/assets/blank-profile-picture.webp' alt='profile'></img>
                ) : (
                  <img
                    src={`${imgsURL}${r.author}?t=${new Date().getTime()}`}
                    alt="Profile" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/blank-profile-picture.webp';
                    }}
                  />
                )}
              </div>
              <div className={styles.contentContainer}>
                <h2>{r.name}</h2>
                <p>{r.desc}</p>
              </div>
            </Link>
          ))
        )
      )}
      </div>
    </div>
  );
}

export default RecommendedResources;