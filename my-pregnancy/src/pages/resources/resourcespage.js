import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";
import styles from './resourcespage.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllResources } from '../../util/apireq';
import { serverErrorNotif } from '../../global-components/notify.js';

const stages = ["1st Trimester", "2nd Trimester", "3rd Trimester"];

function ResourcesPage(){
  const [resources, setResources] = useState(null);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');

  useEffect(() => {
    async function fetchEntries() {
      const response = await getAllResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setResources(response.data);
        setFilteredResources(response.data);
        return;
      }
    }
    fetchEntries();
  }, []);


  const handleStageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStage(selectedValue);

    if(selectedValue === ''){
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(resource => resource.stageOfPregnancy === selectedValue);
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
              {/* Other controls go here */}
            </div>
            <div className={styles.resourcesDiv}>
              {!resources ? (
                <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave></div>
              ) : (
                filteredResources.length === 0 ? (
                  <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}><p>No Resources Found</p></div>
                ) : (
                  filteredResources.map((r, i) => (
                    <Link key={i} to={`/resourcearticle/${r.link}`} className={styles.resourceLink} style={{background: `linear-gradient(to right, #F6A2B8 50%, rgba(246, 162, 184, 0) 80%), url('${r.bgIMG}') right center / cover no-repeat`}}>
                      <div className={styles.imageContainer}>
                        <img src={r.doctorIMG} alt="Dr. Vera" />
                      </div>
                      <div className={styles.contentContainer}>
                        <h2>{r.title}</h2>
                        <p>{r.desc}</p>
                      </div>
                      <button className={styles.readButton}>Read</button>
                    </Link>
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