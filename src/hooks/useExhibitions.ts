
import { useQuery } from '@tanstack/react-query';
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

export const useExhibitions = () => {
  return useQuery({
    queryKey: ['exhibitions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exhibitions')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching exhibitions:', error);
        throw error;
      }
      
      return data as Exhibition[];
    },
  });
};
