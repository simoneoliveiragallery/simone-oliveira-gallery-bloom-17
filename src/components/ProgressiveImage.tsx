import { useState, useRef, useEffect } from 'react';
import { useOptimizedImage } from '../hooks/useOptimizedImage';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ProgressiveImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholderClassName = "",
  onLoad,
  onError 
}: ProgressiveImageProps) => {
  const [currentStage, setCurrentStage] = useState<'placeholder' | 'thumbnail' | 'full'>('placeholder');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const {
    optimizedUrl,
    thumbnailUrl,
    placeholderUrl,
    isOptimizing,
    error: optimizationError
  } = useOptimizedImage(src, {
    enableThumbnail: true,
    enablePlaceholder: true,
    cacheKey: src?.substring(0, 50)
  });

  useEffect(() => {
    if (placeholderUrl && currentStage === 'placeholder') {
      setCurrentStage('placeholder');
    }
  }, [placeholderUrl]);

  useEffect(() => {
    if (thumbnailUrl && !isOptimizing) {
      const img = new Image();
      img.onload = () => {
        setCurrentStage('thumbnail');
        setTimeout(() => {
          if (optimizedUrl) {
            loadFullImage();
          }
        }, 100);
      };
      img.src = thumbnailUrl;
    }
  }, [thumbnailUrl, isOptimizing, optimizedUrl]);

  const loadFullImage = () => {
    if (!optimizedUrl) return;
    
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setCurrentStage('full');
      onLoad?.();
    };
    img.onerror = () => {
      setImageError(true);
      onError?.();
    };
    img.src = optimizedUrl;
  };

  const getCurrentSrc = () => {
    switch (currentStage) {
      case 'placeholder':
        return placeholderUrl || '';
      case 'thumbnail':
        return thumbnailUrl || '';
      case 'full':
        return optimizedUrl || '';
      default:
        return '';
    }
  };

  const getCurrentOpacity = () => {
    if (imageError || optimizationError) return 'opacity-0';
    if (currentStage === 'placeholder') return 'opacity-60';
    if (currentStage === 'thumbnail') return 'opacity-80';
    if (currentStage === 'full' && imageLoaded) return 'opacity-100';
    return 'opacity-0';
  };

  if (optimizationError || imageError) {
    return (
      <div className={`bg-gentle-green/10 flex items-center justify-center ${className}`}>
        <div className="text-deep-black/50 font-helvetica text-sm">
          Erro ao carregar
        </div>
      </div>
    );
  }

  const currentSrc = getCurrentSrc();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {(!currentSrc || isOptimizing) && (
        <div className={`absolute inset-0 bg-gentle-green/10 animate-pulse flex items-center justify-center ${placeholderClassName}`}>
          <div className="text-deep-black/50 font-helvetica text-sm">
            Carregando...
          </div>
        </div>
      )}
      
      {/* Progressive image */}
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`
            w-full h-full object-contain transition-all duration-700 ease-out
            ${getCurrentOpacity()}
            ${currentStage === 'placeholder' ? 'scale-110 blur-sm' : ''}
            ${currentStage === 'thumbnail' ? 'scale-105' : ''}
            ${currentStage === 'full' ? 'scale-100' : ''}
          `}
          loading="lazy"
          decoding="async"
        />
      )}
      
      {/* Progressive loading indicator */}
      {isOptimizing && (
        <div className="absolute top-2 right-2 bg-warm-terracotta/80 text-soft-beige px-2 py-1 rounded-full text-xs font-helvetica">
          Otimizando...
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;