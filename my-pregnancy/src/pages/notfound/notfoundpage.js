import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar1/navbar1.js";
import button from '../../css/buttons.module.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(){
  const navigate = useNavigate();

  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div className={`flex items-center justify-center`} style={{marginTop: "100px"}}>
          <div>
            <h1 className="text-3xl text-blue">404 Page Not Found</h1>
            <div className={`flex items-center justify-center`} style={{marginTop: "10px"}}>
              <button className={button.stylisedBtn} style={{width: "100px"}} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default NotFoundPage;