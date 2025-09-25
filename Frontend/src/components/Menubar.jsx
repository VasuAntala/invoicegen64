import { useEffect, useState } from 'react';
import Logo from './logo.jsx';
import { Link } from "react-router-dom";
import './Menubar.css';

const Manubar = () => {
    // Optionally: Manage username via state and JWT, else use localStorage directly
    
const handleNavClick = () => {
  const navbar = document.getElementById('navbarNav');
  if (navbar.classList.contains('show')) {
    navbar.classList.remove('show'); // This hides the collapsed menu
  }
};
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <Logo />
                    <span className="fw-bolder fs-4 mx-3" style={{ letterSpacing: '-0.5px', color: '#0D6EFDB2' }}>
                        InvoiceGen
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" // Match the collapsible div's id
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                
                >
                    <span className="navbar-toggler-icon" ></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/' onClick={handleNavClick}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/invoice' onClick={handleNavClick}>Generate</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/aboutus' onClick={handleNavClick}>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/contactus' onClick={handleNavClick}>Contact Us</Link>
                        </li>
                    </ul>
                    <div className="username ms-lg-3 mt-2 mt-lg-0" onClick={() => window.location.href = '/userprofile'} style={{ cursor: 'pointer' }}>
                        👤{localStorage.getItem('username') === null ? 'Guest' : localStorage.getItem('username')}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Manubar;
