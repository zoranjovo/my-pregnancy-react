import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar1/navbar1.js"

function PrivacyPolicyPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <h1>privacy policy page</h1>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default PrivacyPolicyPage;