import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar1/navbar1.js"

function NotFoundPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <h1>404 not found</h1>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default NotFoundPage;