// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional for custom styles
import aameclogo from '../images/aamec_logo.jpg';
import naac from '../images/naac.jpg';
import nba from '../images/NBA.png'

const Navbar = () => {
  return (
   <nav className="navbar">
  {/* Left: Logos */}
  <div className="navbar-left">
    <img src={aameclogo} width="60" alt="AAMEC" />
    <img src={naac} width="60" alt="NAAC" />
    <img src={nba} width="60" alt="NBA" />
  </div>

  {/* Center: Title */}
  <div className="navbar-logo">
    <h1>AAMEC - IT Symposium</h1>
  </div>

  {/* Right: Links */}
  <ul className="navbar-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/events">Events</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    <li><Link to="/admin/login">Admin</Link></li>
  </ul>
</nav>
  );
};

export default Navbar;
