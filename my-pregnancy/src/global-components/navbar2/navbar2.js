import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Hamburger from './hamburger.jsx';
import styles from './navbar2.module.css'

function Navbar(){
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
      setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className={styles['navbar-fake']}>
      <nav className={`${styles.navbarbig}`}>
        <Link to="/home" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Dashboard</h1>
        </Link>
        <Link to="/consultation/manage" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Consultation</h1>
        </Link>
        <Link to="/resources" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Resources</h1>
        </Link>
        <Link to="/journal" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Journal</h1>
        </Link>
        <Link to="/forums" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Forums</h1>
        </Link>
        <Link to="/fitness" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Fitness</h1>
        </Link>
        <Link to="/account" className={`${styles['navbar-link']} ${styles['acc']}`}>
          <h1 className={styles['navbar-button']}>Account</h1>
        </Link>
      </nav>

      <nav className={`${styles.navbarsmall}`}>
        <Link to="/home" className={styles['navbar-link']}>
          <h1 className={styles['navbar-button']}>Dashboard</h1>
        </Link>
        <Link to="/account" className={`${styles['navbar-link']} ${styles['acc']}`}>
          <h1 className={styles['navbar-button']}>Account</h1>
        </Link>
        <Hamburger opened={hamburgerOpen} onClick={toggleHamburger}></Hamburger>
        <div className={`${styles.navbarsmallexpand}  ${hamburgerOpen ? '' : styles.open}`}>
          <Link to="/consultation/manage" className={styles['navbar-link-2']}>
            <h1 className={styles['navbar-button-2']}>Consultation</h1>
          </Link>
          <Link to="/resources" className={styles['navbar-link-2']}>
            <h1 className={styles['navbar-button-2']}>Resources</h1>
          </Link>
          <Link to="/journal" className={styles['navbar-link-2']}>
            <h1 className={styles['navbar-button-2']}>Journal</h1>
          </Link>
          <Link to="/forums" className={styles['navbar-link-2']}>
            <h1 className={styles['navbar-button-2']}>Forums</h1>
          </Link>
          <Link to="/fitness" className={styles['navbar-link-2']}>
            <h1 className={styles['navbar-button-2']}>Fitness</h1>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;