import React from 'react';
import styles from './hamburger.module.css';

function Hamburger({ opened, onClick }) {
    return (
        <div className={`${styles['hamburgericon']} ${opened ? styles.open : ''}`} onClick={onClick}>
            <div className={styles.hamburgerline}></div>
            <div className={styles.hamburgerline}></div>
            <div className={styles.hamburgerline}></div>
        </div>
    );
}

export default Hamburger;
