import styles from './pregnantresources.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllResources } from '../../../../util/apireq';
import { serverErrorNotif } from '../../../../global-components/notify.js';

function RecommendedResources(){
  const [resources, setResources] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        return setResources(response.data);
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
            <Link key={i} to={`/resourcearticle/${r.link}`} className={styles.resourceLink} style={{background: `linear-gradient(to right, #F6A2B8 50%, rgba(246, 162, 184, 0) 80%), url('${r.bgIMG}') right center / cover no-repeat`}}>
              <div className={styles.imageContainer}>
                <img src={r.doctorIMG} alt="Dr. Vera" />
              </div>
              <div className={styles.contentContainer}>
                <h2>{r.title}</h2>
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