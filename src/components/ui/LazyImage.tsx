import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  placeholderColor?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f0f0f0'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <>
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
    </>
  );
};

export default LazyImage;