
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
  interview_scheduled_at?: string;
  offer_response_deadline?: string;
  talent_response?: string;
  last_notification_sent?: string;
  job?: {
    id: string;
    title: string;
    location: string;
    user_id: string;
  };
}

interface UseApplicationsParams {
  type: 'talent' | 'business';
  jobId?: string;
}

export function useApplications({ type, jobId }: UseApplicationsParams) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['applications', type, jobId, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      let query = supabase
        .from('applications')
        .select(`
          *,
          job:jobs(id, title, location, user_id)
        `)
        .order('created_at', { ascending: false });

      if (type === 'talent') {
        query = query.eq('talent_id', user.id);
      } else if (type === 'business') {
        if (jobId) {
          query = query.eq('job_id', jobId);
        } else {
          // Get applications for all jobs created by this business user
          query = query.filter('job.user_id', 'eq', user.id);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return data as Application[];
    },
    enabled: !!user?.id,
  });
}
