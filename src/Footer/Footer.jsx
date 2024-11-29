import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss'


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="footer-text">© 2024 MoodGify. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
