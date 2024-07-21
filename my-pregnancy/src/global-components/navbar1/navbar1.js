import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar1.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src="/assets/logo.png" alt="Logo" className={styles['navbar-logo-shadow']}/>
      <div className={styles['navbar-left']}>
        <Link to="/home" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Home</h1>
        </Link>
        <Link to="/about" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>About</h1>
        </Link>
      </div>

      <img src="/assets/logo.png" alt="Logo" className={styles['navbar-logo']}/>
      
      <div className={styles['navbar-right']}>
        <Link to="/contact" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Contact</h1>
        </Link>
        <Link to="/login" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Login</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
