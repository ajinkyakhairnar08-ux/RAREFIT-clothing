import React, { useState, useRef, useEffect } from 'react';
import { X, Bot } from 'lucide-react';
import './ChatBox.css';

const faqs = [
  { id: 1, q: "Product return", a: "You can return products within 15 days of delivery. Please visit our Return Policy page or contact support for a return label." },
  { id: 2, q: "Refund", a: "Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method." },
  { id: 3, q: "Track your order", a: "Once your order ships, you will receive an email with a tracking link. You can also track your order from your account dashboard." },
  { id: 4, q: "Replace product", a: "If you received a defective or wrong item, we offer free replacements within 7 days of delivery. Please contact our support team." },
  { id: 5, q: "Cancel order", a: "Orders can be canceled within 24 hours of placement. If the order has already shipped, you will need to initiate a return instead." },
  { id: 6, q: "Shipping time", a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping applies to orders over ₹100." },
  { id: 7, q: "Payment methods", a: "We accept all major Credit/Debit cards, UPI, Net Banking, and select digital wallets." }
];

const ChatBox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the RareFit assistant. How can I help you today? You can select a question below.' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFAQClick = (faq) => {
    // Add user question
    setMessages(prev => [...prev, { sender: 'user', text: faq.q }]);
    
    // Simulate delay for bot answer
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: faq.a }]);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbox-container glass">
      <div className="chatbox-header">
        <div className="chatbox-title">
          <Bot size={20} />
          <span>RareFit Support</span>
        </div>
        <button className="chatbox-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <div className="chatbox-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.sender}`}>
            {msg.sender === 'bot' && <div className="avatar bot-avatar"><Bot size={14} /></div>}
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbox-faq-options">
        <p className="faq-prompt">Popular questions:</p>
        <div className="faq-chips">
          {faqs.map(faq => (
            <button key={faq.id} className="faq-chip" onClick={() => handleFAQClick(faq)}>
              {faq.q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
