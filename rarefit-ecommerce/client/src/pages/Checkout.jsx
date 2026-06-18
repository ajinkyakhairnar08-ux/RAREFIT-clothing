import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import './Checkout.css';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const navigate = useNavigate();
  
  // Get cart data to pass to payment
  const cartTotal = useCartStore(state => state.getCartTotal(state));
  // If free shipping, total is just cartTotal
  const finalTotal = cartTotal;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const form = e.target;
    const formData = new FormData(form);
    const shippingData = Object.fromEntries(formData.entries());

    // Redirect to the dedicated payment page after a short delay
    setTimeout(() => {
      navigate('/payment', { 
        state: { 
          shippingData, 
          paymentMethod,
          totalAmount: finalTotal
        } 
      });
    }, 500);
  };

  // If cart is empty, redirect back to shop
  if (cartTotal === 0) {
    return (
      <div className="checkout-page container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Your cart is empty</h2>
          <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/shop')}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-container glass">
          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>Shipping Information</h3>
            <div className="form-group">
              <input type="text" name="fullName" placeholder="Full Name" required className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" required className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" name="address" placeholder="Address" required className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="city" placeholder="City" required className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" name="postalCode" placeholder="Postal Code" required className="form-input" />
              </div>
            </div>

            <h3 className="payment-heading" style={{ marginTop: '2rem' }}>Payment Method</h3>
            
            <div className="payment-options" style={{ marginBottom: '2rem' }}>
              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '10px', cursor: 'pointer', background: paymentMethod === 'upi' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')}
                  style={{ cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>Pay via UPI / QR Code</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Google Pay, PhonePe, Paytm</div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', cursor: 'pointer', background: paymentMethod === 'cod' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                  style={{ cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Pay when your order arrives</div>
                </div>
              </label>
            </div>
            
            <button type="submit" className="btn-primary place-order-btn" disabled={isProcessing} style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
              {isProcessing ? 'Processing...' : 'Continue to Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
