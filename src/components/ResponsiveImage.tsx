
import React from 'react';

interface ResponsiveImageProps {
  mobileSrc: string;
  desktopSrc: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  mobileSrc, 
  desktopSrc, 
  alt, 
  className = '',
  loading = 'lazy'
}) => {
  return (
    <picture className={className}>
      <source media="(max-width: 768px)" srcSet={mobileSrc} />
      <source media="(min-width: 769px)" srcSet={desktopSrc} />
      <img 
        src={desktopSrc} 
        alt={alt} 
        className="w-full h-full object-cover" 
        loading={loading}
      />
    </picture>
  );
};

export default ResponsiveImage;
