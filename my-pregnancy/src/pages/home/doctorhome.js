import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../util/auth.js";

import { dotWave } from "ldrs";

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar3/navbar3.js"

import Welcome from "./components/welcome/welcome.js";
import Notifications from "./components/notifications/notifications.js";
import Forums from "./components/forums/forums.js";
import Recommended from "./components/recommended/doctorrecommended.js";

import styles from "./home2.module.css";

function DoctorHomePage({user}){
  const navigate = useNavigate();
  dotWave.register();

  // const [user, setUser] = useState({});
  // const [userFound, setUserFound] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        <div>
          <Welcome user={user}></Welcome>
          <div className={styles.journalAndForums}>
            <Notifications/> {/* Notifications box placed here */}
            <Forums/>
          </div>
          <Recommended/>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default DoctorHomePage;
