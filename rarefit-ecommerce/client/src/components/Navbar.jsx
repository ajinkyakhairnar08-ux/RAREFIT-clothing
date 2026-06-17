import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import './Navbar.css';

const Navbar = () => {
  const cartCount = useCartStore(state => state.getCartCount(state));

  return (
    <nav className="navbar right-side-nav">
      <div className="navbar-container">
        <div className="nav-top">
          <Link to="/" className="navbar-logo">
            <span className="logo-rare">R</span>
            <span className="logo-fit">F</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/shop" className="action-icon" title="Search">
            <Search size={24} />
          </Link>
          <Link to="/login" className="action-icon" title="Login">
            <User size={24} />
          </Link>
          <Link to="/cart" className="action-icon cart-icon-wrapper" title="Cart">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
