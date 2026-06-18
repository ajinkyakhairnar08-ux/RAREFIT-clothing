import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/ajinkyakhairnar007@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Lead from RareFit Contact Form!",
          _template: "table",
          Name: data.name,
          Email: data.email,
          "Inquiry Type": data.inquiry_type,
          Message: data.message
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {isSuccess ? (
            <div className="success-state" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Thanks!</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                Your message was submitted successfully. Our team will get back to you shortly.
              </p>
              <button 
                onClick={() => navigate('/')} 
                className="btn-primary" 
                style={{ padding: '12px 32px' }}
              >
                Go to Home Page
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="John Doe" disabled={isSubmitting} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="john@example.com" disabled={isSubmitting} />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="inquiry_type" disabled={isSubmitting}>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" required placeholder="How can we help you?" disabled={isSubmitting}></textarea>
              </div>
              
              <button type="submit" className="btn-primary" style={{width: '100%'}} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
