import Footer from "../../../global-components/footer/footer";
import Navbar from "../../../global-components/navbar2/navbar2.js"
import styles from './fitnessmanage.module.css';
import buttons from '../../../css/buttons.module.css';
import boxes from '../../../css/boxes.module.css';
import { deleteUserVideo, getUser, getUserPostedVideos, postUserVideo } from "../../../util/apireq.js";
import { useState, useEffect } from "react";
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from "../../../global-components/notify.js";

function FitnessManagePage(){
  const [role, setRole] = useState(null);
  const [videos, setVideos] = useState(null);

  const [newVidName, setNewVidName] = useState("");
  const [newVidDesc, setNewVidDesc] = useState("");
  const [newVidURL, setNewVidURL] = useState("");
  const [newVidTime, setNewVidTime] = useState("");

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
      const response = await getUserPostedVideos();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setVideos(response.data);
        console.log(response.data)
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
      return customWarningNotif("Video name is required.");
    }

    if (!newVidDesc.trim()) {
      return customWarningNotif("Video description is required.");
    }

    // Validate the YouTube video ID format
    const youtubeIDPattern = /^[a-zA-Z0-9_-]{11}$/;
    if (!youtubeIDPattern.test(newVidURL)) {
      return customWarningNotif("Invalid YouTube video ID.");
    }

    // Validate the time (must be a number between 1 and 9999)
    const videoTime = parseInt(newVidTime, 10);
    if (isNaN(videoTime) || videoTime < 1 || videoTime > 9999) {
      return customWarningNotif("Invalid video time.");
    }

    const response = await postUserVideo(newVidName, newVidDesc, newVidURL, `${newVidTime} min`);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      return customSuccessNotif("Successfully added video. Please refresh page to see it.");
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else {
      customWarningNotif("Error");
    }
  }


  const deleteVid = async(id) => {
    const response = await deleteUserVideo(id);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      return customSuccessNotif("Successfully deleted video. Please refresh page to see updated list.");
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else {
      customWarningNotif("Error");
    }
  }

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.outerdiv}>
          <h1 className="text-3xl font-bold text-blue">Manage Fitness Videos</h1>
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
                        placeholder="Youtube Video ID"
                        value={newVidURL}
                        onChange={(e) => setNewVidURL(e.target.value)}
                      ></input>
                    </div>

                    <div style={{display: "flex", alignItems: "center"}}>
                      <input className={styles.newVidInput}
                        placeholder="Time"
                        value={newVidTime}
                        onChange={(e) => setNewVidTime(e.target.value)}
                        type="number"
                        style={{width: "100px"}}
                      ></input>
                      <p style={{marginLeft: "10px"}}>Minutes</p>
                    </div>

                    <div>
                      <button className={buttons.stylisedBtn} onClick={addNewVideo}>Add New Video</button>
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
                        <h1>No Videos</h1>
                      </div>
                    ) : (
                      <div className={styles.videosDiv} style={{marginTop: "10px"}}>
                        {videos.map((v, i) => (
                          <div key={i} className={boxes.standard}>
                            <h1 style={{fontWeight: "700"}}>{v.name}</h1>
                            <p>{v.desc}</p>
                            <p>{v.time}</p>
                            <iframe 
                              className={styles.embed}
                              src={`https://www.youtube-nocookie.com/embed/${v.url}`}
                              title="YouTube video player" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              referrerPolicy="strict-origin-when-cross-origin" >
                            </iframe>
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

export default FitnessManagePage;