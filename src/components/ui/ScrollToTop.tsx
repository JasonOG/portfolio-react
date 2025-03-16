import React, { useEffect, useState } from 'react';
import upArrowImage from '../../assets/images/up1.png';

const ScrollToTop: React.FC = () => {
  // ...existing code

  return (
    <div 
      className="scrollTop" 
      style={{ 
        background: `#2a78ba url(${upArrowImage})`,
        backgroundSize: '40px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={ScrollToTop}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
    ></div>
  );
};

export default ScrollToTop;