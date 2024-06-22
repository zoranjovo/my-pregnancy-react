import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function ResourceArticlePage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                <Navbar></Navbar>
                <h1>resource article</h1>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default ResourceArticlePage;