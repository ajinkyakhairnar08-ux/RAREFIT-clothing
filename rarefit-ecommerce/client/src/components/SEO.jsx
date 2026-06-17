import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, image, url }) => {
  const siteUrl = 'https://rarefit-ecommerce.com'; // Placeholder, should be updated with actual domain later
  const defaultImage = `${siteUrl}/favicon.svg`; // Fallback image

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={url || siteUrl} />

      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="RareFit" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || 'RareFit'} />
      <meta name="twitter:card" content={type === 'product' ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
