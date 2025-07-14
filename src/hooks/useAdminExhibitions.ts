
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Exhibition {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  image: string;
  status: 'current' | 'upcoming' | 'past';
  location: string;
  created_at: string;
  updated_at: string;
}

export const useCreateExhibition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (exhibition: Omit<Exhibition, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating exhibition with data:', exhibition);
      
      // Ensure dates are in the correct format and required fields are present
      const cleanedExhibition = {
        ...exhibition,
        description: exhibition.description || null,
      };
      
      console.log('Cleaned exhibition data:', cleanedExhibition);
      
      const { data, error } = await supabase
        .from('exhibitions')
        .insert([cleanedExhibition])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating exhibition:', error);
        throw error;
      }
      
      console.log('Exhibition created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibitions'] });
    },
    onError: (error) => {
      console.error('Create exhibition mutation error:', error);
    }
  });
};

export const useUpdateExhibition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...exhibition }: Partial<Exhibition> & { id: string }) => {
      console.log('Updating exhibition:', id, exhibition);
      
      const { data, error } = await supabase
        .from('exhibitions')
        .update(exhibition)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating exhibition:', error);
        throw error;
      }
      
      console.log('Exhibition updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibitions'] });
    },
    onError: (error) => {
      console.error('Update exhibition mutation error:', error);
    }
  });
};

export const useDeleteExhibition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting exhibition:', id);
      
      const { error } = await supabase
        .from('exhibitions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting exhibition:', error);
        throw error;
      }
      
      console.log('Exhibition deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibitions'] });
    },
    onError: (error) => {
      console.error('Delete exhibition mutation error:', error);
    }
  });
};
