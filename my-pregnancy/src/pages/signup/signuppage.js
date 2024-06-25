import Footer from "../../global-components/footer/footer";
//import Navbar from "../../global-components/navbar1/navbar1.js"

import SignUpPane from './signuppane.js'

import styles from './signuppage.module.css'

function SignUpPage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                {/* <Navbar></Navbar> */}
                <div className={styles.page}>
                    <img className={styles.img} src="/assets/e51564f6e1c60c926aff35d378d5aa12.jpg" alt="holding belly"></img>
                    <div className={styles.signuppane}>
                        <SignUpPane></SignUpPane>
                    </div>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default SignUpPage;