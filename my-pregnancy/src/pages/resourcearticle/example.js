import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"

function ExampleArticle(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar></Navbar>
        <div style={{margin: '10px 20px'}}>
          <h1 className="text-3xl font-bold text-blue">Example Article</h1>
          <p>...</p>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default ExampleArticle;