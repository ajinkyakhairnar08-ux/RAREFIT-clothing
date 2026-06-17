import React from 'react';
import './PreHeader.css';

const PreHeader = () => {
  return (
    <div className="preheader">
      <div className="marquee-container">
        <div className="marquee-content">
          <span>RAREFIT PREMIUM - FREE SHIPPING ON ORDERS OVER ₹2000</span>
          <span className="dot">•</span>
          <span>NEW COLLECTION LIVE NOW</span>
          <span className="dot">•</span>
          <span>10% OFF YOUR FIRST ORDER WITH CODE: RARE10</span>
          <span className="dot">•</span>
          <span>RAREFIT PREMIUM - FREE SHIPPING ON ORDERS OVER ₹2000</span>
          <span className="dot">•</span>
          <span>NEW COLLECTION LIVE NOW</span>
          <span className="dot">•</span>
          <span>10% OFF YOUR FIRST ORDER WITH CODE: RARE10</span>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
