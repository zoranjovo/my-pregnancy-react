import React, { useRef, useEffect } from 'react';
// import emailjs from 'emailjs-com'; // Import EmailJS SDK
import { useNavigate } from 'react-router-dom';
import Footer from '../../global-components/footer/footer.js';
import styles from './startuppage2.module.css';
import { customWarningNotif, serverErrorNotif } from '../../global-components/notify.js';
import { getUser } from '../../util/apireq.js';
import { clearToken } from '../../util/auth.js';
import { Link } from 'react-router-dom';

function StartupPage2({userCache, setUserCache}){
  const navigate = useNavigate();
  const emailRef1 = useRef(null); // Reference for the email input

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(response.message === "Network Error"){ return serverErrorNotif(); }
      if(response.status === 200){
        setUserCache(response.data);
        return;
      } else if(response.response.status === 404 || response.response.status === 401){
        clearToken();
        return customWarningNotif("Please sign in again");
      } else if(response.response.status === 500){
        customWarningNotif("Server error");
      }
    }
    fetchUser();
  });

  // Function to send email via EmailJS and navigate to the signup page
  function directToSignup(e) {
    const email = emailRef1.current.value;
    if (!email || email === '') {
      customWarningNotif('Please enter a valid email address');
      //return;
    }

    // // EmailJS integration
    // const templateParams = {
    //   user_email: email, // This is the subscriber's email address
    // };

    // emailjs
    //   .send('service_rpu4pbs', 'template_2g0josh', templateParams, '5E3pd_BYtHpHpHHrc')
    //   .then(
    //     (response) => {
    //       console.log('SUCCESS!', response.status, response.text);
    //       setMessage({ text: 'Successfully subscribed!', type: 'success' });
    //     },
    //     (error) => {
    //       console.log('FAILED...', error);
    //       setMessage({ text: 'Subscription failed. Please try again.', type: 'error' });
    //     }
    //   );
    
    // Navigate to the signup page after successful submission
    if(email) {
      navigate(`/signup?email=${encodeURIComponent(email)}`);
    } else {
      navigate(`/signup`);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/assets/startup2/iStock-157526459.jpg" alt="Baby" className={styles.headerImg} />
        <div className={styles.headerText}>
          <h1>“From Bump to Baby with”<br />My Pregnancy...</h1>
          <p>Start your journey with us today!</p>
          { userCache !== null ? (
            <Link to='/home'>
              <button className={styles.joinButton}>Dashboard</button>
            </Link>
            
          ) : (
            <Link to='/signup'>
              <button className={styles.joinButton}>Join Now!</button>
            </Link>
          )}
          
        </div>
      </header>
      <section className={styles.approach}>
        <h2>Our Approach</h2>
        <p>
          Welcome to My Pregnancy, your comprehensive companion for a joyful and informed pregnancy journey.
          Our app provides personalized weekly updates, expert consultations, symptom tracking, health journaling, 
          and a supportive community forum. Tailored for expectant mothers, fathers-to-be, and healthcare professionals, 
          My Pregnancy equips you with essential tools, resources, and secure data management.
          Join us today to enhance your pregnancy experience with expert guidance, personalized care, and a supportive community.
        </p>
      </section>
      <section className={styles.journey}>
        <h2>Empowering Your Journey</h2>
        <p>
          At My Pregnancy, we believe every pregnancy is a unique and beautiful journey.
          Our app is designed to empower you with the knowledge, support, and tools you need to navigate this special time 
          with confidence and ease. From personalized health updates to expert consultations and a vibrant community, 
          we are here to support you every step of the way. Embrace your journey with My Pregnancy and experience the joy 
          of informed and supported motherhood.
        </p>
      </section>
      <section 
        className={styles.feedbackSection} 
        style={{ backgroundImage: 'url(/assets/startup2/jonathan-borba-5Goau2kMWXQ-unsplash.jpg)' }}
      >
        <div className={styles.feedback} style={{ top: '20px', left: '10%' }}>
          <img src="/assets/startup2/Feedback_user1.png" alt="User 1" />
          <p>One of the best platforms</p>
          <div className={styles.stars}>★★★★★</div>
        </div>
        <div className={styles.feedback} style={{ top: '150px', left: '30%' }}>
          <img src="/assets/startup2/feedback_user2.png" alt="User 2" />
          <p>One of the best platforms</p>
          <div className={styles.stars}>★★★★☆</div>
        </div>
        <div className={styles.feedback} style={{ top: '280px', left: '10%' }}>
          <img src="/assets/startup2/feedback_user3.jpeg" alt="User 3" />
          <p>One of the best platforms</p>
          <div className={styles.stars}>★★★★★</div>
        </div>
        <div className={styles.feedback} style={{ top: '410px', left: '30%' }}>
          <img src="/assets/startup2/Feedback_user1.png" alt="User 4" />
          <p>One of the best platforms</p>
          <div className={styles.stars}>★★★★☆</div>
        </div>
      </section>
      <div className={styles.loadMore} style={{ backgroundImage: 'url(/assets/startup2/jonathan-borba-5Goau2kMWXQ-unsplash.jpg)' }}>
        <button>Load more feedback...</button>
      </div>
      <div className={styles.subscribeSection} style={{ backgroundImage: 'url(/assets/startup2/jonathan-borba-5Goau2kMWXQ-unsplash.jpg)' }}>
        <div className={styles.subscribe}>
          <h2>Stay Updated with the Latest Pregnancy Tips and Advice</h2>
          <p>Join Our Growing Community of Expectant Parents, Health Care Professionals, Fitness Educators, and many more!</p>
          <form>
            <input type="email" placeholder="Enter your email address" ref={emailRef1} />
            <button type="button" onClick={directToSignup}>Subscribe</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StartupPage2;
