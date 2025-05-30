
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

export const usePublicJobs = () => {
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPublicJobs = async () => {
    setIsLoading(true);
    try {
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'approved')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedJobs: PublicJob[] = (jobsData || []).map(job => ({
        id: job.id,
        title: job.title,
        location: job.location,
        description: job.description,
        contract_type: job.contract_type,
        billing_type: job.billing_type,
        hourly_rate_min: job.hourly_rate_min,
        hourly_rate_max: job.hourly_rate_max,
        created_at: job.created_at,
        views: job.views || 0,
        applicants: job.applicants || 0
      }));

      setJobs(formattedJobs);
      setError(null);
    } catch (err) {
      console.error('Error fetching public jobs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Fehler beim Laden der Stellenanzeigen');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refetch: fetchPublicJobs
  };
};
