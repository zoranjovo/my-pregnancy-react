import { useEffect, useState } from "react";
import { getUser } from "../../util/apireq.js";
import { serverErrorNotif, customWarningNotif } from '../../global-components/notify';
import { clearToken } from "../../util/auth.js";


import PregnantHome from "./pregnanthome.js";
import DoctorHome from "./doctorhome.js";


function HomePageHandler(){
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUser(response.data);
        return;
      } else if(response.response.status === 404 || response.response.status === 401){
        clearToken();
        return customWarningNotif("Please sign in again");
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
    }
    fetchUser();
  }, []);

  return (
    user.role === "pregnant" ? (
      <PregnantHome user={user}></PregnantHome>
    ) : user.role === "doctor" ? (
      <DoctorHome user={user}></DoctorHome>
    ) : (
      <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
        <l-dot-wave size="47" speed="1"  color="#f06292" data-testid="loading-indicator"></l-dot-wave>
      </div>
    )
  );
}

export default HomePageHandler;