import { useState } from 'react';
import { useArtworks, Artwork } from '../hooks/useArtworks';
import { useIsMobile } from '../hooks/use-mobile';
import ArtworkModal from './ArtworkModal';
import ArtworkSkeleton from './ArtworkSkeleton';
import OptimizedArtworkImage from './OptimizedArtworkImage';

interface ArtworkGridProps {
  collectionId?: string | null;
  featuredOnly?: boolean;
}

const ArtworkGrid = ({ collectionId, featuredOnly = false }: ArtworkGridProps) => {
  const { data: allArtworks, isLoading, error } = useArtworks(collectionId);
  const isMobile = useIsMobile();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Filtrar obras em destaque se necessário
  const artworks = featuredOnly ? 
    allArtworks?.filter(artwork => artwork.featured) : 
    allArtworks;
  
  console.log(`🎨 ArtworkGrid - Mode: ${featuredOnly ? 'Featured' : 'All'}, Total: ${artworks?.length || 0}`);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="w-full animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <ArtworkSkeleton />
          </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        {artworks?.map((artwork, index) => (
          <div
            key={artwork.id}
            className="group cursor-pointer animate-fade-in"
            style={{
              animationDelay: `${index * 0.05}s`
            }}
            onClick={() => {
              console.log('🖱️ Clicked artwork:', artwork.title, artwork);
              setSelectedArtwork(artwork);
            }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-soft-beige transition-all duration-300 hover:shadow-lg hover:scale-105">
              {artwork.image ? (
                <OptimizedArtworkImage
                  src={artwork.image}
                  alt={`${artwork.title} - ${artwork.artist} (${artwork.year})`}
                  className="transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
              ) : (
                <div className="w-full h-64 bg-gentle-green/10 flex items-center justify-center">
                  <span className="text-deep-black/50 font-helvetica text-sm">
                    Sem imagem
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semplicita text-lg sm:text-xl text-soft-beige mb-2 font-light">
                    {artwork.title}
                  </h3>
                  <p className="font-helvetica text-soft-beige/80 text-sm mb-1">
                    {artwork.artist} - {artwork.year}
                  </p>
                  {artwork.dimensions && (
                    <p className="font-helvetica text-soft-beige/70 text-xs">
                      {artwork.dimensions}
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
        onClose={() => setSelectedArtwork(null)} 
      />
    </>
  );
};

export default ArtworkGrid;
