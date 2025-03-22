import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  placeholderColor?: string;
  centered?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f0f0f0',
  centered = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  const containerStyle = centered ? { 
    display: 'flex', 
    justifyContent: 'center',
    width: '100%'
  } : {};

  return (
    <div style={containerStyle}>
      {!isLoaded && !error && (
        <div
          className={className}
          style={{
            backgroundColor: placeholderColor,
            width: width,
            height: height,
            display: 'inline-block'
          }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'd-inline-block' : 'd-none'}`}
        width={width}
        height={height}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      {error && (
        <div
          className={className}
          style={{
            backgroundColor: '#f8d7da',
            width: width,
            height: height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;