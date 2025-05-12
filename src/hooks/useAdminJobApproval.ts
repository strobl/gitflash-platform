
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface AdminJob {
  id: string;
  title: string;
  location: string;
  contract_type: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  company_name?: string; // This would come from a join with profiles
}

export function useAdminJobApproval() {
  const [pendingJobs, setPendingJobs] = useState<AdminJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { profile } = useAuth();

  // Check if user is admin
  const isAdmin = profile?.role === 'admin' || profile?.role === 'operator';

  useEffect(() => {
    if (!isAdmin) {
      setError("Nicht autorisiert");
      setIsLoading(false);
      return;
    }
    
    fetchPendingJobs();
  }, [isAdmin]);

  const fetchPendingJobs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          id, title, location, contract_type, 
          created_at, updated_at, user_id
        `)
        .eq('status', 'In Prüfung')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setPendingJobs(data as AdminJob[]);
    } catch (err: any) {
      console.error('Error fetching pending jobs:', err);
      setError(err.message || 'Fehler beim Laden der zu prüfenden Jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const approveJob = async (jobId: string) => {
    if (!isAdmin) {
      toast({
        title: "Fehler",
        description: "Nicht autorisiert",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ 
          status: 'Aktiv',
          approved_at: new Date().toISOString(),
          approved_by: profile?.id
        })
        .eq('id', jobId);
      
      if (error) throw error;
      
      toast({
        title: "Job freigegeben",
        description: "Der Job wurde erfolgreich freigegeben und ist nun öffentlich sichtbar.",
      });
      
      // Update the local state
      setPendingJobs(current => current.filter(job => job.id !== jobId));
    } catch (err: any) {
      console.error('Error approving job:', err);
      toast({
        title: "Fehler",
        description: err.message || "Fehler beim Freigeben des Jobs",
        variant: "destructive",
      });
    }
  };

  const rejectJob = async (jobId: string, reason: string) => {
    if (!isAdmin) {
      toast({
        title: "Fehler",
        description: "Nicht autorisiert",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ 
          status: 'Abgelehnt',
          rejected_at: new Date().toISOString(),
          rejected_by: profile?.id,
          rejection_reason: reason || 'Keine Begründung angegeben'
        })
        .eq('id', jobId);
      
      if (error) throw error;
      
      toast({
        title: "Job abgelehnt",
        description: "Der Job wurde abgelehnt und der Ersteller wurde benachrichtigt.",
      });
      
      // Update the local state
      setPendingJobs(current => current.filter(job => job.id !== jobId));
    } catch (err: any) {
      console.error('Error rejecting job:', err);
      toast({
        title: "Fehler",
        description: err.message || "Fehler beim Ablehnen des Jobs",
        variant: "destructive",
      });
    }
  };

  return {
    pendingJobs,
    isLoading,
    error,
    approveJob,
    rejectJob,
    refetch: fetchPendingJobs
  };
}
