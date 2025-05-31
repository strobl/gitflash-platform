
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PublicJob {
  id: string;
  title: string;
  location: string;
  description: string;
  contract_type: string;
  billing_type: string;
  hourly_rate_min: string;
  hourly_rate_max: string;
  created_at: string;
  views: number;
  applicants: number;
}

export function usePublicJobs() {
  const query = useQuery({
    queryKey: ['public-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_public', true)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching public jobs:', error);
        throw error;
      }

      return (data || []) as PublicJob[];
    },
  });

  return {
    jobs: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    ...query
  };
}
