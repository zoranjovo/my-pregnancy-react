import Footer from "../../../global-components/footer/footer";
import Navbar from "../../../global-components/navbar2/navbar2.js";
import { Link } from 'react-router-dom';

import ConsultationBook from "./consultationbook.js";

function ConsultationPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div style={{margin: "10px"}}>
        <h1 className="text-2xl font-bold text-blue">Consultation<span style={{marginLeft: '20px'}}>New Booking</span></h1>
          <Link to={`/consultation/manage`}>
            <h2>← Back to Consultations</h2>
          </Link>
        </div>
        <ConsultationBook></ConsultationBook>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ConsultationPage;
