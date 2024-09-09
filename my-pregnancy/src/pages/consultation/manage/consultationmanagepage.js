import { useState, useEffect } from "react";
import Footer from "../../../global-components/footer/footer";
import Navbar from "../../../global-components/navbar2/navbar2.js";
import { Link } from 'react-router-dom';
import { getExistingConsultations } from "../../../util/apireq.js";
import { serverErrorNotif, customWarningNotif } from "../../../global-components/notify.js";

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

  useEffect(() => {
    async function fetchConsultations() {
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
    fetchConsultations();
  }, []);

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div style={{margin: "10px"}}>
          <h1 className={styles.header}>Manage Consultations</h1>
          <div className={styles.container}>
            <div className={`${boxes.standard} ${styles.consultaionsContainer}`}>
              {role === "pregnant" ? (
                entries.map((consultation, index) => (
                  <div key={index} className={styles.consultationItem}>
                    <h1>{`Dr. ${consultation.doctorName}`}</h1>
                    <h2>Status: <span>{cap(consultation.status)}</span></h2>
                    <h3>{formatConsultationDate(consultation.date)}</h3>
                    <h3>{getTimeDifference(consultation.date)}</h3>
                    <p><strong>Reason:</strong> {consultation.reason}</p>
                    <p><strong>Communication:</strong> {consultation.communicationMedium}</p>
                    <p>Created At: {formatConsultationDate(consultation.createdAt)}</p>
                    <div className={styles.btns}>
                      <p onClick={() => customWarningNotif("Cancelling doesnt work yet")}>Cancel</p>
                    </div>
                  </div>
                ))
              ) : role === "doctor" ? (
                entries.map((consultation, index) => (
                  <div key={index} className={styles.consultationItem}>
                    <h1>{consultation.userName}</h1>
                    <h2>Status: <span>{cap(consultation.status)}</span></h2>
                    <h3>{formatConsultationDate(consultation.date)}</h3>
                    <h3>{getTimeDifference(consultation.date)}</h3>
                    <p><strong>Reason:</strong> {consultation.reason}</p>
                    <p><strong>Communication:</strong> {consultation.communicationMedium}</p>
                    <p>Created At: {formatConsultationDate(consultation.createdAt)}</p>
                    <div className={styles.btns}>
                      <p onClick={() => customWarningNotif("accepting doesnt work yet")}>Accept</p>
                      <p onClick={() => customWarningNotif("declining doesnt work yet")}>Decline</p>
                    </div>
                  </div>
                ))
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
