import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        {product.photo ? (
          <img src={product.photo} alt={product.name} className="product-image" />
        ) : (
          <span className="product-image-emoji">{product.emoji || '👕'}</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
