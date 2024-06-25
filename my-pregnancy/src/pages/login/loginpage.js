import Footer from "../../global-components/footer/footer";
//import Navbar from "../../global-components/navbar1/navbar1.js"

import LoginPane from './loginpane.js'

import styles from './loginpage.module.css'

function LoginPage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                {/* <Navbar></Navbar> */}
                <div className={styles.page}>
                    <img className={styles.img} src="/assets/e51564f6e1c60c926aff35d378d5aa12.jpg" alt="holding belly"></img>
                    <div className={styles.loginpane}>
                        <LoginPane></LoginPane>
                    </div>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;