import React, { useState, useEffect } from 'react';
import { MessageCircle, PhoneCall, ArrowUp, MessageSquare } from 'lucide-react';
import ChatBox from './ChatBox';
import './FloatingActions.css';

const FloatingActions = () => {
  const [showGoUp, setShowGoUp] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoUp(true);
      } else {
        setShowGoUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="floating-actions-wrapper">
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <div className="contact-bar">
        <a href="tel:+918668834916" className="contact-btn btn-call" title="Call Us">
          <PhoneCall size={20} />
          <span className="contact-text">CALL US</span>
        </a>
        <a href="https://wa.me/918668834916" target="_blank" rel="noreferrer" className="contact-btn btn-wa" title="WhatsApp">
          <MessageCircle size={20} />
          <span className="contact-text">WHATSAPP</span>
        </a>
      </div>

      <div className="floating-actions">
        <button className="fab fab-chat" title="Live Chat" onClick={toggleChat}>
          <MessageSquare size={24} />
        </button>

        <button 
          className={`fab fab-goup ${showGoUp ? 'visible' : 'hidden'}`} 
          onClick={scrollToTop}
          title="Go to Top"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
