import Navbar from './navbar.js';
import Footer from '../../global-components/footer/footer.js';

import './startuppage.css';

function StartupPage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                <Navbar></Navbar>
                <div className='section1'>
                    <img src="assets/55382be23503e70e125f92dc3a1b85ba.png" className='woman' alt='woman logo'></img>
                    <div className='circle1'></div>
                    <h1 className='text1'>My Pregnancy, the ... (someone put some words here)</h1>
                    <div className='join-box'>
                        <h1 className='text2'>Join us today!</h1>
                        <input className='email-input' placeholder='Email'></input>
                        <button className='signup-btn'>Sign up</button>
                    </div>
                    <h1 className='text3'>Your trusted community for support, sharing, and knowledge during pregnancy.</h1>
                </div>

                <div className='section2'>
                    <div className='s2box'>
                        <div className='circle2'>
                            <div className='circle3'></div>
                        </div>
                        <div className='reviews'>
                            <h1 className='text4'>Testimonials</h1>
                            <div className='review'>
                                <img src='/assets/352a532df20df236f383036861cfd6a2.png' alt='review1'></img>
                                <div className='review-details'>
                                    <h1 className='review-txt'>Love the community!</h1>
                                    <h1 className='review-stars'>★★★★★</h1>
                                </div>
                            </div>
                            <div className='review'>
                                <img src='/assets/2154d24d02286926b6e1b308e5640639.png' alt='review2'></img>
                                <div className='review-details'>
                                    <h1 className='review-txt'>One of the best platforms</h1>
                                    <h1 className='review-stars'>★★★★★</h1>
                                </div>
                            </div>
                        </div>
                        <div className='points'>
                            <ul>
                                <li>Pregnancy Guides</li>
                                <li>Nutrition Tips</li>
                                <li>Exercise Plans</li>
                                <li>Mental Health Support</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='section3'>
                    <div className='join-box2'>
                        <h1 className='text2'>Join us today!</h1>
                        <input className='email-input' placeholder='Email'></input>
                        <button className='signup-btn'>Sign up</button>
                    </div>
                </div>
            </div>
            
            
            <Footer></Footer>
        </div>
        
    )
}

export default StartupPage;