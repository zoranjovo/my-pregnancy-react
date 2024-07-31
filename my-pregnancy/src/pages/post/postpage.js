import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

import PostHome from "./posthome.js";

function PostPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <PostHome></PostHome>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default PostPage;
