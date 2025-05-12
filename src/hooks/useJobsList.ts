
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define job item type
export interface JobItem {
  id: string;
  title: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
  applicants: number;
  posted: string;
  views: number;
  location?: string;
  description?: string;
}

export const useJobsList = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Function to fetch jobs from Supabase
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // Get user session to get the user ID for filtering jobs
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setJobs([]);
        setError(new Error('Sie müssen angemeldet sein, um Jobs zu sehen'));
        return;
      }
      
      // Fetch jobs created by the current user
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        throw fetchError;
      }

      // Map database results to JobItem interface
      const formattedJobs: JobItem[] = data?.map(job => ({
        id: job.id,
        title: job.title,
        status: job.status as JobItem['status'],
        applicants: job.applicants || 0,
        posted: new Date(job.created_at).toLocaleDateString('de-DE'),
        views: job.views || 0,
        location: job.location,
        description: job.description
      })) || [];
      
      setJobs(formattedJobs);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err : new Error('Beim Laden der Jobs ist ein unbekannter Fehler aufgetreten'));
      toast({
        title: "Fehler beim Laden der Jobs",
        description: err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update job status
  const updateJobStatus = async (id: string, newStatus: JobItem['status']) => {
    try {
      // Optimistic update
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === id ? { ...job, status: newStatus } : job
        )
      );

      // Update in Supabase
      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) {
        throw error;
      }

      toast({
        title: "Status aktualisiert",
        description: `Der Job-Status wurde auf ${newStatus} geändert.`,
      });
    } catch (err) {
      console.error('Error updating job status:', err);
      // Revert optimistic update on error
      await fetchJobs();
      toast({
        title: "Fehler beim Aktualisieren des Status",
        description: err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten',
        variant: "destructive",
      });
      throw err;
    }
  };

  // Function to delete a job
  const deleteJob = async (id: string) => {
    try {
      // Optimistic update
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));

      // Delete from Supabase
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }

      toast({
        title: "Job gelöscht",
        description: "Die Jobanzeige wurde erfolgreich gelöscht.",
      });
    } catch (err) {
      console.error('Error deleting job:', err);
      // Revert optimistic update on error
      await fetchJobs();
      toast({
        title: "Fehler beim Löschen des Jobs",
        description: err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten',
        variant: "destructive",
      });
      throw err;
    }
  };

  // Fetch jobs on component mount
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
