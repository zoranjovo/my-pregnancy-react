import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar(){

    return (
        <nav className="navbar">
            <img src="/assets/logo.png" alt="Logo" className="navbar-logo-shadow"/>
            <div className="navbar-left">
                <Link to="/home" className="navbar-link">
                    <h1 className="navbar-button">Home</h1>
                </Link>
                <Link to="/about" className="navbar-link">
                    <h1 className="navbar-button">About</h1>
                </Link>
            </div>

            <img src="/assets/logo.png" alt="Logo" className="navbar-logo"/>
            
            <div className="navbar-right">
                <Link to="/contact" className="navbar-link">
                    <h1 className="navbar-button">Contact</h1>
                </Link>
                <Link to="/login" className="navbar-link">
                    <h1 className="navbar-button">Login</h1>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;