import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import heroVideo from '../videos/hero-section-video.mp4';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Fetch products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Just take the first 4 for featured
        setFeaturedProducts(data.slice(0, 4));
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger Stack Effect
    const sections = sectionsRef.current;
    
    sections.forEach((section, i) => {
      // Only pin the first and second sections (index 0 and 1)
      if (i === 0 || i === 1) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "bottom top",
          // Fade out completely so it doesn't show through subsequent sections
          animation: gsap.to(section, { opacity: 0, scale: 0.9, ease: "none" }),
          scrub: true
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [featuredProducts]); // Re-run when products load so layout is ready

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="home-page" ref={containerRef}>
      <SEO 
        title="RareFit | Premium Essentials - Home" 
        description="Discover the latest premium fashion essentials at RareFit. Shop our exclusive collection today." 
        url="https://rarefit-ecommerce.com/"
      />
      {/* 1. Hero Section */}
      <section className="home-section hero" ref={addToRefs}>
        <div className="hero-content">
          <div className="hero-main-logo">
            <svg width="80" height="60" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10 C42 10, 42 22, 50 22 C58 22, 50 30, 50 30" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M50 30 C35 30, 20 40, 15 50 C10 55, 15 60, 25 60 L45 60 L45 50" stroke="white" strokeWidth="5" strokeLinejoin="round" fill="none" />
              <path d="M50 30 C65 30, 80 40, 85 50 C90 55, 85 60, 75 60 L55 60 L55 50" stroke="white" strokeWidth="5" strokeLinejoin="round" fill="none" />
              <path d="M50 35 L52 41 L58 43 L52 45 L50 51 L48 45 L42 43 L48 41 Z" fill="#aaa" />
            </svg>
            <div className="hero-main-logo-text">
              <span className="text-white">RARE</span><span className="text-grey">FIT</span>
            </div>
          </div>
          
          <h1 className="hero-title">REDEFINE YOUR REALITY.</h1>
          <p className="hero-subtitle">Premium essentials designed for the modern aesthetic.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary">Shop Collection</Link>
            <Link to="/shop?category=New" className="btn-outline">View Lookbook</Link>
          </div>
        </div>
        <div className="hero-video-bg">
          <video src={heroVideo} autoPlay loop muted playsInline className="background-video" />
          <div className="gradient-overlay"></div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="home-section categories-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">The Collection</h2>
          <div className="categories-grid">
            <Link to="/shop?category=Shirts" className="category-card" style={{backgroundImage: "url('/shirts.png')"}}>
              <div className="cat-overlay"></div>
              <h3>Shirts</h3>
            </Link>
            <Link to="/shop?category=Pants" className="category-card" style={{backgroundImage: "url('/pants.png')"}}>
              <div className="cat-overlay"></div>
              <h3>Bottoms</h3>
            </Link>
            <Link to="/shop?category=Shoes" className="category-card" style={{backgroundImage: "url('/shoes.png')"}}>
              <div className="cat-overlay"></div>
              <h3>Footwear</h3>
            </Link>
            <Link to="/shop?category=Sunglasses" className="category-card" style={{backgroundImage: "url('/sunglasses.png')"}}>
              <div className="cat-overlay"></div>
              <h3>Accessories</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Best Sellers */}
      <section className="home-section featured-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Drops</h2>
            <Link to="/shop" className="view-all-link">View All Products</Link>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. Lookbook Gallery */}
      <section className="home-section lookbook-section" ref={addToRefs}>
        <div className="container lookbook-container">
          <div className="lookbook-text">
            <h2 className="section-title">Aesthetic GenZ</h2>
            <p>Embrace the oversized, the baggy, and the minimal. Our new collection is designed to push boundaries while maintaining extreme comfort.</p>
            <Link to="/shop" className="btn-outline mt-4">Explore Style</Link>
          </div>
          <div className="lookbook-images">
            <img src="/watches.png" alt="Lookbook 1" className="lb-img lb-img-1" />
            <img src="/caps.png" alt="Lookbook 2" className="lb-img lb-img-2" />
          </div>
        </div>
      </section>

      {/* 5. Brand Story & Newsletter */}
      <section className="home-section story-section" ref={addToRefs}>
        <div className="container story-wrapper glass">
          <div className="story-content">
            <h2 className="section-title">The RareFit Philosophy</h2>
            <p className="story-text">We believe in minimalism, quality, and aesthetics that stand out without screaming for attention. Our pieces are crafted to be the foundation of a versatile, modern wardrobe.</p>
          </div>
          <div className="newsletter-box">
            <h3>Join the Cult</h3>
            <p>Subscribe for exclusive access to drops and secret sales.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
