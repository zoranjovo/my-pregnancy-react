//TODO once api set up make it redirect to login if no/invalid token is stored

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line
import { loggedOutRedirect } from '../../util/auth.js';

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function AccountPage(){
  // eslint-disable-next-line
  const navigate = useNavigate();
  useEffect(() => {
    // uncomment below once api set up + remove the eslint comments
    //if(loggedOutRedirect){navigate('/login');}
  })
  
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <h1>account</h1>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default AccountPage;