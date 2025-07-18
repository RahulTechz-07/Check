// client/src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // optional

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} IT Department, AAMEC College. All rights reserved.</p>
      <p>Contact us: itechian2k25@example.com | +91 94860 67257</p>
    </footer>
  );
};

export default Footer;
