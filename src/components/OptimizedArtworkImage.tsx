import { useState, useRef, useEffect } from 'react';
import ProgressiveImage from './ProgressiveImage';

interface OptimizedArtworkImageProps {
  imageUrl: string;
  title: string;
  className?: string;
}

const OptimizedArtworkImage = ({ imageUrl, title, className = "" }: OptimizedArtworkImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isInView ? (
        <div className="w-full h-64 bg-gentle-green/10 animate-pulse flex items-center justify-center">
          <div className="text-deep-black/50 font-helvetica text-sm">
            Aguardando...
          </div>
        </div>
      ) : (
        <ProgressiveImage
          src={imageUrl}
          alt={`${title} - Obra de Arte Contemporânea de Simone Oliveira`}
          className="w-full h-auto"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

export default OptimizedArtworkImage;