
import { useState, useRef, useEffect } from 'react';
import { useArtworkImage } from '../hooks/useArtworks';
import ProgressiveImage from './ProgressiveImage';

interface LazyArtworkImageProps {
  artworkId: string;
  title: string;
  className?: string;
}

const LazyArtworkImage = ({ artworkId, title, className = "" }: LazyArtworkImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  
  const { data: imageUrl, isLoading, error } = useArtworkImage(isInView ? artworkId : '');

  // Debug logs para identificar o problema
  useEffect(() => {
    console.log(`LazyArtworkImage - ID: ${artworkId}, Title: ${title}, ImageURL: ${imageUrl}`);
  }, [artworkId, title, imageUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(`Image coming into view - ID: ${artworkId}, Title: ${title}`);
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [artworkId, title]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isInView ? (
        <div className="w-full h-64 bg-gentle-green/10 animate-pulse flex items-center justify-center">
          <div className="text-deep-black/50 font-helvetica text-sm">
            Aguardando...
          </div>
        </div>
      ) : isLoading ? (
        <div className="w-full h-64 bg-gentle-green/10 animate-pulse flex items-center justify-center">
          <div className="text-deep-black/50 font-helvetica text-sm">
            Carregando... {artworkId.substring(0, 8)}
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-64 bg-gentle-green/10 flex items-center justify-center">
          <div className="text-deep-black/50 font-helvetica text-sm">
            Erro ao carregar
          </div>
        </div>
      ) : imageUrl ? (
        <ProgressiveImage
          src={imageUrl}
          alt={`${title} - Obra de Arte Contemporânea de Simone Oliveira`}
          className="w-full h-auto"
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <div className="w-full h-64 bg-gentle-green/10 flex items-center justify-center">
          <div className="text-deep-black/50 font-helvetica text-sm">
            Imagem não encontrada
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyArtworkImage;
