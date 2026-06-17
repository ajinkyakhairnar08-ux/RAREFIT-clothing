import React from 'react';
import SEO from '../components/SEO';
import './LegalPage.css';

const AboutUs = () => {
  return (
    <div className="legal-page container">
      <SEO title="About Us | RareFit" description="Learn about the story, mission, and vision behind RareFit." url="https://rarefit-ecommerce.com/about" />
      <h1 className="legal-title">About Us</h1>
      <div className="legal-content">
        <p>Welcome to RareFit. Founded in 2026 by Ajinkya, we started with a clear vision: to bring modern, aesthetic, and high-quality fashion to a generation that values authenticity. We noticed a significant gap between high-end streetwear and accessible everyday fashion, and our goal became bridging that gap with effortless style.</p>
        
        <p>We believe that what you wear is a direct extension of your personal aura. That is why we meticulously curate and design every piece in our collection. From the initial concept to the final stitch, our focus remains on delivering clothing that not only looks incredible but feels premium to the touch. Our aesthetic is deeply inspired by modern minimalism, ensuring our pieces seamlessly integrate into your lifestyle.</p>
        
        <p>Beyond aesthetics, we are uncompromisingly dedicated to quality and customer service. At RareFit, building trust with our community is our highest priority. We promise a completely hassle-free shopping experience, secure transactions, and a customer support team that genuinely cares. When you shop with us, you aren't just buying a garment; you're investing in a brand that values your unique vibe as much as you do.</p>
      </div>
    </div>
  );
};

export default AboutUs;
