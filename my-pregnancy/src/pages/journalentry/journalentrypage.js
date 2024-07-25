import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js";

import JournalEntry from "./journalentry.js";

function JournalEntryPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <JournalEntry></JournalEntry>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default JournalEntryPage;