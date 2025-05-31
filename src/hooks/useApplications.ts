
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface UseApplicationsOptions {
  type: 'talent' | 'business';
}

export function useApplications(options: UseApplicationsOptions) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['applications', options.type, user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      let query = supabase
        .from('applications')
        .select(`
          *,
          job:jobs(*)
        `);

      if (options.type === 'talent') {
        query = query.eq('talent_id', user.id);
      } else {
        // For business users, get applications for their jobs
        query = query
          .eq('jobs.user_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user?.id,
  });
}
