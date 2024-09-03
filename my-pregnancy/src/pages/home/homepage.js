import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";
import { dotWave } from "ldrs";
import { serverErrorNotif } from '../../global-components/notify';

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js"

import Welcome from "./components/welcome/welcome.js";
import Journal from "./components/journal/journal.js";
import Forums from "./components/forums/forums.js";
import Recommended from "./components/recommended/recommended.js";

import styles from "./home.module.css";


function HomePage(){
  dotWave.register();

  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUser(response.data);
        setRole(response.data.role);
        setUserFound(true);
        return;
      } else if(response.status === 404){
        setErrorMsg("Account not found");
      } else if(response.status === 500){
        setErrorMsg("Server error");
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        {userFound ? (
          <div>
            <Welcome name={user.firstname}></Welcome>
            {role === "pregnant" ? (
              <div>
                <div className={styles.journalAndForums}>
                  <Journal currentDay={user.pregnancyMonth} nextCycle={user.pregnancyMonth} weight={user.weight} currentStage={user.pregnancyMonth}/>
                  <Forums/>
                </div>
                <Recommended/>
              </div>
              
            ) : (
              <div>
                <p>no ui for doctor yet</p>
              </div>
            )}
            
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            {errorMsg === "" ? (
              <l-dot-wave
                size="47"
                speed="1" 
                color="#f06292" 
                data-testid="loading-indicator">
              </l-dot-wave>
            ) : (
              <h1>{errorMsg}</h1>
            )}
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;