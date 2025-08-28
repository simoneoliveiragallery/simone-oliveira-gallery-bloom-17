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

// Hook para buscar metadados das obras (sem imagens)
export const useArtworksMetadata = (collectionId?: string | null) => {
  return useQuery({
    queryKey: ['artworks-metadata', collectionId],
    queryFn: async () => {
      let query = supabase
        .from('artworks')
        .select('id, title, artist, year, medium, description, dimensions, collection_id, featured, created_at, updated_at')
        .order('created_at', { ascending: false });
      
      if (collectionId) {
        query = query.eq('collection_id', collectionId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching artworks metadata:', error);
        throw error;
      }
      
      console.log('Fetched artworks metadata - Total:', data?.length, 'Items:', data?.map(a => ({ id: a.id, title: a.title })));
      return data as ArtworkMetadata[];
    },
  });
};

// Hook para buscar uma obra específica com imagem (otimizado com cache individual)
export const useArtworkImage = (artworkId: string) => {
  return useQuery({
    queryKey: ['artwork-image', artworkId],
    queryFn: async () => {
      console.log('Fetching image for artwork ID:', artworkId);
      
      const { data, error } = await supabase
        .from('artworks')
        .select('image')
        .eq('id', artworkId)
        .single();
      
      if (error) {
        console.error('Error fetching artwork image:', error);
        throw error;
      }
      
      console.log(`Fetched image for ${artworkId}:`, data.image ? 'Success' : 'No image');
      return data.image;
    },
    enabled: !!artworkId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // Garantir que cada obra tenha sua própria entrada no cache
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook para buscar uma obra completa
export const useArtwork = (artworkId: string) => {
  return useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: async () => {
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
      
      console.log('Fetched full artworks - Total:', data?.length);
      return data as Artwork[];
    },
  });
};

export const useFeaturedArtworksMetadata = () => {
  return useQuery({
    queryKey: ['artworks-metadata', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('id, title, artist, year, medium, description, dimensions, collection_id, featured, created_at, updated_at')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching featured artworks metadata:', error);
        throw error;
      }
      
      console.log('Fetched featured artworks metadata:', data?.map(a => ({ id: a.id, title: a.title })));
      return data as ArtworkMetadata[];
    },
  });
};

export const useFeaturedArtworks = () => {
  return useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching featured artworks:', error);
        throw error;
      }
      
      return data as Artwork[];
    },
  });
};
