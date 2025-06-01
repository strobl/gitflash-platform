
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface ApplicationStats {
  total: number;
  new: number;
  reviewing: number;
  interview: number;
  offer: number;
  hired: number;
  rejected: number;
}

export function useApplicationsWithStats(type: 'talent' | 'business', jobId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['applications-stats', type, jobId, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      let query = supabase
        .from('applications')
        .select('status, job:jobs!inner(user_id)');

      if (type === 'talent') {
        query = query.eq('talent_id', user.id);
      } else if (type === 'business') {
        if (jobId) {
          query = query.eq('job_id', jobId);
        } else {
          query = query.eq('job.user_id', user.id);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching application stats:', error);
        throw error;
      }

      const stats: ApplicationStats = {
        total: data.length,
        new: data.filter(app => app.status === 'new').length,
        reviewing: data.filter(app => app.status === 'reviewing').length,
        interview: data.filter(app => ['interview', 'interview_scheduled'].includes(app.status)).length,
        offer: data.filter(app => ['offer', 'offer_pending', 'offer_accepted', 'offer_declined'].includes(app.status)).length,
        hired: data.filter(app => app.status === 'hired').length,
        rejected: data.filter(app => app.status === 'rejected').length,
      };

      return stats;
    },
    enabled: !!user?.id,
  });
}
