// client/src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // optional

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} IT Department, AAMEC College. All rights reserved.</p>
      <p>Contact us: itsympo@example.com | +91 98765 43210</p>
    </footer>
  );
};

export default Footer;
