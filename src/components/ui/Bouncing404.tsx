import React, { useEffect, useRef, useState, useCallback } from 'react';

const Bouncing404: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const velocityRef = useRef({ x: 4, y: 3 });
  const positionRef = useRef({ x: 100, y: 100 });
  
  const [displayPosition, setDisplayPosition] = useState({ x: 100, y: 100 });
  const [color, setColor] = useState('#ff6b6b');

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#0984e3', '#a29bfe', '#fd79a8'
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const animate = useCallback(() => {
    if (!containerRef.current || !textRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = containerRef.current;
    const text = textRef.current;
    
    // Get actual dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const textWidth = text.offsetWidth;
    const textHeight = text.offsetHeight;

    // Update position
    let newX = positionRef.current.x + velocityRef.current.x;
    let newY = positionRef.current.y + velocityRef.current.y;
    let colorChange = false;

    // Bounce off walls - left and right
    if (newX <= 0) {
      newX = 0;
      velocityRef.current.x = Math.abs(velocityRef.current.x);
      colorChange = true;
    } else if (newX >= containerWidth - textWidth) {
      newX = containerWidth - textWidth;
      velocityRef.current.x = -Math.abs(velocityRef.current.x);
      colorChange = true;
    }

    // Bounce off walls - top and bottom  
    if (newY <= 0) {
      newY = 0;
      velocityRef.current.y = Math.abs(velocityRef.current.y);
      colorChange = true;
    } else if (newY >= containerHeight - textHeight) {
      newY = containerHeight - textHeight;
      velocityRef.current.y = -Math.abs(velocityRef.current.y);
      colorChange = true;
    }

    // Update position
    positionRef.current = { x: newX, y: newY };
    setDisplayPosition({ x: newX, y: newY });

    // Change color on bounce
    if (colorChange) {
      setColor(getRandomColor());
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const textWidth = textRef.current.offsetWidth;
        const textHeight = textRef.current.offsetHeight;

        // Clamp position to new boundaries
        const clampedX = Math.min(Math.max(0, positionRef.current.x), containerWidth - textWidth);
        const clampedY = Math.min(Math.max(0, positionRef.current.y), containerHeight - textHeight);
        
        positionRef.current = { x: clampedX, y: clampedY };
        setDisplayPosition({ x: clampedX, y: clampedY });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click to add more chaos
  const handleClick = () => {
    // Randomize velocity on click
    velocityRef.current = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8
    };
    // Ensure minimum speed
    if (Math.abs(velocityRef.current.x) < 2) {
      velocityRef.current.x = velocityRef.current.x > 0 ? 3 : -3;
    }
    if (Math.abs(velocityRef.current.y) < 2) {
      velocityRef.current.y = velocityRef.current.y > 0 ? 2 : -2;
    }
    setColor(getRandomColor());
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        cursor: 'none'
      }}
    >
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          left: `${displayPosition.x}px`,
          top: `${displayPosition.y}px`,
          color: color,
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 'bold',
          fontFamily: 'Impact, Arial Black, sans-serif',
          textShadow: `
            0 0 20px ${color},
            0 0 40px ${color},
            0 0 60px ${color},
            0 0 80px ${color}
          `,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '0.1em'
        }}
      >
        404
      </div>
      
      {/* Retro scanlines */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.02) 2px,
            rgba(255, 255, 255, 0.02) 4px
          )`,
          pointerEvents: 'none'
        }}
      />
      
      {/* Instructions */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#444',
          fontSize: 'clamp(12px, 2vw, 16px)',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '10px', opacity: 0.8 }}>
          Click anywhere to change direction
        </div>
        <div style={{ opacity: 0.5, fontSize: '12px' }}>
          ~  ~
        </div>
      </div>
    </div>
  );
};

export default Bouncing404;
