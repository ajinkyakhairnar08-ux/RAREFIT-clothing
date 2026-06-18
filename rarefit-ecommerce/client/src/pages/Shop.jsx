import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { products as localProducts } from '../data/products';
import './Shop.css';

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    setAllProducts(localProducts);
    setProducts(localProducts);
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    // Category Filter
    if (categoryFilter && categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Search Query Filter
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Price Filter
    filtered = filtered.filter(p => p.price <= maxPrice);

    setProducts(filtered);
  }, [categoryFilter, searchQuery, maxPrice, allProducts]);

  const categories = ['All', 'Sunglasses', 'Caps', 'Watches', 'Shirts', 'Pants', 'Shoes'];

  const handleCategoryChange = (cat) => {
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  return (
    <div className="shop-page container">
      <SEO 
        title="Shop | RareFit" 
        description="Browse our complete catalog of premium clothing and accessories. Filter by category to find your perfect fit." 
        url="https://rarefit-ecommerce.com/shop"
      />
      <div className="shop-header">
        <h1 className="section-title">Shop Collection</h1>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`category-btn ${(!categoryFilter && cat === 'All') || categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Max Price: ₹{maxPrice}</h3>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="100" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>
        </aside>
        
        <main className="shop-main">
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="no-products">
              <p>No products found matching your filters.</p>
              <button className="btn-outline mt-4" onClick={() => {
                setSearchQuery('');
                setMaxPrice(10000);
                setSearchParams({});
              }}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
