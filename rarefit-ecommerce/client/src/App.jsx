import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PreHeader from './components/PreHeader';
import FloatingActions from './components/FloatingActions';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';

// New Pages
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Membership from './pages/Membership';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';

// Admin dashboard — lazy-loaded so its code/CSS never ships to storefront visitors
const AdminApp = lazy(() => import('./admin/AdminApp'));

function PublicSite() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <div className="page-wrapper">
        <PreHeader />
        <Navbar />

        {/* Main content has margin to account for the right nav */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/membership" element={<Membership />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard');

  if (isAdminRoute) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    );
  }

  return <PublicSite />;
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
