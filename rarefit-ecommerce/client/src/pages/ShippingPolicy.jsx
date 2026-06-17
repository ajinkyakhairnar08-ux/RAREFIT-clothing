import React from 'react';
import './LegalPage.css';

const ShippingPolicy = () => {
  return (
    <div className="legal-page container">
      <h1 className="legal-title">Shipping Policy</h1>
      <div className="legal-content">
        <h2>Order Processing Time</h2>
        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or public holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>

        <h2>Shipping Methods & Delivery Timeframes</h2>
        <ul>
          <li><strong>Standard Shipping:</strong> Estimated delivery within 3-5 business days.</li>
          <li><strong>Express Shipping:</strong> Estimated delivery within 1-2 business days.</li>
        </ul>

        <h2>Shipping Costs</h2>
        <p>Shipping charges for your order will be calculated and displayed at checkout. Currently, we offer standard shipping at Flat Rs. 50 or Free on orders above Rs. 999.</p>

        <h2>Tracking Information</h2>
        <p>You will receive a Shipment Confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours.</p>

        <h2>Delivery Issues and Delays</h2>
        <p>RareFit is not liable for any products delayed or lost during shipping due to courier issues or unforeseen circumstances. However, if your order is significantly delayed, please contact us at <a href="mailto:support@rarefit.com">support@rarefit.com</a>, and we will work with the shipping carrier to resolve the issue.</p>

        <h2>International Shipping</h2>
        <p>At this time, we only ship within India.</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
