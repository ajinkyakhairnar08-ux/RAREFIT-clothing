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
    <div className="floating-actions">
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <div className="fab-group">
        <a href="https://wa.me/918668834916" target="_blank" rel="noreferrer" className="fab fab-whatsapp" title="WhatsApp">
          <MessageCircle size={24} />
        </a>
        <a href="tel:+918668834916" className="fab fab-call" title="Call Us">
          <PhoneCall size={24} />
        </a>
        <button className="fab fab-chat" title="Live Chat" onClick={toggleChat}>
          <MessageSquare size={24} />
        </button>
      </div>

      <button 
        className={`fab fab-goup ${showGoUp ? 'visible' : 'hidden'}`} 
        onClick={scrollToTop}
        title="Go to Top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default FloatingActions;
