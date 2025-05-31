
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdminJob {
  id: string;
  title: string;
  location: string;
  description: string;
  contract_type: string;
  billing_type: string;
  hourly_rate_min: string;
  hourly_rate_max: string;
  status: string;
  is_public: boolean;
  created_at: string;
  views: number;
  applicants: number;
  user_id: string;
  profiles?: {
    name: string;
  } | null;
}

export const useAdminJobs = () => {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllJobs = async () => {
    setIsLoading(true);
    try {
      console.log('🔍 Fetching all jobs for admin...');
      
      // First, get all jobs without profile join
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Jobs query result:', { data: jobsData, error: jobsError });

      if (jobsError) throw jobsError;

      let formattedJobs: AdminJob[] = [];

      if (jobsData && jobsData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(jobsData.map(job => job.user_id))];
        
        // Fetch profiles for these users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', userIds);

        console.log('👤 Profiles query result:', { data: profilesData, error: profilesError });

        // Create a map of user_id to profile
        const profilesMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            profilesMap.set(profile.id, profile);
          });
        }

        // Format jobs with profile information
        formattedJobs = jobsData.map(job => ({
          id: job.id,
          title: job.title,
          location: job.location,
          description: job.description,
          contract_type: job.contract_type,
          billing_type: job.billing_type,
          hourly_rate_min: job.hourly_rate_min,
          hourly_rate_max: job.hourly_rate_max,
          status: job.status,
          is_public: job.is_public,
          created_at: job.created_at,
          views: job.views || 0,
          applicants: job.applicants || 0,
          user_id: job.user_id,
          profiles: profilesMap.has(job.user_id) ? { name: profilesMap.get(job.user_id).name } : null
        }));
      }

      console.log('✅ Formatted admin jobs:', formattedJobs.length, 'jobs found');
      setJobs(formattedJobs);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching admin jobs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Fehler beim Laden der Jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleJobPublic = async (jobId: string, currentPublic: boolean) => {
    try {
      const { error } = await supabase.rpc('toggle_job_public', {
        _job_id: jobId,
        _public: !currentPublic
      });

      if (error) throw error;

      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, is_public: !currentPublic }
            : job
        )
      );

      toast.success(`Job ist jetzt ${!currentPublic ? 'öffentlich' : 'nicht öffentlich'}`);
    } catch (error: any) {
      console.error('Error toggling job public status:', error);
      toast.error(error.message || 'Fehler beim Ändern des öffentlichen Status');
    }
  };

  const setJobStatus = async (jobId: string, newStatus: 'draft' | 'pending' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase.rpc('set_job_status', {
        _job_id: jobId,
        _status: newStatus
      });

      if (error) throw error;

      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status: newStatus }
            : job
        )
      );

      toast.success(`Job-Status wurde auf "${newStatus}" geändert`);
    } catch (error: any) {
      console.error('Error setting job status:', error);
      toast.error(error.message || 'Fehler beim Ändern des Job-Status');
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refetch: fetchAllJobs,
    toggleJobPublic,
    setJobStatus
  };
};
