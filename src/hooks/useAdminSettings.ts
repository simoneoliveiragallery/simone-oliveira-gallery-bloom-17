
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAdminPassword = () => {
  return useQuery({
    queryKey: ['admin-password'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();
      
      if (error) {
        console.error('Error fetching admin password:', error);
        throw error;
      }
      
      return data?.value || '';
    },
  });
};
