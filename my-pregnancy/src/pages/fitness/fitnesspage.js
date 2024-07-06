import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

import FitnessHome from "./fitnesshome.js";

function FitnessPage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                <Navbar></Navbar>
                <FitnessHome></FitnessHome>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default FitnessPage;