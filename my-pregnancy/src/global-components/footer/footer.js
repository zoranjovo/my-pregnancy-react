import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './footer.module.css';

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
                    <li><button onClick={() => navigate('/signup')} className={styles.textButton}>Join Now!</button></li>
                </ul>
            </div>
            <div className={styles.socials}>
                <h1>Follow us on</h1>
                <div className={styles.icons}>
                    <a href='https://www.facebook.com/profile.php?id=61565667462464&sk=about'><img src={`../assets/footer-icons/facebook.webp`} alt='facebook' /></a>
                    <a href='https://instagram.com'><img src={`../assets/footer-icons/instagram.webp`} alt='instagram' /></a>
                    <a href='https://linkedin.com'><img src={`../assets/footer-icons/linkedin.png`} alt='linkedin' /></a>
                    {/* <a href='https://youtube.com'><img src={`../assets/footer-icons/youtube.webp`} alt='youtube' /></a> */}
                    {/* <a href='https://tiktok.com'><img src={`../assets/footer-icons/tiktok.png`} alt='tiktok' /></a> */}
                    {/* <a href='https://x.com'><img src={`../assets/footer-icons/x.png`} alt='x' /></a> */}
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
