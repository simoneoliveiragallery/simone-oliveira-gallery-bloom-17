import { useState, useRef, useEffect } from 'react';

interface OptimizedArtworkImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const OptimizedArtworkImage = ({ src, alt, className = "", onLoad }: OptimizedArtworkImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
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

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isInView ? (
        <div className="w-full h-64 bg-gentle-green/10 animate-pulse" />
      ) : error ? (
        <div className="w-full h-64 bg-gentle-green/10 flex items-center justify-center">
          <span className="text-deep-black/50 font-helvetica text-sm">
            Erro ao carregar imagem
          </span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 w-full h-64 bg-gentle-green/10 animate-pulse z-10" />
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-64 object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default OptimizedArtworkImage;