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

    // Masked downward reveal for all text elements
    const revealTexts = gsap.utils.toArray('.reveal-text');
    revealTexts.forEach((text) => {
      const isFast = text.classList.contains('fast-reveal');
      gsap.fromTo(text,
        { y: "120%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: isFast ? 0.6 : 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: text.parentElement, // Trigger from the mask wrapper
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [featuredProducts]); // Re-run when products load so layout is ready

  // CAROUSEL LOGIC
  const carouselData = [
    { src: "/ai-urban-1.png", caption: "MOODY AESTHETICS" },
    { src: "/ai-urban-2.png", caption: "NEON NIGHTS" },
    { src: "/ai-urban-3.png", caption: "STREET READY" },
    { src: "/ai-urban-4.png", caption: "TECHWEAR" },
    { src: "/ai-urban-5.png", caption: "TRENCH COAT" },
    { src: "/ai-urban-6.png", caption: "PUDDLE JUMPS" },
    { src: "/ai-urban-7.png", caption: "UNDERPASS" },
  ];

  // CARD STACK LOGIC
  const lookbookCards = [
    "/ai-clothes-1.png",
    "/ai-clothes-2.png",
    "/ai-clothes-3.png",
    "/ai-clothes-4.png",
    "/watches.png",
    "/caps.png",
  ];
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % lookbookCards.length);
    }, 2500); // cycle every 2.5s
    return () => clearInterval(cardTimer);
  }, []);

  // CORE IDENTITY CAROUSEL LOGIC
  const coreImages = [
    "/ai-core.png",
    "/ai-core-1.png",
    "/ai-core-2.png",
    "/ai-core-3.png",
    "/ai-core-4.png",
  ];
  const [activeCore, setActiveCore] = useState(0);

  useEffect(() => {
    const coreTimer = setInterval(() => {
      setActiveCore((prev) => (prev + 1) % coreImages.length);
    }, 4500); // cycle every 4.5s
    return () => clearInterval(coreTimer);
  }, []);

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

          <div className="reveal-mask">
            <h1 className="hero-title reveal-text fast-reveal">REDEFINE YOUR REALITY.</h1>
          </div>
          <div className="reveal-mask">
            <p className="hero-subtitle reveal-text">Premium essentials designed for the modern aesthetic.</p>
          </div>
          <div className="reveal-mask mt-4">
            <div className="hero-actions reveal-text fast-reveal">
              <Link to="/shop" className="btn-primary">Shop Collection</Link>
              <Link to="/shop?category=New" className="btn-outline">View Lookbook</Link>
            </div>
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
          <div className="reveal-mask">
            <h2 className="section-title reveal-text fast-reveal">The Collection</h2>
          </div>
          <div className="categories-grid">
            <Link to="/shop?category=Shirts" className="category-card" style={{ backgroundImage: "url('/shirts.png')" }}>
              <div className="cat-overlay"></div>
              <h3>Shirts</h3>
            </Link>
            <Link to="/shop?category=Pants" className="category-card" style={{ backgroundImage: "url('/pants.png')" }}>
              <div className="cat-overlay"></div>
              <h3>Bottoms</h3>
            </Link>
            <Link to="/shop?category=Shoes" className="category-card" style={{ backgroundImage: "url('/shoes.png')" }}>
              <div className="cat-overlay"></div>
              <h3>Footwear</h3>
            </Link>
            <Link to="/shop?category=Sunglasses" className="category-card" style={{ backgroundImage: "url('/sunglasses.png')" }}>
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
            <div className="reveal-mask">
              <h2 className="section-title reveal-text fast-reveal">Latest Drops</h2>
            </div>
            <div className="reveal-mask">
              <Link to="/shop" className="view-all-link reveal-text fast-reveal" style={{ display: 'inline-block' }}>View All Products</Link>
            </div>
          </div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Lookbook Gallery (Playing Card Effect) */}
      <section className="home-section lookbook-section" ref={addToRefs}>
        <div className="container lookbook-container">
          <div className="lookbook-text">
            <div className="reveal-mask">
              <h2 className="section-title reveal-text fast-reveal">Aesthetic GenZ</h2>
            </div>
            <div className="reveal-mask">
              <p className="reveal-text">Embrace the oversized, the baggy, and the minimal. Our new collection is designed to push boundaries while maintaining extreme comfort.</p>
            </div>
            <div className="reveal-mask mt-4">
              <Link to="/shop" className="btn-outline reveal-text fast-reveal" style={{ display: 'inline-block' }}>Explore Style</Link>
            </div>
          </div>
          <div className="lookbook-images card-stack-container" onClick={() => setActiveCard((prev) => (prev + 1) % lookbookCards.length)}>
            {lookbookCards.map((src, index) => {
              const offset = (index - activeCard + lookbookCards.length) % lookbookCards.length;
              const isVisible = offset < 4; // Show top 4 cards
              const isJustThrown = offset === lookbookCards.length - 1; // The card that just moved to the back

              return (
                <img
                  key={index}
                  src={src}
                  alt={`Lookbook Item ${index}`}
                  className={`lb-card ${isJustThrown ? 'lb-card-throw' : ''}`}
                  style={!isJustThrown ? {
                    transform: `translateZ(${-offset * 70}px) translateY(${offset * 30}px) translateX(${offset * 30}px)`,
                    zIndex: lookbookCards.length - offset,
                    opacity: isVisible ? 1 - (offset * 0.2) : 0,
                    pointerEvents: offset === 0 ? 'auto' : 'none'
                  } : {
                    zIndex: lookbookCards.length + 1 // Keep it above others while throwing
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Core Identity (Split Screen Parallax) */}
      <section className="home-section split-screen-section" ref={addToRefs}>
        <div className="split-left">
          <div className="core-carousel-container">
            {coreImages.map((src, idx) => {
              let className = "core-carousel-img ";
              if (idx === activeCore) {
                className += "active";
              } else if (idx === (activeCore - 1 + coreImages.length) % coreImages.length) {
                className += "leaving";
              } else {
                className += "waiting";
              }
              return (
                <img
                  key={idx}
                  src={src}
                  alt={`Core Identity ${idx}`}
                  className={className}
                />
              );
            })}
          </div>
        </div>
        <div className="split-right">
          <div className="split-content">
            <div className="reveal-mask">
              <h2 className="reveal-text">THE CORE IDENTITY.</h2>
            </div>
            <div className="reveal-mask">
              <p className="reveal-text">Born from concrete streets. We redefine oversized minimalism by stripping away the unnecessary and leaving only the essential silhouette.</p>
            </div>
            <div className="reveal-mask mt-4">
              <Link to="/shop" className="btn-primary reveal-text fast-reveal" style={{ display: 'inline-block' }}>Discover Core</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Uncompromising Quality (Full-Width Cinematic) */}
      <section className="home-section quality-section" ref={addToRefs}>
        <div className="quality-bg faux-video-container-wide">
          <img src="/ai-fabric.png" alt="Premium Fabric" className="faux-video-img-pan" />
        </div>
        <div className="quality-overlay">
          <div className="glass-card">
            <div className="reveal-mask">
              <h3 className="reveal-text fast-reveal">UNCOMPROMISING QUALITY</h3>
            </div>
            <div className="reveal-mask">
              <p className="reveal-text">Every thread is meticulously sourced to provide a heavy, draped fit that feels luxurious yet invincible on the streets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Urban Exploration (Continuous Marquee) */}
      <section className="home-section carousel-section" ref={addToRefs}>
        <div className="container">
          <div className="carousel-header">
            <div className="reveal-mask">
              <h2 className="section-title reveal-text fast-reveal">Urban Exploration</h2>
            </div>
          </div>

          <div className="carousel-viewport marquee-viewport">
            <div className="carousel-track marquee-track">
              {/* Render items twice for seamless infinite scrolling */}
              {[...carouselData, ...carouselData].map((item, index) => (
                <div className="gallery-item" key={index}>
                  <img src={item.src} alt={item.caption} />
                  <div className="gallery-caption">{item.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Story & Newsletter */}
      <section className="home-section story-section" ref={addToRefs}>
        <div className="container story-wrapper glass">
          <div className="story-content">
            <div className="reveal-mask">
              <h2 className="section-title reveal-text">The RareFit Philosophy</h2>
            </div>
            <div className="reveal-mask">
              <p className="story-text reveal-text">We believe in minimalism, quality, and aesthetics that stand out without screaming for attention. Our pieces are crafted to be the foundation of a versatile, modern wardrobe.</p>
            </div>
          </div>
          <div className="newsletter-box">
            <div className="reveal-mask">
              <h3 className="reveal-text fast-reveal">Join the Cult</h3>
            </div>
            <div className="reveal-mask">
              <p className="reveal-text">Subscribe for exclusive access to drops and secret sales.</p>
            </div>
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
