import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import useCartStore from '../store/useCartStore';
import { CheckCircle } from 'lucide-react';
import './Checkout.css'; // Reuse checkout styles

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useCartStore(state => state.clearCart);

  const { shippingData, paymentMethod, totalAmount } = location.state || {};

  const [utr, setUtr] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If no state is passed, redirect back to cart
  useEffect(() => {
    if (!shippingData || !totalAmount) {
      navigate('/cart');
    }

    // If COD, just process immediately
    if (paymentMethod === 'cod') {
      submitOrder('Cash on Delivery');
    }
  }, [shippingData, totalAmount, paymentMethod, navigate]);

  // UPI configuration
  const upiId = "8668834916@ybl"; // Defaulting to @ybl, can be changed later
  const payeeName = "RareFit";
  // The UPI intent URI format
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR`;

  const submitOrder = async (transactionId = 'COD') => {
    setIsVerifying(true);

    // Send order data via FormSubmit
    try {
      const response = await fetch("https://formsubmit.co/ajax/ajinkyakhairnar007@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Order! Rs. ${totalAmount}`,
          _template: "box",
          "Order Amount": `Rs. ${totalAmount}`,
          "Payment Method": paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
          "Transaction ID (UTR)": transactionId,
          "Customer Name": shippingData.fullName,
          "Customer Email": shippingData.email,
          "Shipping Address": `${shippingData.address}, ${shippingData.city}, ${shippingData.postalCode}`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        alert("There was an error processing your order. Please contact support.");
        setIsVerifying(false);
      }
    } catch (error) {
      alert("Network error. Please try again or contact support.");
      setIsVerifying(false);
    }
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (utr.length < 12) {
      alert("Please enter a valid 12-digit UTR/Transaction ID");
      return;
    }
    submitOrder(utr);
  };

  if (!shippingData) return null;

  if (isSuccess) {
    return (
      <div className="checkout-page container success-view">
        <div className="success-card glass" style={{ textAlign: 'center', padding: '3rem' }}>
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Order Confirmed!</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Thank you for shopping at RareFit. Your order has been placed successfully and your payment details have been sent for verification.
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  // If COD, it's already processing via useEffect
  if (paymentMethod === 'cod') {
    return (
      <div className="checkout-page container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Processing your COD order...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Complete Payment</h1>

      <div className="checkout-layout">
        <div className="checkout-form-container glass" style={{ textAlign: 'center', padding: '2rem', color: '#000' }}>
          <h3 style={{ marginBottom: '1rem', color: '#000' }}>Scan to Pay with any UPI App</h3>
          <p style={{ color: '#444', marginBottom: '2rem' }}>
            Open Google Pay, PhonePe, or Paytm and scan the QR code below to pay securely.
          </p>

          <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <QRCodeSVG value={upiUrl} size={200} />
          </div>

          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#000' }}>
            Amount to Pay: ₹{totalAmount.toFixed(2)}
          </div>

          <form onSubmit={handleUpiSubmit} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
            <div className="form-group">
              <label style={{ color: '#000', fontWeight: '600' }}>Enter 12-digit UTR / Reference Number</label>
              <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
                After paying, enter the 12-digit transaction ID found in your UPI app.
              </p>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 123456789012"
                value={utr}
                onChange={(e) => setUtr(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
                required
                minLength={12}
                maxLength={12}
              />
            </div>
            <button
              type="submit"
              className="btn-primary place-order-btn"
              style={{ width: '100%', padding: '15px' }}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Submit Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
