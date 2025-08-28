import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
  medium: string;
  description?: string;
  dimensions?: string;
  collection_id?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArtworkMetadata {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  description?: string;
  dimensions?: string;
  collection_id?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

// Hook para buscar todas as obras diretamente do banco
export const useArtworks = (collectionId?: string | null) => {
  return useQuery({
    queryKey: ['artworks', collectionId],
    queryFn: async () => {
      let query = supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (collectionId) {
        query = query.eq('collection_id', collectionId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching artworks:', error);
        throw error;
      }
      
      console.log('✅ Loaded artworks from database - Total:', data?.length);
      data?.forEach((artwork, index) => {
        console.log(`${index + 1}. "${artwork.title}" by ${artwork.artist} (${artwork.year})`);
      });
      
      return data as Artwork[];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook para buscar metadados das obras (compatibilidade)
export const useArtworksMetadata = (collectionId?: string | null) => {
  const { data: artworks, ...rest } = useArtworks(collectionId);
  
  const metadata = artworks?.map(artwork => ({
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist,
    year: artwork.year,
    medium: artwork.medium,
    description: artwork.description,
    dimensions: artwork.dimensions,
    collection_id: artwork.collection_id,
    featured: artwork.featured,
    created_at: artwork.created_at,
    updated_at: artwork.updated_at,
  })) as ArtworkMetadata[];

  return {
    data: metadata,
    ...rest
  };
};

// Hook para buscar uma obra completa
export const useArtwork = (artworkId: string) => {
  return useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: async () => {
      if (!artworkId) return null;
      
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();
      
      if (error) {
        console.error('Error fetching artwork:', error);
        throw error;
      }
      
      return data as Artwork;
    },
    enabled: !!artworkId,
  });
};

// Hook para obras em destaque (compatibilidade)
export const useFeaturedArtworksMetadata = () => {
  const { data: artworks, ...rest } = useArtworks();
  
  const featuredMetadata = artworks?.filter(artwork => artwork.featured).map(artwork => ({
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist,
    year: artwork.year,
    medium: artwork.medium,
    description: artwork.description,
    dimensions: artwork.dimensions,
    collection_id: artwork.collection_id,
    featured: artwork.featured,
    created_at: artwork.created_at,
    updated_at: artwork.updated_at,
  })) as ArtworkMetadata[];

  return {
    data: featuredMetadata,
    ...rest
  };
};

export const useFeaturedArtworks = () => {
  const { data: artworks, ...rest } = useArtworks();
  const featuredArtworks = artworks?.filter(artwork => artwork.featured);
  
  return {
    data: featuredArtworks,
    ...rest
  };
};

