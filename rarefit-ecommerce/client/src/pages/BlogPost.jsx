import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="blog-post-not-found">
        <h2>Article Not Found</h2>
        <Link to="/blogs" className="back-link">&larr; Back to Editorials</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": [
      `https://rarefit-ecommerce.com${blog.image}`
    ],
    "datePublished": blog.date, // Assuming ISO 8601 or similar parsable date
    "author": [{
        "@type": "Person",
        "name": blog.author
    }]
  };

  return (
    <article className="blog-post-page">
      <SEO 
        title={`${blog.title} | RAREFIT Editorials`} 
        description={blog.excerpt} 
        image={`https://rarefit-ecommerce.com${blog.image}`}
        type="article"
        url={`https://rarefit-ecommerce.com/blog/${blog.id}`}
        schema={articleSchema}
      />

      <div className="blog-hero">
        <img src={blog.image} alt={blog.title} className="blog-hero-image" />
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <div className="blog-meta">
            <span>{blog.date}</span>
            <span className="separator">•</span>
            <span>{blog.author}</span>
          </div>
          <h1 className="blog-post-title">{blog.title}</h1>
        </div>
      </div>

      <div className="blog-post-container">
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        
        <div className="blog-post-footer">
          <Link to="/blogs" className="back-link">&larr; Back to Editorials</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
