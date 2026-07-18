import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import useBlogStore from '../store/useBlogStore';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const blogs = useBlogStore((state) => state.blogs);
  const loading = useBlogStore((state) => state.loading);
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-not-found">
        <h2>Loading…</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-post-not-found">
        <h2>Article Not Found</h2>
        <Link to="/blogs" className="back-link">&larr; Back to Editorials</Link>
      </div>
    );
  }

  const absoluteImage = blog.image ? blog.image : undefined;
  const paragraphs = blog.content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    ...(absoluteImage ? { image: [absoluteImage] } : {}),
    "datePublished": blog.dateValue,
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
        image={absoluteImage}
        type="article"
        url={`https://rarefit-ecommerce.com/blog/${blog.id}`}
        schema={articleSchema}
      />

      <div className="blog-hero">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="blog-hero-image" />
        ) : (
          <div className="blog-hero-image blog-image-placeholder" />
        )}
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
        <div className="blog-post-content">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{blog.excerpt}</p>
          )}
        </div>

        <div className="blog-post-footer">
          <Link to="/blogs" className="back-link">&larr; Back to Editorials</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
