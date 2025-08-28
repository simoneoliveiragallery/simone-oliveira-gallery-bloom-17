
import { useState } from 'react';
import { useArtworks, useFeaturedArtworks, useArtwork } from '../hooks/useArtworks';
import { useIsMobile } from '../hooks/use-mobile';
import ArtworkModal from './ArtworkModal';
import OptimizedArtworkImage from './OptimizedArtworkImage';

interface ArtworkGridProps {
  collectionId?: string | null;
  featuredOnly?: boolean;
}

const ArtworkGrid = ({ collectionId, featuredOnly = false }: ArtworkGridProps) => {
  const { data: allArtworks, isLoading: allLoading, error: allError } = useArtworks(collectionId);
  const { data: featuredArtworks, isLoading: featuredLoading, error: featuredError } = useFeaturedArtworks();
  const isMobile = useIsMobile();
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
  const selectedArtwork = selectedArtworkId ? (featuredOnly ? featuredArtworks : allArtworks)?.find(art => art.id === selectedArtworkId) : null;

  const artworks = featuredOnly ? featuredArtworks : allArtworks;
  const isLoading = featuredOnly ? featuredLoading : allLoading;
  const error = featuredOnly ? featuredError : allError;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gentle-green/10 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-deep-black/70 font-helvetica">Erro ao carregar as obras</p>
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-deep-black/70 font-helvetica">
          {featuredOnly ? 'Nenhuma obra em destaque encontrada' : 'Nenhuma obra encontrada'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className="group cursor-pointer stagger-animation hover-lift-elegant"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelectedArtworkId(artwork.id)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-soft-beige">
              <OptimizedArtworkImage
                imageUrl={artwork.image}
                title={artwork.title}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-semplicita text-lg sm:text-xl text-soft-beige mb-2 font-light">
                    {artwork.title}
                  </h3>
                  {artwork.dimensions && (
                    <p className="font-helvetica text-soft-beige/70 text-sm">
                      Dimensões: {artwork.dimensions}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <ArtworkModal 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtworkId(null)} 
      />
    </>
  );
};

export default ArtworkGrid;
