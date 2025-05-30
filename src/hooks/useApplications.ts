
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { ApplicationRow, ApplicationHistoryRow, JobRow, ProfileRow } from '@/types/applications';

export interface ApplicationHistoryItem {
  id: number;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  changed_at: string;
  profile?: {
    name: string;
  };
}

export interface Application extends ApplicationRow {
  job?: {
    title: string;
    location: string;
  };
  history?: ApplicationHistoryItem[];
}

interface UseApplicationsOptions {
  type: 'talent' | 'recruiter';
  jobId?: string;
}

export function useApplications(options: UseApplicationsOptions = { type: 'talent' }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch applications
  async function fetchApplications() {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('applications' as any)
        .select(`
          id, job_id, talent_id, status, cover_letter, 
          resume_url, custom_q_a, version, last_activity_at, 
          deleted_at, created_at,
          job:jobs(title, location)
        `)
        .is('deleted_at', null); // Only active applications
        
      // Filter based on the type of user
      if (options.type === 'recruiter' && options.jobId) {
        // For recruiters, filter by job id
        query = query.eq('job_id', options.jobId);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw new Error(fetchError.message);
      
      if (data) {
        // For each application, fetch its history
        const appsWithHistory = await Promise.all(data.map(async (app: any) => {
          const { data: history, error: historyError } = await supabase
            .from('application_status_history' as any)
            .select(`
              id, application_id, old_status, new_status, 
              changed_by, notes, changed_at,
              profile:profiles(name)
            `)
            .eq('application_id', app.id)
            .order('changed_at', { ascending: false });
            
          if (historyError) {
            console.error('Error fetching application history:', historyError);
            return app; // Return app without history if there's an error
          }
          
          return { ...app, history };
        }));
        
        setApplications(appsWithHistory);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching applications');
    } finally {
      setLoading(false);
    }
  }

  // Set up realtime subscription for status changes
  useEffect(() => {
    fetchApplications();
    
    // Set up realtime subscription for application status changes
    const channel = supabase
      .channel('application-status')
      .on('broadcast', { event: 'status_changed' }, (payload) => {
        // When a status change is broadcasted
        toast({
          title: 'Bewerbungsstatus geändert',
          description: `Status für Stelle "${payload.payload.job_title}" zu "${payload.payload.new_status}" geändert.`,
          variant: 'default',
        });
        
        // Refresh applications data
        fetchApplications();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [options.type, options.jobId]);

  return {
    applications,
    loading,
    error,
    refresh: fetchApplications
  };
}
