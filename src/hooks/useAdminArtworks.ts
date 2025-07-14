
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Artwork } from './useArtworks';

export const useCreateArtwork = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (artwork: Omit<Artwork, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating artwork with data:', artwork);
      
      // Clean the artwork data to handle empty strings for UUID fields
      const cleanedArtwork = {
        ...artwork,
        collection_id: artwork.collection_id === '' ? null : artwork.collection_id,
      };
      
      console.log('Cleaned artwork data:', cleanedArtwork);
      
      const { data, error } = await supabase
        .from('artworks')
        .insert([cleanedArtwork])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating artwork:', error);
        throw error;
      }
      
      console.log('Artwork created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });
};

export const useUpdateArtwork = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...artwork }: Partial<Artwork> & { id: string }) => {
      console.log('Updating artwork:', id, artwork);
      
      // Clean the artwork data to handle empty strings for UUID fields
      const cleanedArtwork = {
        ...artwork,
        collection_id: artwork.collection_id === '' ? null : artwork.collection_id,
      };
      
      console.log('Cleaned update data:', cleanedArtwork);
      
      const { data, error } = await supabase
        .from('artworks')
        .update(cleanedArtwork)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating artwork:', error);
        throw error;
      }
      
      console.log('Artwork updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
    }
  });
};

export const useDeleteArtwork = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting artwork:', id);
      
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting artwork:', error);
        throw error;
      }
      
      console.log('Artwork deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
    }
  });
};

export const useToggleFeaturedArtwork = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      console.log('Toggling featured status:', id, featured);
      
      const { data, error } = await supabase
        .from('artworks')
        .update({ featured })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error toggling featured artwork:', error);
        throw error;
      }
      
      console.log('Featured status updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    },
    onError: (error) => {
      console.error('Toggle featured mutation error:', error);
    }
  });
};
