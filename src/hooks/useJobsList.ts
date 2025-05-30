
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JobItem {
  id: string;
  title: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
  applicants: number;
  posted: string;
  views: number;
  location: string;
  description: string;
}

export const useJobsList = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedJobs: JobItem[] = (jobsData || []).map(job => ({
        id: job.id,
        title: job.title,
        status: mapJobStatus(job.status),
        applicants: job.applicants || 0,
        posted: new Date(job.created_at).toLocaleDateString('de-DE'),
        views: job.views || 0,
        location: job.location,
        description: job.description
      }));

      setJobs(formattedJobs);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Fehler beim Laden der Jobanzeigen');
    } finally {
      setIsLoading(false);
    }
  };

  const mapJobStatus = (status: string): JobItem['status'] => {
    switch (status) {
      case 'approved':
        return 'Aktiv';
      case 'pending':
        return 'In Prüfung';
      case 'draft':
        return 'Entwurf';
      case 'closed':
        return 'Geschlossen';
      default:
        return 'Entwurf';
    }
  };

  const updateJobStatus = async (id: string, newStatus: JobItem['status']) => {
    try {
      const dbStatus = mapStatusToDb(newStatus);
      
      const { error } = await supabase
        .from('jobs')
        .update({ status: dbStatus })
        .eq('id', id);

      if (error) throw error;

      // Optimistic update
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === id ? { ...job, status: newStatus } : job
        )
      );

      toast.success(`Job-Status auf "${newStatus}" geändert`);
    } catch (err) {
      console.error('Error updating job status:', err);
      toast.error('Fehler beim Aktualisieren des Job-Status');
      await fetchJobs(); // Revert optimistic update
      throw err;
    }
  };

  const mapStatusToDb = (status: JobItem['status']): string => {
    switch (status) {
      case 'Aktiv':
        return 'approved';
      case 'In Prüfung':
        return 'pending';
      case 'Entwurf':
        return 'draft';
      case 'Geschlossen':
        return 'closed';
      default:
        return 'draft';
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Optimistic update
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      toast.success('Jobanzeige gelöscht');
    } catch (err) {
      console.error('Error deleting job:', err);
      toast.error('Fehler beim Löschen der Jobanzeige');
      await fetchJobs(); // Revert optimistic update
      throw err;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    updateJobStatus,
    deleteJob,
    refetch: fetchJobs
  };
};
