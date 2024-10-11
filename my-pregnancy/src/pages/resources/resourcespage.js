import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";
import styles from './resourcespage.module.css';
import { useEffect, useState } from 'react';
import { getAllResources, getUser } from '../../util/apireq';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify.js';
import { useNavigate } from "react-router-dom";
import buttons from '../../css/buttons.module.css';

const stages = ["1st Trimester", "2nd Trimester", "3rd Trimester"];

function ResourcesPage(){
  const navigate = useNavigate();
  const [resources, setResources] = useState(null);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [role, setRole] = useState("pregnant");
  const [imgsURL, setImgsURL] = useState("");


  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setResources(response.data.resources);
        setFilteredResources(response.data.resources);
        setImgsURL(response.data.imagesURL);
        return;
      }
    }
    fetchEntries();

    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setRole(response.data.role);
      } else {
        return customWarningNotif("Error");
      }
    }
    fetchUser();
  }, []);


  const handleStageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStage(selectedValue);

    if(selectedValue === ''){
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(resource => resource.stage === selectedValue);
      setFilteredResources(filtered);
    }
  };

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.outerdiv}>
          <h1 className="text-3xl font-bold text-blue">Resources</h1>
          <div className={styles.innerdiv}>
            {role === "doctor" && (
              <button className={buttons.stylisedBtn} style={{marginBottom: '10px', marginTop: '10px'}} onClick={() => navigate('/resources/manage')}>Manage Your Resources</button>
            )}
            <div className={styles.controls}>
              <select 
                value={selectedStage} 
                onChange={handleStageChange} 
                className={styles.dropdown}
              >
                <option value="">Stage</option>
                {stages.map((stage, index) => (
                  <option key={index} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.resourcesDiv}>
              {!resources ? (
                <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave></div>
              ) : (
                filteredResources.length === 0 ? (
                  <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><p>No Resources Found</p></div>
                ) : (
                  filteredResources.map((r, i) => (
                    <a key={i} href={`${r.url}`} className={styles.resourceLink} style={{background: `linear-gradient(to right, #F6A2B8 50%, rgba(246, 162, 184, 0) 80%), url('${r.imgurl}') right center / cover no-repeat`}}>
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
                      <button className={styles.readButton}>Read</button>
                    </a>
                  ))
                )
              )}
              {}
            </div>
          </div>
        </div>
        
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ResourcesPage;