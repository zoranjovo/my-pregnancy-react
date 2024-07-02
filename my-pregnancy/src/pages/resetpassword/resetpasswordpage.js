import { useNavigate } from "react-router-dom";

import Footer from "../../global-components/footer/footer";
import AskForEmail from './AskForEmail.js';

import styles from './resetpasswordpage.module.css';


function ResetPasswordPage(){
    const navigate = useNavigate();
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                {/* <Navbar></Navbar> */}
                <div className={styles.page}>
                    <img className={styles.img} src="/assets/e51564f6e1c60c926aff35d378d5aa12.jpg" alt="holding belly"></img>
                    <div className={`${styles.resetpasswordpane} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
                        
                        <AskForEmail></AskForEmail>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <button
                            onClick={() => navigate('/login')}
                            className={`${styles.pinkyText} ${styles.pinkyTextHover} font-semibold leading-6`}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default ResetPasswordPage;