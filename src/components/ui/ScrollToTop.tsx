import React, { useEffect } from 'react';
import upArrowImage from '../../assets/images/up1.png';

const ScrollToTop: React.FC = () => {
  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTopButton = document.querySelector('.scrollTop');
      if (scrollTopButton) {
        if (window.scrollY > 500) {
          scrollTopButton.classList.add('active');
        } else {
          scrollTopButton.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="scrollTop" 
      style={{ 
        background: `#2a78ba url(${upArrowImage})`,
        backgroundSize: '40px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={scrollToTopHandler}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
    ></div>
  );
};

export default ScrollToTop;