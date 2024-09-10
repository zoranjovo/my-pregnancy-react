import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../util/auth.js";

import { dotWave } from "ldrs";

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar3/navbar3.js"

import Welcome from "./components/welcome/welcome.js";
import Notifications from "./components/notifications/notifications.js"; // Assuming Notifications component
import Forums from "./components/forums/forums.js";
import Recommended from "./components/recommended/recommended.js";

import styles from "./home2.module.css";

function HomePage(){
  const navigate = useNavigate();
  dotWave.register();

  const [user, setUser] = useState({});
  const [userFound, setUserFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        if(!userData){
          throw new Error("Network Error");
        }
        if(userData.error){
          throw new Error(userData.error);
        }
        setUser(userData.data);
        setUserFound(true);
      } catch (error) {
        setErrorMsg(error.message);
        if(error.message === "Invalid or expired JWT" || error.message === "Token is not set"){
          clearToken();
          navigate('/login');
        }
        console.log(error.message);
      }
    }
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        {userFound ? (
          <div>
            <Welcome name={user.firstname}></Welcome>
            <div className={styles.journalAndForums}>
              <Notifications/> {/* Notifications box placed here */}
              <Forums/>
            </div>
            <Recommended/>
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
