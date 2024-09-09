import { useState, useEffect } from 'react';
import styles from './consultation.module.css';
import buttons from '../../../css/buttons.module.css';
import { serverErrorNotif, customSuccessNotif, customWarningNotif } from '../../../global-components/notify';
import { getUser, getAllDoctors, createConsultationRequest } from '../../../util/apireq';
import { dotWave } from 'ldrs';


function ConsultationBook() {
  dotWave.register();
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);

  // fetch user info
  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUser(response.data);
        if(response.data.role === "pregnant"){ fetchDoctors(); }
        return;
      } else if(response.response.status === 404 || response.response.status === 401){
        customWarningNotif("Account not found, please sign in again");
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
    }
    fetchUser();
    
  }, []);

  const fetchDoctors = async () => {
    const response = await getAllDoctors();
    setDoctors(response.data);
  }

  const [preferredTime, setPreferredTime] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [consultReason, setConsultReason] = useState('');
  const [doctorGender, setDoctorGender] = useState('');
  const [communicationMedium, setCommunicationMedium] = useState('No Preference');
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [sendingBookingRequest, setSendingBookingRequest] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Input validation
    if(!preferredTime){ return customWarningNotif("Please select a preferred time."); }
    if(!preferredDate){ return customWarningNotif("Please select a preferred date."); }
    if(!consultReason){ return customWarningNotif("Please provide a reason for the consultation."); }
    if(!selectedConsultant){ return customWarningNotif("Please select a consultant."); }

    const combinedDateTime = new Date(`${preferredDate}T${preferredTime}`);
    if(isNaN(combinedDateTime.getTime())) { return customWarningNotif("Invalid date or time selected."); }
    
    // Check if the combined date-time is at least 10 minutes from now
    const currentTime = new Date();
    const timeDifference = combinedDateTime - currentTime; // Difference in milliseconds

    if (timeDifference < 600000) { // 600,000 milliseconds = 10 minutes
      return customWarningNotif("Please select a time at least 10 minutes from now.");
    }
    
    // display loading
    setSendingBookingRequest(1);
    const response = await createConsultationRequest(combinedDateTime.getTime(), consultReason, communicationMedium, selectedConsultant);
	  if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setSendingBookingRequest(2);
      customSuccessNotif("Successfully sent consultation request");
      return;
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 400){
      console.log(response.response.data.error);
      customWarningNotif(response.response.data.error);
      setSendingBookingRequest(0);
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    }
  };

  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);


  return (
    <div className={styles.outerdiv}>
      {user.role ? (
        user.role === "pregnant" ? (
          <div>
            <h1 className={styles.header}>Consultation Booking</h1>
            <div className={styles.innerdiv}>
              <div className={styles.leftSide}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="preferredTime">Preferred Time</label>
                    <input
                      type="time"
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                    />
                  </div>
      
                  <div className={styles.inputGroup}>
                    <label htmlFor="preferredDate">Preferred Date</label>
                    <input
                      type="date"
                      id="preferredDate"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                  </div>
      
                  <div className={styles.inputGroup}>
                    <label htmlFor="consultReason">Reason For Consultation Request</label>
                    <input
                      type="text"
                      id="consultReason"
                      value={consultReason}
                      onChange={(e) => setConsultReason(e.target.value)}
                      placeholder="e.g., Upset Stomach"
                    />
                  </div>
      
                  <div className={styles.inputGroup}>
                    <label htmlFor="doctorGender">Preferred Doctor Gender</label>
                    <select
                      id="doctorGender"
                      value={doctorGender}
                      onChange={(e) => setDoctorGender(e.target.value)}
                    >
                      <option value='female'>Female</option>
                      <option value='male'>Male</option>
                      <option value=''>No preference</option>
                    </select>
                  </div>
      
                  <div className={styles.inputGroup}>
                    <label>Preferred Medium of Communication</label>
                    <div className={styles.radio}>
                      <label htmlFor="videoCall">
                        <input
                          id="videoCall"
                          type="radio"
                          name="medium"
                          value="Video Call"
                          checked={communicationMedium === 'Video Call'}
                          onChange={(e) => setCommunicationMedium(e.target.value)}
                        />
                        Video Call
                      </label>
                      <label htmlFor="text">
                        <input
                          id="text"
                          type="radio"
                          name="medium"
                          value="Text"
                          checked={communicationMedium === 'Text'}
                          onChange={(e) => setCommunicationMedium(e.target.value)}
                        />
                        Text
                      </label>
                      <label htmlFor="noPreference">
                        <input
                          id="noPreference"
                          type="radio"
                          name="medium"
                          value="No Preference"
                          checked={communicationMedium === 'No Preference'}
                          onChange={(e) => setCommunicationMedium(e.target.value)}
                        />
                        No Preference
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className={styles.rightSide}>
                <h2>Select a Consultant</h2>
                {doctors.length > 0 ? (
                  <ul className={styles.consultantList}>
                    {doctors
                      .filter((consultant) => {
                        if (doctorGender === '') return true;
                        return consultant.gender.toLowerCase() === doctorGender.toLowerCase();
                      })
                      .map((consultant) => (
                      <li 
                        key={consultant._id} 
                        className={`${styles.consultantItem} ${selectedConsultant === consultant._id ? styles.selectedConsultant : ''}`}
                        onClick={() => setSelectedConsultant(consultant._id)}
                      >
                        <h3>{`Dr. ${consultant.firstname} ${consultant.lastname}`}</h3>
                        <p>Specialty: {consultant.specialization}</p>
                        <p>Gender: {cap(consultant.gender)}</p>
                        <label className={styles.consultantLabel}>
                          <input
                            type="radio"
                            name="consultant"
                            value={consultant._id}
                            checked={selectedConsultant === consultant._id}
                            onChange={() => setSelectedConsultant(consultant._id)}
                          />
                          Select
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={`flex items-center justify-center`} style={{ marginTop: '100px' }}>
                    <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave>
                  </div>
                )}
                
              </div>
            </div>
            <div className={styles.submitContainer}>
              {sendingBookingRequest === 0 ? (
                <button type="submit" className={buttons.stylisedBtn} onClick={handleSubmit}>
                  Book Consultation
                </button>
              ) : sendingBookingRequest === 1 ? (
                <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave>
              ) : (
                <p>Consultation request successful. Please monitor your request for any updates.</p>
              )}

            </div>
          </div>
        ) : user.role === "doctor" ? (
          <p>doctor ui</p>
        ) : (
          <p>Invalid role</p>
        )
      ) : (
        <div className={`flex items-center justify-center`} style={{ marginTop: '100px' }}>
          <l-dot-wave size="47" speed="1" color="#f06292" data-testid="loading-indicator"></l-dot-wave>
        </div>
      )}
    </div>
  );
}

export default ConsultationBook;
