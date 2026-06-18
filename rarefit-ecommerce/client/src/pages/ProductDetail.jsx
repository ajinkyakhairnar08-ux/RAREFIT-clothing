import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import SEO from '../components/SEO';
import { products as localProducts } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const foundProduct = localProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      console.error('Product not found');
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) return <div className="container loading">Loading...</div>;
  if (!product) return <div className="container not-found">Product not found.</div>;

  return (
    <div className="product-detail-page container">
      <SEO 
        title={`${product.name} | RareFit`} 
        description={product.description} 
        image={`http://localhost:5173${product.image}`}
        type="product"
        url={`https://rarefit-ecommerce.com/product/${product.id}`}
      />
      <div className="product-detail-layout">
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price.toFixed(2)}</p>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <a href="https://wa.me/918668834916" target="_blank" rel="noreferrer" className="btn-secondary whatsapp-contact-btn" style={{ marginLeft: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '20px', height: '20px' }} />
              Order on WhatsApp
            </a>
          </div>
          
          <div className="product-meta">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Shipping:</strong> Free shipping on orders over ₹100.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
