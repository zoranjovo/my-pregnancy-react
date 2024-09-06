import { useState, useEffect } from 'react';
import { getUser } from '../../util/apireq.js';
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify.js';

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
  };

  
  
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
                    <label>First Name</label>
                    <input
                      type='text'
                      name='firstname'
                      onChange={handleInputChange}
                      value={formData.firstname}
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Last Name</label>
                    <input
                      type='text'
                      name='lastname'
                      onChange={handleInputChange}
                      value={formData.lastname}
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <button className={buttons.stylisedBtn}>Change Password</button>
                  {role === "pregnant" ? (
                    <div>
                      <p>pregnant info</p>
                    </div>
                  ) : (
                    <div>
                      <p>doctor info</p>
                    </div>
                  )}
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