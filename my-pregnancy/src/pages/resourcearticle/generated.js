import { useEffect, useState } from 'react';
import { getAllResources } from '../../util/apireq';
import { serverErrorNotif } from '../../global-components/notify';
import { Link } from 'react-router-dom';
import { dotWave } from "ldrs";
import { useParams } from "react-router-dom";
import styles from './resourcearticle.module.css';
import boxes from '../../css/boxes.module.css';

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function ResourceGeneratedArticlePage(){
  const { id } = useParams();
  dotWave.register();
  const [resource, setResource] = useState(null);
  const [imgsURL, setImgsURL] = useState("");

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setImgsURL(response.data.imagesURL);
        console.log(response.data.resources)
        return setResource(response.data.resources.find(r => r.url === id));
      }
    }
    fetchEntries();
  }, []);

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.topinfo}>
          <Link to={`/resources`}>
            <h3 className={styles.backBtn}>&#8592; All Resources</h3>
          </Link>
        </div>
        <div className={styles.body}>
          {!resource ? (
            <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave></div>
          ) : (
            <div>
              {!resource ? (
                <h3 className={styles.invalidID}>Invalid Resource URL</h3>
              ) : (
                <div className={boxes.standard}>
                  <h1 className="text-3xl font-medium">{resource.name}</h1>
                  <div className={styles.imageContainer}>
                    {!resource.pfpExists ? (
                      <img src='/assets/blank-profile-picture.webp' alt='profile'></img>
                    ) : (
                      <img
                        src={`${imgsURL}${resource.author}?t=${new Date().getTime()}`}
                        alt="Profile" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/blank-profile-picture.webp';
                        }}
                      />
                    )}
                  </div>
                  <p>{resource.authorName}</p>
                  <div className={styles.contentContainer}>
                    <p>{resource.content}</p>
                    <img src={resource.imgurl}></img>
                  </div>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ResourceGeneratedArticlePage;