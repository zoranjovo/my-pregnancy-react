import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../../util/apireq.js';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../global-components/notify.js';

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";

import styles from './accountpage.module.css';
import buttons from '../../css/buttons.module.css';
import { dotWave } from 'ldrs';

function AccountPage(){
  dotWave.register();
  
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    aphraVerification: "",
    specialization: "",
    yearsExperience: "",
    weight: "",
    pregnancyMonth: ""
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUser(response.data);
        setRole(response.data.role);
        console.log(response.data)
        setFormData({
          firstname: response.data.firstname || "",
          lastname: response.data.lastname || "",
          aphraVerification: response.data.aphraVerification || "",
          specialization: response.data.specialization || "",
          yearsExperience: response.data.yearsExperience || "",
          weight: response.data.weight || "",
          pregnancyMonth: response.data.pregnancyMonth || ""
        });
        return;
      } else if(response.response.status === 404){
        customWarningNotif("Account not found, please sign in again");
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    console.log(formData)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };


  const saveChanges = async () => {
    // validity checks
    if(!formData.firstname){ return customWarningNotif("Please enter your first name"); }
    if(formData.firstname.length > 200){ return customWarningNotif("First name is too long"); }
    if(!formData.lastname){ return customWarningNotif("Please enter your last name"); }
    if(formData.lastname.length > 200){ return customWarningNotif("Last name is too long"); }

    if(role === "pregnant"){
      if(!Number(formData.weight)){ return customWarningNotif("Please enter your weight"); }
      if(Number(formData.weight) > 300){ return customWarningNotif("Please enter a valid weight"); }
      if(Number(formData.weight) < 1){ return customWarningNotif("Please enter a valid weight"); }
      if(!Number(formData.pregnancyMonth)){ return customWarningNotif("Please enter your pregnancy month"); }
      if(Number(formData.pregnancyMonth) > 12){ return customWarningNotif("Please enter a valid pregnancy month"); }
      if(Number(formData.pregnancyMonth) < 0){ return customWarningNotif("Please enter a valid pregnancy month"); }
    }

    const response = await updateUser(formData);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        return customSuccessNotif("Successfully updated changes")
      } else if(response.response.status === 400){
        return customWarningNotif(response.response.data.error);
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
  }

  
  
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={styles.accountpage}>
          <h1 className="text-3xl font-bold text-blue">Account Details</h1>
          <div className={styles.inner}>
            {role !== "" ? (
              <div>
                <div className={styles.generalInfo}>
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
                  <div className={styles.inputDiv}>
                    <button className={buttons.stylisedBtn}>Change Password</button>
                  </div>
                  
                  {role === "pregnant" ? (
                    <div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='weight'>Weight (kg)</label>
                        <input
                          type='number'
                          name='weight'
                          id='weight'
                          onChange={handleInputChange}
                          value={formData.weight}
                        />
                      </div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='month'>Pregnancy Month</label>
                        <input
                          type='number'
                          name='month'
                          id='month'
                          onChange={handleInputChange}
                          value={formData.pregnancyMonth}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.inputDiv}>
                        <label htmlFor='aphraVerification'>Aphra Verification</label>
                        <input
                          type='number'
                          name='aphraVerification'
                          id='aphraVerification'
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
                          onChange={handleInputChange}
                          value={formData.yearsExperience}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <button className={buttons.stylisedBtn} onClick={saveChanges}>Save Changes</button>
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
          </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default AccountPage;