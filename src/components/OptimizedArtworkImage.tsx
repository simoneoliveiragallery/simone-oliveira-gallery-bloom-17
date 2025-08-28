import { useState, useRef, useEffect } from 'react';

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
            Carregando...
          </div>
        </div>
      ) : (
        <>
          <img
            src={imageUrl}
            alt={`${title} - Obra de Arte Contemporânea de Simone Oliveira`}
            className={`w-full h-auto object-contain transition-all duration-500 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 w-full h-64 bg-gentle-green/10 animate-pulse flex items-center justify-center">
              <div className="text-deep-black/50 font-helvetica text-sm">
                Carregando imagem...
              </div>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 w-full h-64 bg-gentle-green/10 flex items-center justify-center">
              <div className="text-deep-black/50 font-helvetica text-sm">
                Erro ao carregar
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OptimizedArtworkImage;