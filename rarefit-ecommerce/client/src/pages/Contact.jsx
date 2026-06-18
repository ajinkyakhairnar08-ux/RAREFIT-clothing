import React from 'react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page container">
      <SEO title="Contact Us | RareFit" description="Get in touch with the RareFit team for support, inquiries, or feedback." url="https://rarefit-ecommerce.com/contact" />
      <div className="contact-header">
        <h1 className="section-title">Get in Touch</h1>
        <p>Have a question or need styling advice? We're here for you.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-block">
            <h3>Customer Service</h3>
            <p>Email: support@rarefit.com</p>
            <p>Phone: +91 123 456 7890</p>
            <p>Hours: Mon-Fri 9am - 6pm</p>
          </div>
          
          <div className="info-block">
            <h3>Headquarters</h3>
            <p>RareFit Studios</p>
            <p>123 Aesthetic Avenue</p>
            <p>Mumbai, MH 400001</p>
          </div>
        </div>

        <div className="contact-form-container glass">
          <form className="contact-form" action="https://formsubmit.co/ajinkyakhairnar007@gmail.com" method="POST">
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Lead from RareFit Contact Form!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="inquiry_type">
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Product Information">Product Information</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required placeholder="How can we help you?"></textarea>
            </div>
            
            <button type="submit" className="btn-primary" style={{width: '100%'}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
