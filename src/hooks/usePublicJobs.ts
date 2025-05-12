
import { useState, useEffect } from 'react';
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
  user_id: string;
}

export function usePublicJobs() {
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'Aktiv')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setJobs(data as PublicJob[]);
      } catch (err: any) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Fehler beim Laden der Jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, isLoading, error };
}
