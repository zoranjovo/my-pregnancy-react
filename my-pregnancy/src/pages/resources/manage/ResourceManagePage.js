import Footer from "../../../global-components/footer/footer";
import Navbar from "../../../global-components/navbar2/navbar2.js"
import styles from './resourcemanage.module.css';
import buttons from '../../../css/buttons.module.css';
import boxes from '../../../css/boxes.module.css';
import { deleteUserResource, getUser, getUserPostedResources, postUserResource } from "../../../util/apireq.js";
import { useState, useEffect } from "react";
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from "../../../global-components/notify.js";

const stages = ["1st Trimester", "2nd Trimester", "3rd Trimester"];

function ResourceManagePage(){
  const [role, setRole] = useState(null);
  const [videos, setVideos] = useState(null);

  const [newVidName, setNewVidName] = useState("");
  const [newVidDesc, setNewVidDesc] = useState("");
  const [newVidURL, setNewVidURL] = useState("");
  const [newVidContent, setNewVidContent] = useState("");
  const [selectedStage, setSelectedStage] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setRole(response.data.role);
      } else {
        return customWarningNotif("Error");
      }
    }

    async function fetchVideos() {
      const response = await getUserPostedResources();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setVideos(response.data);
      } else {
        return customWarningNotif("Error");
      }
    }

    fetchUser();
    fetchVideos();
  }, []);


  const addNewVideo = async () => {
    // Check if name and description are not empty
    if (!newVidName.trim()) {
      return customWarningNotif("Resource name is required.");
    }

    if (!newVidDesc.trim()) {
      return customWarningNotif("Resource description is required.");
    }

    // Validate the YouTube video ID format
    if (!newVidURL.trim()) {
      return customWarningNotif("Resource URL is required.");
    }

    if (!newVidContent.trim()) {
      return customWarningNotif("Resource content is required.");
    }

    if (selectedStage === "") {
      return customWarningNotif("Select a stage.");
    }

    if (imgURL === "") {
      return customWarningNotif("Insert an image URL.");
    }
    

    const response = await postUserResource(newVidName, newVidDesc, newVidURL, newVidContent, selectedStage, imgURL);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      return customSuccessNotif("Successfully added resource. Please refresh page to see it.");
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else {
      customWarningNotif("Error");
    }
  }


  const deleteVid = async(id) => {
    const response = await deleteUserResource(id);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      return customSuccessNotif("Successfully deleted resource. Please refresh page to see updated list.");
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else {
      customWarningNotif("Error");
    }
  }

  const handleStageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStage(selectedValue);
  };

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.outerdiv}>
          <h1 className="text-3xl font-bold text-blue">Manage Resources</h1>
          {!role ? (
            <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
              <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"/>
            </div>
          ) : (
            role !== "doctor" ? (
              <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
                <h1>This feature is only available to doctors</h1>
              </div>
            ) : (
              <div style={{marginTop: "10px"}}>
                <div className={`flex items-center justify-center`}>
                  <div className={boxes.standard}>
                    <div>
                      <input className={styles.newVidInput}
                        placeholder="Name"
                        value={newVidName}
                        onChange={(e) => setNewVidName(e.target.value)}
                      ></input>
                    </div>
                    
                    <div>
                      <input className={styles.newVidInput}
                        placeholder="Description"
                        value={newVidDesc}
                        onChange={(e) => setNewVidDesc(e.target.value)}
                      ></input>
                    </div>
                    
                    <div>
                      <input className={styles.newVidInput}
                        placeholder="Page URL"
                        value={newVidURL}
                        onChange={(e) => setNewVidURL(e.target.value)}
                      ></input>
                    </div>

                    <div>
                      <input className={styles.newVidInput}
                        placeholder="Image URL"
                        value={imgURL}
                        onChange={(e) => setImgURL(e.target.value)}
                      ></input>
                    </div>

                    <div>
                      <img src={imgURL} alt="Preview" className={styles.imgPreview}></img>
                    </div>

                    <div>
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

                    <div>
                      <textarea className={styles.inputTA}
                        placeholder="Content"
                        value={newVidContent}
                        onChange={(e) => setNewVidContent(e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <button className={buttons.stylisedBtn} onClick={addNewVideo}>Add New Resource</button>
                    </div>
                  </div>
                </div>

                <div>
                  {!videos ? (
                    <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
                      <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"/>
                    </div>
                  ) : (
                    videos.length === 0 ? (
                      <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
                        <h1>No Resources</h1>
                      </div>
                    ) : (
                      <div className={styles.videosDiv} style={{marginTop: "10px"}}>
                        {videos.map((v, i) => (
                          <div key={i} className={boxes.standard}>
                            <a href={v.url}><h1 style={{fontWeight: "700"}}>{v.name}</h1></a>
                            <a href={v.url}><h1>{`URL: ${v.url}`}</h1></a>
                            <p>{`Stage: ${v.stage}`}</p>
                            <p>{`Description: ${v.desc}`}</p>
                            <p>{`Content: ${v.content}`}</p>
                            <div>
                              <img src={v.imgurl} alt="Preview" className={styles.imgPreview}></img>
                            </div>
                            <button className={buttons.stylisedBtn} style={{marginTop: "10px"}} onClick={() => deleteVid(v._id)}>Delete</button>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
        
      </div>
        
      <Footer></Footer>
    </div>
  );
}

export default ResourceManagePage;