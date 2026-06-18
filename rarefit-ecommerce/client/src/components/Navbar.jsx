import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import './Navbar.css';

const Navbar = () => {
  const cartCount = useCartStore(state => state.getCartCount(state));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar right-side-nav">
      <div className="navbar-container">
        <div className="nav-top">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-rare">R</span>
            <span className="logo-fit">F</span>
          </Link>
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`nav-content ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/shop" className="nav-link" onClick={closeMenu}>Shop</Link>
            <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          </div>

          <div className="navbar-actions">
            <Link to="/shop" className="action-icon" title="Search" onClick={closeMenu}>
              <Search size={24} />
            </Link>
            <Link to="/login" className="action-icon" title="Login" onClick={closeMenu}>
              <User size={24} />
            </Link>
            <Link to="/cart" className="action-icon cart-icon-wrapper" title="Cart" onClick={closeMenu}>
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
