import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

import DiscussionHome from "./discussionhome.js";

function DiscussionPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <DiscussionHome></DiscussionHome>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default DiscussionPage;
