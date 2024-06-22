import styles from './navbar2.module.css'
import { Link } from 'react-router-dom';

function Navbar(){

    return (
        <div className={styles['navbar-fake']}>
            <nav className={styles.navbar}>
                <Link to="/home" className={styles['navbar-link']}>
                    <h1 className={styles['navbar-button']}>Dashboard</h1>
                </Link>
                <Link to="/consultation" className={styles['navbar-link']}>
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
        </div>
        
    )
}

export default Navbar;