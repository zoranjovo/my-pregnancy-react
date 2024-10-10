import { dotWave } from "ldrs";
import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js"

import Welcome from "./components/welcome/welcome.js";
import Journal from "./components/journal/journal.js";
import Forums from "./components/forums/forums.js";
import RecommendedVideos from "./components/recommendedvideos/pregnantrecommendedvideos.js";
import RecommendedResources from "./components/recommendedresources/pregnantresources.js";

import styles from "./home.module.css";


function PregnantHomePage({user}){
  dotWave.register();

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        <div>
          <Welcome user={user}></Welcome>
          <div>
            <div className={styles.topContainer}>
              <Journal conceptionDate={user.conceptionDate} weight={user.weight}/>
              <Forums/>
            </div>
            <RecommendedResources/>
            <RecommendedVideos/>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PregnantHomePage;