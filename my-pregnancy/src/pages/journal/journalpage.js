import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";

import Journal from "./journal.js";

function JournalPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <Journal></Journal>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default JournalPage;