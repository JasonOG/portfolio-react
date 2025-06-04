// src/pages/Temp404Page.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Your bouncing 404 component (paste the component I just made here)
const Bouncing404: React.FC = () => {
  // ... paste the entire component from above
};

// Page wrapper with your existing animation structure
const Temp404Page: React.FC = () => {
  // Optional: Add some audio if you really want to torture your visitors
  useEffect(() => {
    // Uncomment this if you want to add the classic Windows error sound
    // const audio = new Audio('/path/to/windows-error.wav');
    // audio.play().catch(() => {}); // Ignore autoplay restrictions
    
    // Add keyboard listener to escape
    const handleKeyPress = () => {
      // You could redirect back to normal homepage or show a modal
      console.log('User tried to escape the madness!');
      // window.location.href = '/about'; // Emergency escape route
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Bouncing404 />
    </motion.div>
  );
};

export default Temp404Page;
