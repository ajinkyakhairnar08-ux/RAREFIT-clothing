import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap, Star } from 'lucide-react';
import SEO from '../components/SEO';
import './Membership.css';

const plans = [
  {
    id: 'monthly',
    icon: <Zap size={32} />,
    label: '1 Month',
    price: 250,
    period: 'month',
    tag: null,
    perks: [
      'Early access to new drops',
      'Members-only discounts',
      'Priority customer support',
      'Exclusive style lookbook',
    ],
  },
  {
    id: 'quarterly',
    icon: <Star size={32} />,
    label: '3 Months',
    price: 650,
    period: '3 months',
    tag: 'Most Popular',
    perks: [
      'Everything in 1-Month plan',
      'Free shipping on all orders',
      'Quarterly mystery drop box',
      'Early sale access (48 hrs)',
    ],
  },
  {
    id: 'yearly',
    icon: <Crown size={32} />,
    label: '1 Year',
    price: 1899,
    period: 'year',
    tag: 'Best Value',
    perks: [
      'Everything in 3-Month plan',
      'Annual exclusive member kit',
      'Personal style consultation',
      'Lifetime loyalty badge',
    ],
  },
];

const Membership = () => {
  const [selected, setSelected] = useState('quarterly');

  return (
    <div className="membership-page">
      <SEO
        title="Premium Membership | RareFit"
        description="Join the RareFit inner circle. Get exclusive access to drops, discounts, and premium perks with our membership plans."
        url="https://rarefit-ecommerce.com/membership"
      />

      {/* Header */}
      <div className="membership-header">
        <div className="membership-badge">
          <Crown size={18} />
          <span>RareFit Inner Circle</span>
        </div>
        <h1 className="membership-title">Go&nbsp;<span className="gradient-text">Premium.</span></h1>
        <p className="membership-subtitle">
          Unlock exclusive drops, members-only discounts, and early access to everything rare.
        </p>
      </div>

      {/* Plans */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card glass ${selected === plan.id ? 'plan-card--active' : ''} ${plan.tag === 'Most Popular' ? 'plan-card--popular' : ''}`}
            onClick={() => setSelected(plan.id)}
          >
            {plan.tag && (
              <div className="plan-tag">{plan.tag}</div>
            )}

            <div className="plan-icon">{plan.icon}</div>
            <h2 className="plan-label">{plan.label}</h2>

            <div className="plan-price">
              <span className="price-currency">₹</span>
              <span className="price-amount">{plan.price.toLocaleString('en-IN')}</span>
              <span className="price-period">/ {plan.period}</span>
            </div>

            {plan.id === 'quarterly' && (
              <p className="plan-savings">Save ₹100 vs monthly</p>
            )}
            {plan.id === 'yearly' && (
              <p className="plan-savings">Save ₹1,101 vs monthly</p>
            )}

            <ul className="plan-perks">
              {plan.perks.map((perk, i) => (
                <li key={i}>
                  <Check size={16} className="perk-check" />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              className={`plan-btn ${selected === plan.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.stopPropagation(); setSelected(plan.id); }}
            >
              {selected === plan.id ? 'Selected' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="membership-cta">
        <button className="btn-primary membership-subscribe-btn">
          Subscribe Now &mdash; ₹{plans.find(p => p.id === selected)?.price.toLocaleString('en-IN')}
        </button>
        <p className="membership-terms">Cancel anytime &nbsp;·&nbsp; Secure payment &nbsp;·&nbsp; Instant activation</p>
      </div>

      {/* Footer Actions */}
      <div className="membership-footer-actions">
        <Link to="/" className="btn-outline membership-action-btn">
          ← Back to Home
        </Link>
        <Link to="/shop" className="btn-primary membership-action-btn">
          Go to Store →
        </Link>
      </div>
    </div>
  );
};

export default Membership;
