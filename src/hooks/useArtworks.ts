import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

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

// Hook para buscar metadados das obras (sem imagens) com real-time updates
export const useArtworksMetadata = (collectionId?: string | null) => {
  const queryClient = useQueryClient();

  // Setup real-time listener para mudanças nas obras
  useEffect(() => {
    const channel = supabase
      .channel('artworks-metadata-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Escutar INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'artworks'
        },
        (payload) => {
          console.log('Real-time artworks change:', payload);
          // Invalidar todas as queries de artworks para garantir sincronização
          queryClient.invalidateQueries({ queryKey: ['artworks-metadata'] });
          queryClient.invalidateQueries({ queryKey: ['artworks'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
      
      console.log('Fetched artworks metadata - Total:', data?.length);
      return data as ArtworkMetadata[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};

// Hook para buscar uma obra específica com imagem (otimizado com cache individual)
export const useArtworkImage = (artworkId: string) => {
  const queryClient = useQueryClient();

  // Setup real-time listener para esta obra específica
  useEffect(() => {
    if (!artworkId) return;

    const channel = supabase
      .channel(`artwork-${artworkId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'artworks',
          filter: `id=eq.${artworkId}`
        },
        (payload) => {
          console.log(`Real-time update for artwork ${artworkId}:`, payload.new);
          // Invalidar cache desta obra específica
          queryClient.invalidateQueries({ queryKey: ['artwork-image', artworkId] });
          queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [artworkId, queryClient]);

  return useQuery({
    queryKey: ['artwork-image', artworkId],
    queryFn: async () => {
      if (!artworkId) return null;
      
      console.log('Fetching image for artwork ID:', artworkId);
      
      const { data, error } = await supabase
        .from('artworks')
        .select('image, title')
        .eq('id', artworkId)
        .single();
      
      if (error) {
        console.error('Error fetching artwork image:', error);
        throw error;
      }
      
      console.log(`Fetched image for ${data.title} (${artworkId}):`, data.image ? 'Success' : 'No image');
      return data.image;
    },
    enabled: !!artworkId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    retryDelay: 1000,
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
  const queryClient = useQueryClient();

  // Setup real-time listener 
  useEffect(() => {
    const channel = supabase
      .channel('artworks-full-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public', 
          table: 'artworks'
        },
        (payload) => {
          console.log('Real-time artworks full change:', payload);
          queryClient.invalidateQueries({ queryKey: ['artworks'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
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
