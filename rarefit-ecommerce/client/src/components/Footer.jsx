import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <span className="logo-rare">RARE</span>
            <span className="logo-fit">FIT</span>
          </Link>
          <p className="footer-tagline">
            At RareFit, we bring you highly curated, modern aesthetic apparel designed to effortlessly elevate your everyday vibe. Shop with confidence knowing every piece is backed by our commitment to premium quality, secure checkout, and a completely hassle-free customer experience.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=T-Shirts">T-Shirts</Link></li>
              <li><Link to="/shop?category=Outerwear">Outerwear</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/return-policy">Return & Refund Policy</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RareFit. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#000', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Proudly Made in India <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" style={{ width: '18px', height: '12px', borderRadius: '2px' }} />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
