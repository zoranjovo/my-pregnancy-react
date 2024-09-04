//TODO once api set up make it redirect to login if no/invalid token is stored

import { useState, useEffect } from 'react';
import { getUser } from '../../util/apireq.js';

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function AccountPage(){
  
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      console.log(response);
      if(response.status === 200){
        setUser(response.data);
        setRole(response.data.role);
        return;
      } else if(response.status === 404){
        setErrorMsg("Account not found");
      } else if(response.status === 500){
        setErrorMsg("Server error");
      }
    }
    fetchUser();
  }, []);
  
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <h1>account</h1>
        <p>{user}{role}{errorMsg}</p>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default AccountPage;