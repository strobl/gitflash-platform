
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useTalentProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['talent-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('talent_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, return null
          return null;
        }
        console.error('Error fetching talent profile:', error);
        throw error;
      }

      return data;
    },
    enabled: !!user?.id,
  });
}
