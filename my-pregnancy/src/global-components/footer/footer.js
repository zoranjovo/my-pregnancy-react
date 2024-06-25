import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './footer.module.css';

import facebook from './icons/facebook.webp';
import instagram from './icons/instagram.png';
import youtube from './icons/youtube.webp';
import tiktok from './icons/tiktok.png';
import x from './icons/x.png';

function Footer() {
    const navigate = useNavigate();

    return (
        <div className={styles.footer}>
            <img src='/assets/2cae6e388b1178750bf25ff6f2d6b28c.png' alt='logo' />
            <div className={styles.links}>
                <h1>Quick Links</h1>
                <ul>
                    <li><button onClick={() => navigate('/about')} className={styles.textButton}>About Us</button></li>
                    <li><button onClick={() => navigate('/privacypolicy')} className={styles.textButton}>Privacy Policy</button></li>
                    <li><button onClick={() => navigate('/faq')} className={styles.textButton}>FAQ</button></li>
                    <li><button onClick={() => navigate('/contact')} className={styles.textButton}>Contact Us</button></li>
                    <li><button onClick={() => navigate('/createaccount')} className={styles.textButton}>Join Now!</button></li>
                </ul>
            </div>
            <div className={styles.socials}>
                <h1>Follow us on</h1>
                <div className={styles.icons}>
                    <a href='https://facebook.com'><img src={facebook} alt='facebook' /></a>
                    <a href='https://instagram.com'><img src={instagram} alt='instagram' /></a>
                    <a href='https://youtube.com'><img src={youtube} alt='youtube' /></a>
                    <a href='https://tiktok.com'><img src={tiktok} alt='tiktok' /></a>
                    <a href='https://x.com'><img src={x} alt='x' /></a>
                </div>
                <div className={styles.info}>
                    <h3>Wollongong, New South Wales - 2500</h3>
                    <h3>support@prega.com.au</h3>
                </div>
            </div>
        </div>
    );
}

export default Footer;
