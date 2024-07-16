import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../global-components/navbar1/navbar1.js';
import Footer from '../../global-components/footer/footer.js';

import buttons from '../../css/buttons.module.css';
import styles from './startuppage.module.css';

function StartupPage() {

    const navigate = useNavigate();
    const emailRef = useRef(null);
    function directToSignup() {
        const email = emailRef.current.value;
        if(!email || email === ''){
            navigate(`/signup`);
        } else {
            navigate(`/signup?email=${encodeURIComponent(email)}`);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            directToSignup();
        }
    }

    return (
        <div>
            <div style={{ minHeight: 'calc(100vh - 202px)' }}>
                <Navbar />
                <div className={styles.section1}>
                    <img src="assets/55382be23503e70e125f92dc3a1b85ba.png" className={styles.woman} alt='woman logo' />
                    <div className={styles.circle1}></div>
                    <h1 className={styles.text1}>My Pregnancy, the ... (someone put some words here)</h1>
                    <div className={styles.joinBox}>
                        <h1 className={styles.text2}>Join us today!</h1>
                        <input className={styles.emailInput} placeholder='Email' ref={emailRef} onKeyPress={handleKeyPress}/>
                        <button className={`${buttons.stylisedBtn} ${styles.signupBtn}`} onClick={directToSignup}>Sign up</button>
                    </div>
                    <h1 className={styles.text3}>Your trusted community for support, sharing, and knowledge during pregnancy.</h1>
                </div>

                <div className={styles.section2}>
                    <div className={styles.s2box}>
                        <div className={styles.circle2}>
                            <div className={styles.circle3}></div>
                        </div>
                        <div className={styles.reviews}>
                            <h1 className={styles.text4}>Testimonials</h1>
                            <div className={styles.review}>
                                <img src='/assets/352a532df20df236f383036861cfd6a2.png' alt='review1' />
                                <div className={styles.reviewDetails}>
                                    <h1 className={styles.reviewTxt}>Love the community!</h1>
                                    <h1 className={styles.reviewStars}>★★★★★</h1>
                                </div>
                            </div>
                            <div className={styles.review}>
                                <img src='/assets/2154d24d02286926b6e1b308e5640639.png' alt='review2' />
                                <div className={styles.reviewDetails}>
                                    <h1 className={styles.reviewTxt}>One of the best platforms</h1>
                                    <h1 className={styles.reviewStars}>★★★★★</h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.points}>
                            <ul>
                                <li>Pregnancy Guides</li>
                                <li>Nutrition Tips</li>
                                <li>Exercise Plans</li>
                                <li>Mental Health Support</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.section3}>
                    <div className={styles.joinBox2}>
                        <h1 className={styles.text2}>Join us today!</h1>
                        <input className={styles.emailInput} placeholder='Email' ref={emailRef} onKeyPress={handleKeyPress}/>
                        <button className={`${buttons.stylisedBtn} ${styles.signupBtn}`} onClick={directToSignup}>Sign up</button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default StartupPage;
