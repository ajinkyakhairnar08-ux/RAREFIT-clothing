import React from 'react';
import './LegalPage.css';

const ReturnPolicy = () => {
  return (
    <div className="legal-page container">
      <h1 className="legal-title">Return & Refund Policy</h1>
      <div className="legal-content">
        <h2>Return Eligibility Criteria</h2>
        <p>To be eligible for a return, your item must be unused, unworn, unwashed, and in the exact same condition that you received it. It must also be in the original packaging with all brand tags securely attached.</p>

        <h2>Return Timeframe</h2>
        <p>Our return policy lasts 7 days. If 7 days have gone by since your purchase was delivered, unfortunately, we cannot offer you a refund or exchange.</p>

        <h2>Refund Process and Timing</h2>
        <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>

        <h2>Exchange Options</h2>
        <p>We only replace items if they are defective, damaged, or if you received the wrong size. If you need to exchange it for the same item, send us an email at <a href="mailto:support@rarefit.com">support@rarefit.com</a>.</p>

        <h2>Damaged or Defective Products</h2>
        <p>If you receive a defective or damaged product, please contact us within 48 hours of delivery with photographic evidence of the issue. We will arrange a replacement or a full refund immediately at no extra cost to you.</p>

        <h2>Non-Returnable Items</h2>
        <p>Several types of goods are exempt from being returned, including:</p>
        <ul>
          <li>Innerwear and socks (for hygiene reasons)</li>
          <li>Gift cards</li>
          <li>Items purchased during final clearance sales</li>
          <li>Accessories (unless defective upon arrival)</li>
        </ul>

        <h2>Return Shipping Costs</h2>
        <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
