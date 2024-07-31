import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

import Consultation from "./consultation.js";

function ConsultationPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <Consultation></Consultation>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ConsultationPage;
