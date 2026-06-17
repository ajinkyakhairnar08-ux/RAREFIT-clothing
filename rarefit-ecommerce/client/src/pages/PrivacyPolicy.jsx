import React from 'react';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page container">
      <h1 className="legal-title">Privacy Policy</h1>
      <div className="legal-content">
        <p>This Privacy Policy describes how RareFit collects, uses, and protects your personal information when you visit or make a purchase from our store.</p>
        
        <h2>Information We Collect</h2>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.</p>
        <p>Additionally, when you make a purchase or attempt to make a purchase, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers or UPI IDs), email address, and phone number.</p>

        <h2>How We Use Information</h2>
        <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this information to communicate with you, screen our orders for potential risk or fraud, and, when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

        <h2>Cookies</h2>
        <p>We use "cookies" to recognize your device, gather data on site traffic, and improve your shopping experience. You can choose to disable cookies through your browser settings, though this may affect your ability to use certain features of our store.</p>

        <h2>Third-Party Services</h2>
        <p>We share your Personal Information with third parties to help us operate our store. For example, we use Shopify to power our online store. We also use secure payment gateways (such as Razorpay, PayU, or Stripe) to process transactions safely. We may also use Google Analytics to help us understand how our customers use the Site.</p>

        <h2>Data Security</h2>
        <p>We take reasonable precautions and follow industry best practices to make sure your personal information is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed. Your payment data is encrypted in accordance with PCI-DSS standards.</p>

        <h2>Customer Rights</h2>
        <p>If you are an Indian resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us using the contact information below.</p>

        <h2>Contact Information</h2>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:support@rarefit.com">support@rarefit.com</a> or by mail using the details provided below:</p>
        <p>
          RareFit<br />
          Indira Nagar, Nashik<br />
          Maharashtra, India
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
