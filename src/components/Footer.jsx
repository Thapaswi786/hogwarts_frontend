import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <img src={logo} alt="Hogwarts University logo" className="footer-logo" />
        <span>© 2026 Hogwarts University — College Management Portal</span>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
