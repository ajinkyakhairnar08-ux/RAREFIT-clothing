import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';
import './Blogs.css';

gsap.registerPlugin(ScrollTrigger);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatToBlogDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return "";
  const [year, month, day] = yyyyMmDd.split('-');
  return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
};

const Blogs = () => {
  const containerRef = useRef(null);
  const [filterDate, setFilterDate] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    // Basic fade in animation for blog cards
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: i * 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [filterDate, visibleCount]); // Re-run animation if filter or count changes

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(9);
  }, [filterDate]);

  const formattedFilterDate = formatToBlogDate(filterDate);
  const filteredBlogs = filterDate 
    ? blogs.filter(b => b.date === formattedFilterDate)
    : blogs;

  return (
    <div className="blogs-page" ref={containerRef}>
      <SEO 
        title="RAREFIT | Blogs & Editorials" 
        description="Explore the latest in premium streetwear, oversized aesthetics, and urban fashion trends with RAREFIT's editorial blogs." 
      />
      
      <div className="blogs-header">
        <h1>EDITORIALS</h1>
        <p>Insights, trends, and the culture behind premium streetwear.</p>
        
        <div className="blog-filter-container">
          <label htmlFor="date-filter">Filter by Date:</label>
          <div className="filter-input-wrapper">
            <input 
              type="date" 
              id="date-filter"
              className="blog-date-input"
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)} 
            />
            {filterDate && (
              <button className="clear-filter-btn" onClick={() => setFilterDate("")}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="blogs-grid-container">
        <div className="blogs-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.slice(0, visibleCount).map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card">
              <div className="blog-image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-image" />
              </div>
              <div className="blog-content-wrapper">
                <div className="blog-meta">
                  <span className="blog-date">{blog.date}</span>
                  <span className="blog-author">{blog.author}</span>
                </div>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <span className="read-more">Read Article &rarr;</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-blogs-found">
            <p>No editorials found for this date.</p>
          </div>
        )}
        </div>
        
        {filteredBlogs.length > visibleCount && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setVisibleCount(prev => prev + 9)}
            >
              Load More Blogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
