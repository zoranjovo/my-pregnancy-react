import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";
import { dotWave } from "ldrs";
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import { clearToken } from "../../util/auth.js";

import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js"

import Welcome from "./components/welcome/welcome.js";
import Journal from "./components/journal/journal.js";
import Forums from "./components/forums/forums.js";
import Recommended from "./components/recommended/pregnantrecommended.js";

import styles from "./pregnanthome.module.css";


function PregnantHomePage({user}){
  dotWave.register();

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar/>
        <div>
          <Welcome user={user}></Welcome>
          <div>
            <div className={styles.journalAndForums}>
              <Journal currentDay={user.pregnancyMonth} nextCycle={user.pregnancyMonth} weight={user.weight} currentStage={user.pregnancyMonth}/>
              <Forums/>
            </div>
            <Recommended/>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PregnantHomePage;