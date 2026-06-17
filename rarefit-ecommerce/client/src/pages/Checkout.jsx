import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import './Checkout.css';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const clearCart = useCartStore(state => state.clearCart);
  
  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="checkout-page container success-view">
        <div className="success-card">
          <h2>Order Confirmed!</h2>
          <p>Thank you for shopping at RareFit. Your order is being processed.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-container">
          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>Shipping Information</h3>
            <div className="form-group">
              <input type="text" placeholder="Full Name" required className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Address" required className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="City" required className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Postal Code" required className="form-input" />
              </div>
            </div>

            <h3 className="payment-heading">Payment Information</h3>
            <div className="form-group">
              <input type="text" placeholder="Card Number" required className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="MM/YY" required className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="CVC" required className="form-input" />
              </div>
            </div>
            
            <button type="submit" className="btn-primary place-order-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
