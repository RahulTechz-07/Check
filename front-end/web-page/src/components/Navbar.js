// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import aameclogo from '../images/aamec_logo.png';
import naac from '../images/naac.png';
import nba from '../images/NBA.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* Left: Logos */}
<div className="navbar-left">
  <img src={aameclogo} width="60" alt="AAMEC" className="logo aamec" />
  <img src={naac} width="60" alt="NAAC" className="logo naac" />
  <img src={nba} width="60" alt="NBA" className="logo nba" />
</div>


      {/* Center: Title */}
      <div className="navbar-logo">
        <h1>AAMEC - IT Symposium</h1>
      </div>

      {/* Mobile menu toggle button */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Right: Links */}
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li onClick={closeMenu}><Link to="/">Home</Link></li>
        <li onClick={closeMenu}><Link to="/events">Events</Link></li>
        <li onClick={closeMenu}><Link to="/register">Register</Link></li>
        <li onClick={closeMenu}><Link to="/contact">Contact</Link></li>
        <li onClick={closeMenu}><Link to="/admin/login">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
