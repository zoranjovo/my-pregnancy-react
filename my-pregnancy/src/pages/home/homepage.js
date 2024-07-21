import Footer from "../../global-components/footer/footer.js";
import Navbar from "../../global-components/navbar2/navbar2.js"

function HomePage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <h1>home</h1>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default HomePage;