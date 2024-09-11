import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FitnessVideo from '../../../fitness/fitnessvideo.js';

import styles from './recommended.module.css';

const vids = [
  { name: 'Relaxing stability ball workout', desc: 'Relax with this stability ball workout that combines gentle movements to relieve stress and improve flexibility and core strength.', url: 'uznqUmKBDVw', time: '20 min' },
  { name: 'Intense cardio session', desc: 'Boost your cardiovascular fitness with this high-energy cardio session, perfect for burning calories and improving stamina.', url: 'T6_cRgYN40s', time: '30 min' },
  { name: 'Yoga for beginners', desc: 'A gentle introduction to yoga, focusing on basic poses and techniques to improve flexibility, strength, and balance.', url: 'v7AYKMP6rOE', time: '15 min' },
  { name: 'Quick HIIT workout', desc: 'An effective HIIT workout that burns calories and builds muscle in just 10 minutes, perfect for busy schedules.', url: 'ml6cT4AZdqI', time: '10 min' },
  { name: 'Meditation guide', desc: 'A guide to mindfulness and meditation techniques to reduce stress, improve concentration, and promote mental well-being.', url: 'inpok4MKVLM', time: '25 min' },
  { name: 'Strength training basics', desc: 'Learn the basics of strength training with exercises like squats, lunges, and push-ups to build muscle and improve strength.', url: 'UItWltVZZmE', time: '35 min' },
  { name: 'Advanced pilates', desc: 'Challenge yourself with advanced pilates exercises designed to improve core strength, flexibility, and overall body control.', url: 'lCg_gh_fppI', time: '40 min' },
  { name: 'Dance workout', desc: 'Get fit with this energetic dance workout that combines high-energy dance moves with fitness routines to burn calories and improve coordination.', url: 'ZWk19OVon2k', time: '45 min' },
  { name: 'Full body stretch', desc: 'A relaxing full body stretch routine to relieve muscle tension and improve flexibility, perfect for winding down or starting your day.', url: '6p6Y4gfFTrA', time: '20 min' },
  { name: 'Running tips for beginners', desc: 'Learn essential running techniques, proper form, and tips to avoid injuries, perfect for new runners.', url: 'buJkZw9pBOY', time: '10 min' }
];

function Recommended(){
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(vids);
  }, []);

  return (
    <div className={styles.recommendedDiv}>
      <div className={styles.videos}>
        <div className={styles.videosHeader}>
          <h1>Workout videos recommended for you</h1>
          <Link to={`/fitness`}>
            <h1 style={{fontWeight: '700'}}>View More</h1>
          </Link>
        </div>
        
        <div className={styles.videosDiv}>
          {videos && videos.map((v, i) => (
            <div key={i}>
              <Link to={`/fitnessarticle/${v.url}`}>
                <FitnessVideo name={v.name} desc={v.desc} url={v.url} time={v.time} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Recommended;