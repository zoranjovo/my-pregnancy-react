import './footer.css'

import facebook from './icons/facebook.webp'
import instagram from './icons/instagram.png'
import youtube from './icons/youtube.webp'
import tiktok from './icons/tiktok.png'
import x from './icons/x.png'

function Footer(){

    return (
        <div className="footer">
            <img src='/assets/2cae6e388b1178750bf25ff6f2d6b28c.png' alt='logo'></img>
            <div className='links'>
                <h1>Quick Links</h1>
                <ul>
                    <a href='/about'><li>About Us</li></a>
                    <a href='/privacypolicy'><li>Privacy Policy</li></a>
                    <a href='/faq'><li>FAQ</li></a>
                    <a href='/contact'><li>Contact Us</li></a>
                    <a href='/createaccount'><li>Join Now!</li></a>
                </ul>
            </div>
            <div className='socials'>
                <h1>Follow us on</h1>
                <div className='icons'>
                    <a href='https://facebook.com'><img src={facebook} alt='facebook'></img></a>
                    <a href='https://instagram.com'><img src={instagram} alt='instagram'></img></a>
                    <a href='https://youtube.com'><img src={youtube} alt='youtube'></img></a>
                    <a href='https://tiktok.com'><img src={tiktok} alt='tiktok'></img></a>
                    <a href='https://x.com'><img src={x} alt='x'></img></a>
                </div>
                <div className='info'>
                    <h3>Wollongong, New South Wales - 2500</h3>
                    <h3>support@prega.com.au</h3>
                </div>
                
            </div>
        </div>
    )
}

export default Footer;