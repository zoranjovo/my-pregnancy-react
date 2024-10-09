import { dotWave } from "ldrs";

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js";

import Welcome from "./components/welcome/welcome.js";
import Notifications from "./components/notifications/notifications.js";
import Forums from "./components/forums/forums.js";
import DoctorsVideos from "./components/recommendedvideos/doctorrecommended.js";

import styles from "./home.module.css";

function DoctorHomePage({user}){
  dotWave.register();

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        <div>
          <Welcome user={user}></Welcome>
          <div className={styles.topContainer}>
            <Notifications/>
            <Forums/>
          </div>
          <DoctorsVideos/>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default DoctorHomePage;
