// src/pages/Temp404Page.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Bouncing404 from '../components/ui/Bouncing404';

// Animation variants for the page transition
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const Temp404Page: React.FC = () => {
  useEffect(() => {
    // Optional: Change the page title for extra chaos
    const originalTitle = document.title;
    document.title = "ERROR ERROR ERROR - 404 NOT FOUND";
    
    // Add keyboard listener to escape
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('User tried to escape the madness!');
      // Optional: Add escape route
      // if (event.key === 'Escape') {
      //   window.location.href = '/about';
      // }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup
    return () => {
      document.title = originalTitle;
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Bouncing404 />
    </motion.div>
  );
};

export default Temp404Page;
