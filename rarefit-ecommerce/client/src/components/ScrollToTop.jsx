import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Can use 'smooth' if desired, but instant is better for page loads
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
