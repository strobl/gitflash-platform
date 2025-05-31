
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Application {
  id: string;
  job_id: string;
  talent_id: string;
  status: string;
  applicant_name: string;
  applicant_email: string;
  linkedin_profile?: string;
  cover_letter?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  version: number;
  job?: {
    id: string;
    title: string;
    location: string;
    description: string;
    hourly_rate_min: string;
    hourly_rate_max: string;
  };
  history?: ApplicationHistoryItem[];
}

export interface ApplicationHistoryItem {
  id: string;
  application_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  changed_at: string;
  profile?: {
    name: string;
  };
}

interface UseApplicationsOptions {
  type: 'talent' | 'business';
  jobId?: string;
}

export function useApplications(options: UseApplicationsOptions) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['applications', options.type, user?.id, options.jobId],
    queryFn: async () => {
      if (!user?.id) return [];

      let supabaseQuery = supabase
        .from('applications')
        .select(`
          *,
          job:jobs(
            id,
            title,
            location,
            description,
            hourly_rate_min,
            hourly_rate_max
          )
        `);

      if (options.type === 'talent') {
        supabaseQuery = supabaseQuery.eq('talent_id', user.id);
      } else {
        // For business users, get applications for their jobs
        if (options.jobId) {
          supabaseQuery = supabaseQuery.eq('job_id', options.jobId);
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
            return [];
          }
        }
      }

      const { data, error } = await supabaseQuery
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return (data || []).map(app => ({
        ...app,
        last_activity_at: app.updated_at,
        version: 1,
      })) as Application[];
    },
    enabled: !!user?.id,
  });

  return {
    applications: query.data || [],
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    ...query
  };
}
