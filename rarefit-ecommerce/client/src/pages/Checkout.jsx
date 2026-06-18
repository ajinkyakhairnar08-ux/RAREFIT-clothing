import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import './Checkout.css';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();
  
  // Get cart data to pass to payment
  const cartTotal = useCartStore(state => state.getCartTotal(state));
  // If free shipping, total is just cartTotal
  const finalTotal = cartTotal;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const exactLocation = addr.building || addr.amenity || addr.shop || addr.office || addr.house_name || '';
            const houseNum = addr.house_number ? addr.house_number + ', ' : '';
            const street = addr.road || addr.pedestrian || '';
            const area = addr.suburb || addr.neighbourhood || addr.residential || '';
            
            const fullAddressLine = [exactLocation, houseNum + street, area].filter(Boolean).join(', ');

            setAddress(fullAddressLine || data.display_name.split(',')[0]);
            setCity(addr.city || addr.town || addr.village || addr.county || '');
            setPostalCode(addr.postcode || '');
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          alert('Could not fetch address details automatically.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);
        alert('Unable to retrieve your location. Please allow location access in your browser settings.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

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
              <input type="tel" name="phone" placeholder="Phone Number" required className="form-input" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', marginTop: '1rem' }}>
              <label style={{ color: '#000', fontWeight: 'bold' }}>Delivery Address</label>
              <button type="button" onClick={handleGetLocation} disabled={isLocating} style={{ background: 'none', color: '#4f46e5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', padding: '0' }}>
                📍 {isLocating ? 'Locating...' : 'Use My Current Location'}
              </button>
            </div>
            
            <div className="form-group">
              <input type="text" name="address" placeholder="Address" required className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="city" placeholder="City" required className="form-input" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" name="postalCode" placeholder="Postal Code" required className="form-input" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>
            </div>

            <h3 className="payment-heading" style={{ marginTop: '2rem' }}>Payment Method</h3>
            
            <div className="payment-options" style={{ marginBottom: '2rem' }}>
              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '4px', marginBottom: '10px', cursor: 'pointer', background: paymentMethod === 'upi' ? 'rgba(0,0,0,0.05)' : 'transparent' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')}
                  style={{ cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600', color: '#000000' }}>Pay via UPI / QR Code</div>
                  <div style={{ fontSize: '0.8rem', color: '#555555' }}>Google Pay, PhonePe, Paytm</div>
                </div>
              </label>

              <label className={`payment-option`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '4px', cursor: 'not-allowed', background: 'transparent', opacity: 0.6 }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  disabled
                  style={{ cursor: 'not-allowed' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#000000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Cash on Delivery</span>
                    <span style={{ fontSize: '0.7rem', background: '#f87171', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>Currently Unavailable</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#555555' }}>Pay when your order arrives</div>
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
