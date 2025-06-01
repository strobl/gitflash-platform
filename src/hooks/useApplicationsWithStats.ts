
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface ApplicationStats {
  new: number;
  reviewing: number;
  interview: number;
  offer: number;
  hired: number;
  rejected: number;
  total: number;
}

export function useApplicationsWithStats(jobId?: string) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['applications-stats', user?.id, jobId],
    queryFn: async (): Promise<ApplicationStats> => {
      if (!user?.id) return { new: 0, reviewing: 0, interview: 0, offer: 0, hired: 0, rejected: 0, total: 0 };

      let supabaseQuery = supabase
        .from('applications')
        .select('status');

      if (jobId) {
        supabaseQuery = supabaseQuery.eq('job_id', jobId);
      } else {
        // Get applications for all jobs posted by this business user
        const { data: userJobs } = await supabase
          .from('jobs')
          .select('id')
          .eq('user_id', user.id);
        
        if (userJobs && userJobs.length > 0) {
          const jobIds = userJobs.map(job => job.id);
          supabaseQuery = supabaseQuery.in('job_id', jobIds);
        } else {
          return { new: 0, reviewing: 0, interview: 0, offer: 0, hired: 0, rejected: 0, total: 0 };
        }
      }

      const { data, error } = await supabaseQuery;

      if (error) {
        console.error('Error fetching application stats:', error);
        throw error;
      }

      const stats: ApplicationStats = {
        new: 0,
        reviewing: 0,
        interview: 0,
        offer: 0,
        hired: 0,
        rejected: 0,
        total: data?.length || 0
      };

      data?.forEach(app => {
        if (app.status in stats) {
          stats[app.status as keyof ApplicationStats]++;
        }
      });

      return stats;
    },
    enabled: !!user?.id,
  });

  return {
    stats: query.data || { new: 0, reviewing: 0, interview: 0, offer: 0, hired: 0, rejected: 0, total: 0 },
    loading: query.isLoading,
    error: query.error,
    ...query
  };
}
