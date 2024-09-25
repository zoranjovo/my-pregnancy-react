import { useState, useEffect } from "react";
import Footer from "../../../global-components/footer/footer";
import Navbar from "../../../global-components/navbar2/navbar2.js";
import { Link } from 'react-router-dom';
import { getExistingConsultations, updateConsultationState } from "../../../util/apireq.js";
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from "../../../global-components/notify.js";

import styles from './consultationmanage.module.css';
import buttons from '../../../css/buttons.module.css';
import boxes from '../../../css/boxes.module.css';


const formatConsultationDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const timeString = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const dateString = date.toLocaleDateString([], options);
  return `${timeString} ${dateString}`;
};

const getTimeDifference = (timestamp) => {
  const now = new Date();
  const consultationDate = new Date(timestamp);
  const diffMs = consultationDate - now;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) {
    return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else if (diffMinutes > 0) {
    return `In ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else {
    return 'Now';
  }
};



function ConsultationManagePage(){
  const [entries, setEntries] = useState([]);
  const [role, setRole] = useState("load");

  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const fetchConsultations = async () => {
    const response = await getExistingConsultations();
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setRole(response.data.role);
      return setEntries(response.data.requests);
    } else if(response.response.status === 404 || response.response.status === 401){
      return customWarningNotif("Please sign in again");
    } else if(response.status === 500){
      return customWarningNotif("Server error");
    }
  }

  useEffect(() => { fetchConsultations(); }, []);


  const updateState = async (id, status) => {
    const response = await updateConsultationState(id, status);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif(response.data.message);
      fetchConsultations()
    } else {
      customWarningNotif(response.response.data.error);
    }
  }

  const sortedEntries = entries.sort((a, b) => b.date - a.date);

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div style={{margin: "10px"}}>
          <h1 className={styles.header}>Manage Consultations</h1>
          <div className={styles.container}>
            <div className={`${boxes.standard} ${styles.consultaionsContainer}`}>
              
              {role === "pregnant" ? (
                entries.length === 0 ? (
                  <p>No results</p>
                ) : (
                  sortedEntries.map((consultation, index) => {
                    const currentTime = new Date().getTime();
                    const consultationTime = consultation.date;
                    const timeDifference = consultationTime - currentTime;
                    const tolerance = 6 * 60 * 1000;
                  
                    return (
                      <div key={index} className={styles.consultationItem}>
                        <h1>{`Dr. ${consultation.doctorName}`}</h1>
                        <h2>Status: <span>{cap(consultation.status)}</span></h2>
                        
                        {consultation.status === "accepted" && (
                          timeDifference <= tolerance ? (
                            <a href={consultation.meetingURL} className={styles.joinLink} target="_blank" rel="noopener noreferrer">
                              <h2>Join</h2>
                            </a>
                          ) : (
                            <p>Meeting Link will appear within 5 minutes of consultation start time</p>
                          )
                        )}

                        <h3>{formatConsultationDate(consultation.date)}</h3>
                        {timeDifference > -tolerance && (
                          <h3>{getTimeDifference(consultation.date)}</h3>
                        )}
                        
                        <p><strong>Reason:</strong> {consultation.reason}</p>
                        <p><strong>Communication:</strong> {consultation.communicationMedium}</p>
                        <p>Created At: {formatConsultationDate(consultation.createdAt)}</p>

                        {(consultation.status === "pending" || consultation.status === "accepted") ? (
                          <div className={styles.btns}>
                            <p onClick={() => updateState(consultation._id, "cancelled")}>Cancel</p>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  })
                )
              ) : role === "doctor" ? (
                entries.length === 0 ? (
                  <p>No results</p>
                ) : (
                  sortedEntries.map((consultation, index) => {
                    const currentTime = new Date().getTime();
                    const consultationTime = consultation.date;
                    const timeDifference = consultationTime - currentTime;
                    const tolerance = 5 * 60 * 1000;
                  
                    return (
                      <div key={index} className={styles.consultationItem}>
                        <h1>{`${consultation.userName}`}</h1>
                        <h2>Status: <span>{cap(consultation.status)}</span></h2>
                  
                        {/* Show the Join link only if the consultation is accepted */}
                        {consultation.status === "accepted" && (
                          <a href={consultation.meetingURL} className={styles.joinLink} target="_blank" rel="noopener noreferrer">
                            <h2>Join</h2>
                          </a>
                        )}
                  
                        <h3>{formatConsultationDate(consultation.date)}</h3>

                        {timeDifference > -tolerance && (
                          <h3>{getTimeDifference(consultation.date)}</h3>
                        )}

                        <p><strong>Reason:</strong> {consultation.reason}</p>
                        <p><strong>Communication:</strong> {consultation.communicationMedium}</p>
                        <p>Created At: {formatConsultationDate(consultation.createdAt)}</p>
                  
                        {consultation.status === "pending" ? (
                          <div className={styles.btns}>
                            <p onClick={() => updateState(consultation._id, "accepted")}>Accept</p>
                            <p onClick={() => updateState(consultation._id, "rejected")}>Decline</p>
                          </div>
                        ) : consultation.status === "accepted" ? (
                          <div className={styles.btns}>
                            {/* Check if the consultation time has passed */}
                            {consultationTime < currentTime ? (
                              <p onClick={() => updateState(consultation._id, "completed")}>Complete</p>
                            ) : (
                              <p onClick={() => updateState(consultation._id, "cancelled")}>Cancel</p>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  })
                )
              ) : role === "load" ? (
                <p>Loading...</p>
              ) : (
                <p>invalid role</p>
              )}
              
            </div>
            
          </div>
          <div className={styles.bookBtnContainer}>
            {role === "pregnant" && (
              <Link to="/consultation/book">
                <button type="submit" className={buttons.stylisedBtn}>Book New Consultation</button>
              </Link>
            )}
          </div>
          
        </div>
        
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ConsultationManagePage;
