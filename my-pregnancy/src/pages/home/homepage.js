import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";

import { dotWave } from "ldrs";

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js"

import Welcome from "./components/welcome/welcome.js";
import Journal from "./components/journal/journal.js";
import Forums from "./components/forums/forums.js";
import Recommended from "./components/recommended/recommended.js";

import styles from "./home.module.css";



const profile = {
  name: "Bianca",
  currentDay: "25",
  nextCycle: "6",
  weight: "67",
  currentStage: "Lutheal Phase"
}

function HomePage(){
  dotWave.register();

  const [user, setUser] = useState({});
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        console.log(userData.data)
        setUser(userData.data);
        setUserFound(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
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
            <div className={styles.journalAndForums}>
              <Journal currentDay={profile.currentDay} nextCycle={profile.nextCycle} weight={profile.weight} currentStage={profile.currentStage}/>
              <Forums/>
            </div>
            <Recommended/>
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <l-dot-wave
              size="47"
              speed="1" 
              color="#f06292" 
              data-testid="loading-indicator">
            </l-dot-wave>
          </div>
          
        )}
        
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default HomePage;