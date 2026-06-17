import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import './Cart.css';

const Cart = () => {
  const cart = useCartStore(state => state.cart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const getCartTotal = useCartStore(state => state.getCartTotal);
  const navigate = useNavigate();

  const total = getCartTotal(useCartStore.getState());

  if (cart.length === 0) {
    return (
      <div className="cart-page container empty-cart">
        <SEO title="Your Shopping Cart | RareFit" description="Your shopping cart is currently empty." url="https://rarefit-ecommerce.com/cart" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <SEO title="Your Shopping Cart | RareFit" description="Review the items in your cart and proceed to secure checkout." url="https://rarefit-ecommerce.com/cart" />
      <h1 className="section-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image-container">
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                  <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
