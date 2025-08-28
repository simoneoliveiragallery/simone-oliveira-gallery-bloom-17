
import { useEffect } from 'react';
import { useArtworks } from '../hooks/useArtworks';

const ArtworkImageDebug = () => {
  const { data: artworks } = useArtworks();

  useEffect(() => {
    if (artworks) {
      console.log('=== DEBUG: Artworks and their images ===');
      artworks.forEach((artwork, index) => {
        console.log(`${index + 1}. ${artwork.title} (ID: ${artwork.id})`);
        console.log(`   Image hash: ${artwork.image ? artwork.image.substring(0, 50) + '...' : 'No image'}`);
        console.log(`   Artist: ${artwork.artist}`);
        console.log(`   Year: ${artwork.year}`);
        console.log('---');
      });
      
      // Verificar se há imagens duplicadas
      const imageHashes = artworks
        .map(a => a.image?.substring(0, 100))
        .filter(Boolean);
      
      const duplicates = imageHashes.filter((hash, index) => 
        imageHashes.indexOf(hash) !== index
      );
      
      if (duplicates.length > 0) {
        console.warn('⚠️  FOUND DUPLICATE IMAGES:', duplicates.length);
        console.log('Duplicate image hashes:', duplicates);
      } else {
        console.log('✅ No duplicate images found');
      }
    }
  }, [artworks]);

  return null; // Este componente não renderiza nada, apenas debug
};

export default ArtworkImageDebug;
