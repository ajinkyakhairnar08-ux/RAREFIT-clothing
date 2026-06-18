import React, { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0 && progressRef.current) {
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressRef.current.style.width = `${scrolled}%`;
      } else if (progressRef.current) {
        progressRef.current.style.width = '0%';
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct width on mount
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div 
        ref={progressRef}
        className="scroll-progress-bar" 
      ></div>
    </div>
  );
};

export default ScrollProgress;
