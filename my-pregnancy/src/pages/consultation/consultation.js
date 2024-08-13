import { useState } from 'react';
import styles from './consultation.module.css';
import buttons from '../../css/buttons.module.css';

const consultants = [
  { id: 1, name: 'Dr. Alice Johnson', specialty: 'Family Medicine', gender: 'Female'},
  { id: 2, name: 'Dr. Bob Smith', specialty: 'Family Medicine', gender: 'Male'},
  { id: 3, name: 'Dr. Carol Brown', specialty: 'Family Medicine', gender: 'Female'},
];

function Consultation() {
  const [preferredTime, setPreferredTime] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [consultReason, setConsultReason] = useState('');
  const [doctorGender, setDoctorGender] = useState('No preference');
  const [communicationMedium, setCommunicationMedium] = useState('No Preference');
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const handleSubmit = (e) => {
    
	// TODO: Logic here
	
	e.preventDefault();
    console.log({
      preferredTime,
      preferredDate,
      consultReason,
      doctorGender,
      communicationMedium,
      selectedConsultant,
    });
  };

  return (
    <div className={styles.outerdiv}>
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
                <option>Female</option>
                <option>Male</option>
                <option>No preference</option>
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
          <ul className={styles.consultantList}>
            {consultants.map((consultant) => (
              <li key={consultant.id} className={styles.consultantItem}>
                <h3>{consultant.name}</h3>
                <p>Specialty: {consultant.specialty}</p>
                <p>Gender: {consultant.gender}</p>
                <label className={styles.consultantLabel}>
                  <input
                    type="radio"
                    name="consultant"
                    value={consultant.id}
                    checked={selectedConsultant === consultant.id}
                    onChange={() => setSelectedConsultant(consultant.id)}
                  />
                  Select
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.submitContainer}>
        <button type="submit" className={buttons.stylisedBtn} onClick={handleSubmit}>
          Book Consultation
        </button>
      </div>
    </div>
  );
}

export default Consultation;
