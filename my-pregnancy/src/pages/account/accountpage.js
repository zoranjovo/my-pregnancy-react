import { useState, useEffect } from 'react';
import { getUser, updateUser, updateUserPhoto, deleteUserPhoto } from '../../util/apireq.js';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../global-components/notify.js';
import { useNavigate } from 'react-router-dom';

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";

import styles from './accountpage.module.css';
import buttons from '../../css/buttons.module.css';
import boxes from '../../css/boxes.module.css';
import { dotWave } from 'ldrs';
import { clearToken } from '../../util/auth.js';

function AccountPage(){
  const navigate = useNavigate();
  dotWave.register();
  
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [PFP, setPFP] = useState("");
  const [PFPTemp, setPFPTemp] = useState("");
  const [PFPPaneOpen, setPFPPaneOpen] = useState(false);
  const [selectedPFPFile, setSelectedPFPFile] = useState(null);

  const handlePFPFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPFPFile(file);
      const previewURL = URL.createObjectURL(file);
      setPFPTemp(previewURL); // Show file preview
    }
  };

  const uploadPFP = async () => {
    const response = await updateUserPhoto(selectedPFPFile);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif("Successfully updated profile photo");
      setPFP(PFPTemp);
      let tempUsr = user
      tempUsr.pfpExists = true;
      setUser(tempUsr);
      return;
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else if(response.response.status === 400){
      customWarningNotif("Please only upload a png or jpg image");
    } else {
      customWarningNotif("Error");
    }
  }

  const deletePFP = async () => {
    const response = await deleteUserPhoto();
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif("Successfully deleted profile photo");
      setPFPTemp("");
      setPFP("");
      let tempUsr = user
      tempUsr.pfpExists = false;
      setUser(tempUsr);
      return;
    } else if(response.response.status === 404 || response.response.status === 401){
      customWarningNotif("Account not found, please sign in again");
    } else if(response.response.status === 500){
      customWarningNotif("Server error");
    } else {
      customWarningNotif("Error");
    }
  }

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    dob: "",
    address: "",
    aphraVerification: "",
    specialization: "",
    yearsExperience: "",
    gender: "",
    weight: "",
    pregnancyMonth: "",
    conceptionDate: "",
    bloodType: "",
    allergens: ""
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUser(response.data);
        setRole(response.data.role);
        if(response.data.profilePhotoUrl){
          setPFP(response.data.profilePhotoUrl);
          setPFPTemp(response.data.profilePhotoUrl)
        }
        setFormData({
          firstname: response.data.firstname || "",
          lastname: response.data.lastname || "",
          phone: response.data.phone || "",
          dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : "", // Format date as YYYY-MM-DD
          address: response.data.address || "",
          gender: response.data.gender || "",
          aphraVerification: response.data.aphraVerification || "",
          specialization: response.data.specialization || "",
          yearsExperience: response.data.yearsExperience || "",
          meetingURL: response.data.meetingURL || "",
          weight: response.data.weight || "",
          pregnancyMonth: response.data.pregnancyMonth || "",
          conceptionDate: response.data.conceptionDate ? new Date(response.data.conceptionDate).toISOString().split('T')[0] : "",
          bloodType: response.data.bloodType || "",
          allergens: response.data.allergens || ""
        });
        return;
      } else if(response.response.status === 404 || response.response.status === 401){
        customWarningNotif("Account not found, please sign in again");
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const saveChanges = async () => {
    // Create a new object to hold the visible input data
    let updatedData = {
      firstname: formData.firstname || "",
      lastname: formData.lastname || "",
      phone: formData.phone || "",
      dob: formData.dob ? new Date(formData.dob).getTime() : "", // Convert date to timestamp
      address: formData.address || "",
    };
  
    // Role-specific data for "pregnant"
    if (role === "pregnant") {
      updatedData.weight = formData.weight || "";
      updatedData.conceptionDate = formData.conceptionDate ? new Date(formData.conceptionDate).getTime() : ""; // Convert date to timestamp
      updatedData.bloodType = formData.bloodType || "";
      updatedData.allergens = formData.allergens || "";
    }
  
    // Role-specific data for "doctor"
    if (role === "doctor") {
      updatedData.gender = formData.gender || "";
      updatedData.aphraVerification = formData.aphraVerification || "";
      updatedData.specialization = formData.specialization || "";
      updatedData.yearsExperience = formData.yearsExperience || "";
      updatedData.meetingURL = formData.meetingURL || "";
    }
  
    // Make the API request to update user details
    const response = await updateUser(updatedData);
  
    if (response.message === "Network Error") {
      return serverErrorNotif();
    }
    if (response.status === 200) {
      customSuccessNotif("Successfully updated changes");
    } else if (response.response.status === 400) {
      customWarningNotif(response.response.data.error);
    } else if (response.response.status === 500) {
      customWarningNotif("Server error");
    }
  };

  const logOut = () => {
    clearToken();
    customSuccessNotif("Successfully logged out");
    navigate("/");
  }

  const calculateTimeAlong = (conceptionDate) => {
    if(!conceptionDate) return 'N/A';
    const currentDate = new Date();
    const conception = new Date(conceptionDate);
    const timeDifference = currentDate - conception;
    const daysAlong = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${daysAlong} days`;
  };
  
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.accountpage}>
          <div className={boxes.standard}>
            {role !== "" ? (
              <div className={styles.split}>
                <div>
                  <h1 className="text-3xl font-bold text-blue">Account</h1>
                  <div className={`${styles.profileDivContainer} ${boxes.standard}`}>
                    <div className={`${styles.profileDiv}`}>
                      {!user.pfpExists ? (
                        <img src='/assets/blank-profile-picture.webp' alt='profile'></img>
                      ) : (
                        <img src={PFP} alt='profile'></img>
                      )}
                      
                      <div className={styles.profileInfo}>
                        <h2>{`${formData.firstname} ${formData.lastname}`}</h2>
                        <p>{formData.address || 'Address not available'}</p>
                        <p className={styles.role}>{role === 'doctor' ? 'Doctor' : 'Mother-To-Be'}</p>
                      </div>
                    </div>

                    <div className={styles.profileDetails}>
                      {role === 'pregnant' ? (
                        <>
                          <p><strong>Time Along: </strong>{calculateTimeAlong(formData.conceptionDate)}</p>
                          <p><strong>Next Cycle: </strong>{'6 days (Placeholder)'}</p>
                          <p><strong>Weight: </strong>{formData.weight ? `${formData.weight} Kg` : 'N/A'}</p>
                          <p><strong>Current Stage: </strong>{'Luteal Phase (Placeholder)'}</p>
                        </>
                      ) : role === 'doctor' ? (
                        <>
                          <p><strong>Specialization: </strong>{formData.specialization || 'N/A'}</p>
                          <p><strong>Experience: </strong>{formData.yearsExperience ? `${formData.yearsExperience} years` : 'N/A'}</p>
                        </>
                      ) : (
                        <p>Role information is not available.</p>
                      )}
                    </div>
                  </div>
              
                </div>
                
                <div className={styles.inputsDiv}>
                  <div className={styles.generalInfo}>
                    <h2 className="text-2xl font-bold text-blue">Personal Details</h2>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputDiv}>
                        <label htmlFor='firstname'>First Name</label>
                        <input
                          type='text'
                          name='firstname'
                          id='firstname'
                          onChange={handleInputChange}
                          value={formData.firstname}
                        />
                      </div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='firstname'>Phone</label>
                        <input
                          type='number'
                          name='phone'
                          id='phone'
                          onChange={handleInputChange}
                          value={formData.phone}
                          placeholder='Phone'
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputDiv}>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                          type='text'
                          name='lastname'
                          id='lastname'
                          onChange={handleInputChange}
                          value={formData.lastname}
                        />
                      </div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='email'>Email</label>
                        <input
                          className={styles.noChange}
                          type='email'
                          name='email'
                          id='email'
                          value={user.email}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputDiv}>
                        <label htmlFor='dob'>Date of Birth</label>
                        <input
                          className={styles.inputPart}
                          type='date'
                          name='dob'
                          id='dob'
                          onChange={handleInputChange}
                          value={formData.dob}
                          placeholder='D.O.B'
                        />
                      </div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='address'>Address</label>
                        <input
                          type='text'
                          name='address'
                          id='address'
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder='Address'
                        />
                      </div>
                    </div>
                    {role === "doctor" && (
                      <div className={styles.inputDiv}>
                        <label htmlFor='gender'>Gender</label>
                        <select
                          className={styles.genderSelector}
                          name='gender'
                          id='gender'
                          onChange={handleInputChange}
                          value={formData.gender}
                        >
                          <option value='' disabled>Select Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                      </div>
                    )}
                    
                    
                    {role === "pregnant" ? (

                      <div>
                        <h2 className="text-2xl font-bold text-blue">Health Details</h2>
                        <div className={styles.inputGroup}>
                          <div className={styles.inputDiv}>
                            <label htmlFor='weight'>Weight (kg)</label>
                            <input
                              type='number'
                              name='weight'
                              id='weight'
                              onChange={handleInputChange}
                              value={formData.weight}
                              placeholder='Weight'
                            />
                          </div>
                          <div className={styles.inputDiv}>
                            <label htmlFor='conceptionDate'>Conception Date</label>
                            <input
                              type='date'
                              name='conceptionDate'
                              id='conceptionDate'
                              onChange={handleInputChange}
                              value={formData.conceptionDate}
                            />
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <div className={styles.inputDiv}>
                            <label htmlFor='bloodType'>Blood Type</label>
                            <input
                              type='number'
                              name='bloodType'
                              id='bloodType'
                              onChange={handleInputChange}
                              value={formData.bloodType}
                              placeholder='Blood Type'
                            />
                          </div>
                          <div className={styles.inputDiv}>
                            <label htmlFor='allergens'>Allergens (optional)</label>
                            <input
                              type='text'
                              name='allergens'
                              id='allergens'
                              onChange={handleInputChange}
                              value={formData.allergens}
                              placeholder='Allergens (optional)'
                            />
                          </div>
                        </div>
                        
                      </div>
                    ) : role === "doctor" ? (
                      <div className={styles.sideBySide}>
                        <div>
                          <h2 className="text-2xl font-bold text-blue">Qualification Details</h2>
                          <div className={styles.inputDiv}>
                            <label htmlFor='aphraVerification'>Aphra Verification</label>
                            <input
                              type='number'
                              name='aphraVerification'
                              id='aphraVerification'
                              placeholder='Aphra Verification'
                              onChange={handleInputChange}
                              value={formData.aphraVerification}
                            />
                          </div>
                          <div className={styles.inputDiv}>
                            <label htmlFor='specialization'>Specialization</label>
                            <input
                              type='text'
                              name='specialization'
                              id='specialization'
                              placeholder='Specilization'
                              onChange={handleInputChange}
                              value={formData.specialization}
                            />
                          </div>
                          <div className={styles.inputDiv}>
                            <label htmlFor='yearsExperience'>Years Experience</label>
                            <input
                              type='number'
                              name='yearsExperience'
                              id='yearsExperience'
                              placeholder='Years Experience'
                              onChange={handleInputChange}
                              value={formData.yearsExperience}
                            />
                          </div>
                        </div>
                        <div>
                        <h2 className="text-2xl font-bold text-blue">Consultation Details</h2>
                          <div className={styles.inputDiv}>
                            <label htmlFor='meetingURL'>Online Meeting URL</label>
                            <input
                              type='url'
                              name='meetingURL'
                              id='meetingURL'
                              placeholder='https://zoom.us/...'
                              onChange={handleInputChange}
                              value={formData.meetingURL}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>invalid role??</p>
                    )}
                    <div className={styles.buttonsDiv}>
                      <button className={buttons.stylisedBtn} onClick={saveChanges}>Save Changes</button>
                      <button className={buttons.stylisedBtn}>Change Password</button>
                      <button className={buttons.stylisedBtn} onClick={() => setPFPPaneOpen(true)}>Upload Profile Photo</button>
                      <button className={buttons.stylisedBtn} onClick={logOut}>Log Out</button>
                    </div>
                  </div>
                </div>
                
              </div>
            ) : (
              <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
                <l-dot-wave
                    size="47"
                    speed="1" 
                    color="#f06292" 
                    data-testid="loading-indicator">
                </l-dot-wave>
              </div>
            )}
            {PFPPaneOpen && (
              <div
                className={`${boxes.standard} ${styles.pfpPane} ${
                  PFPPaneOpen ? styles.pfpPaneOpen : styles.pfpPaneClose
                }`}
              >
                <div className={`${styles.profileDiv} ${styles.pfpPreview}`}>
                  {!user.pfpExists && PFPTemp === "" ? (
                    <img src='/assets/blank-profile-picture.webp' alt='profile' />
                  ) : (
                    <img src={PFPTemp} alt='profile' />
                  )}
                </div>
                <div className={styles.pfpManage}>
                  <label htmlFor="fileInput" className={styles.fileInputLabel}>
                    Choose Photo
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePFPFileChange(e)}
                    className={styles.fileInput}
                  />
                  <button onClick={uploadPFP} className={styles.uploadButton}>
                    Upload Photo
                  </button>
                  <button onClick={deletePFP} className={styles.deleteButton}>
                    Delete Photo
                  </button>
                </div>
                <button className={styles.closeButton} onClick={() => setPFPPaneOpen(false)}>X</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default AccountPage;