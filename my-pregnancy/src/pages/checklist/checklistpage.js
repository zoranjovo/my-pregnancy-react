import Footer from "../../global-components/footer/footer";
import Navbar from "../../global-components/navbar2/navbar2.js"
import Checklist from './checklist';

function ChecklistPage(){
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 202px)'}}>
        <Navbar />
        <Checklist />
      </div>
      <Footer />
    </div>
  );
}


export default ChecklistPage;