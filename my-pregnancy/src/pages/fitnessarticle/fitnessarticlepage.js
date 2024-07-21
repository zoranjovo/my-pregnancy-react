import { useParams } from "react-router-dom";
import FitnessArticle from "./fitnessarticle.js";

import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function FitnessArticlePage(){
  const { id } = useParams();
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <FitnessArticle id={id}></FitnessArticle>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default FitnessArticlePage;