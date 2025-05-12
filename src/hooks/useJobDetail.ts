
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface JobDetail {
  id: string;
  title: string;
  location: string;
  description: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen' | 'Abgelehnt';
  contract_type: string;
  billing_type: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  views: number;
  applicants: number;
  approved_at?: string;
  approved_by?: string;
  rejected_at?: string;
  rejected_by?: string;
  rejection_reason?: string;
}

export interface Applicant {
  id: string;
  name: string;
  appliedAt: string;
  score: number;
  status: 'Neu' | 'In Bearbeitung' | 'Vorstellungsgespräch' | 'Angebot' | 'Abgelehnt' | 'Eingestellt';
  profilePic?: string;
}

export interface JobStats {
  views: number;
  applications: number;
  averageScore: number;
  viewsOverTime: {
    date: string;
    views: number;
  }[];
  applicationsOverTime: {
    date: string;
    applications: number;
  }[];
}

export function useJobDetail(jobId: string | undefined) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin' || profile?.role === 'operator';

  useEffect(() => {
    if (!jobId) {
      setError("Keine Job-ID angegeben");
      setIsLoading(false);
      return;
    }

    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch job data from Supabase
        const { data, error: jobError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();
        
        if (jobError) throw jobError;
        
        if (!data) {
          setError("Job nicht gefunden");
          return;
        }

        setJob(data as JobDetail);
        
        // For now we'll use mock data for applicants and stats
        // In a real implementation, you would fetch these from Supabase as well
        if (data.id === '1') {
          setApplicants([
            { id: '101', name: 'Max Mustermann', appliedAt: '2025-05-01T14:30:00Z', score: 85, status: 'In Bearbeitung' },
            { id: '102', name: 'Laura Schmidt', appliedAt: '2025-04-28T09:15:00Z', score: 92, status: 'Vorstellungsgespräch' },
            { id: '103', name: 'Thomas Weber', appliedAt: '2025-04-25T16:45:00Z', score: 78, status: 'Neu' },
            { id: '104', name: 'Anna Fischer', appliedAt: '2025-04-22T11:20:00Z', score: 88, status: 'Angebot' },
            { id: '105', name: 'Markus Becker', appliedAt: '2025-04-20T08:50:00Z', score: 71, status: 'Abgelehnt' },
          ]);
          
          setStats({
            views: data.views || 0,
            applications: data.applicants || 0,
            averageScore: 82.8,
            viewsOverTime: [
              { date: '2025-04-12', views: 12 },
              { date: '2025-04-13', views: 18 },
              { date: '2025-04-14', views: 15 },
              { date: '2025-04-15', views: 24 },
              { date: '2025-04-16', views: 32 },
              { date: '2025-04-17', views: 28 },
              { date: '2025-04-18', views: 22 },
              { date: '2025-04-19', views: 19 },
              { date: '2025-04-20', views: 15 },
              { date: '2025-04-21', views: 18 },
              { date: '2025-04-22', views: 21 },
              { date: '2025-04-23', views: 25 },
            ],
            applicationsOverTime: [
              { date: '2025-04-15', applications: 0 },
              { date: '2025-04-16', applications: 0 },
              { date: '2025-04-17', applications: 1 },
              { date: '2025-04-18', applications: 0 },
              { date: '2025-04-19', applications: 0 },
              { date: '2025-04-20', applications: 1 },
              { date: '2025-04-21', applications: 0 },
              { date: '2025-04-22', applications: 1 },
              { date: '2025-04-23', applications: 0 },
              { date: '2025-04-24', applications: 0 },
              { date: '2025-04-25', applications: 1 },
              { date: '2025-04-26', applications: 0 },
              { date: '2025-04-27', applications: 0 },
              { date: '2025-04-28', applications: 1 },
              { date: '2025-04-29', applications: 0 },
              { date: '2025-04-30', applications: 0 },
              { date: '2025-05-01', applications: 1 },
            ]
          });
        } else {
          setApplicants([]);
          setStats({
            views: data.views || 0,
            applications: data.applicants || 0,
            averageScore: 0,
            viewsOverTime: [],
            applicationsOverTime: []
          });
        }

        // Increment the view counter
        await supabase
          .from('jobs')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', jobId);

      } catch (err: any) {
        console.error('Error fetching job:', err);
        setError(err.message || "Fehler beim Laden der Jobdaten");
        toast.error("Fehler beim Laden der Jobdaten");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const updateJobStatus = async (status: JobDetail['status'], reason?: string) => {
    if (!job) return false;

    try {
      // Optimistic UI update
      setJob(prevJob => prevJob ? { ...prevJob, status } : null);

      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      };
      
      // Add additional fields based on the status
      if (status === 'Aktiv') {
        updateData.approved_at = new Date().toISOString();
        updateData.approved_by = profile?.id;
      } else if (status === 'Abgelehnt') {
        updateData.rejected_at = new Date().toISOString();
        updateData.rejected_by = profile?.id;
        if (reason) updateData.rejection_reason = reason;
      }

      const { error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', job.id);
      
      if (error) throw error;
      
      toast.success(`Job wurde als "${status}" markiert`);
      return true;
    } catch (err: any) {
      // Revert optimistic update on failure
      const { data } = await supabase.from('jobs').select('*').eq('id', job.id).single();
      if (data) setJob(data as JobDetail);
      
      toast.error(`Statusänderung fehlgeschlagen: ${err.message}`);
      return false;
    }
  };

  const duplicateJob = async () => {
    if (!job || !profile) return;
    
    try {
      // Create a new job based on the current one
      const { id, status, views, applicants, created_at, updated_at, approved_at, approved_by, rejected_at, rejected_by, rejection_reason, ...jobData } = job;
      
      const newJobData = {
        ...jobData,
        title: `Kopie von: ${job.title}`,
        status: 'Entwurf',
        user_id: profile.id,
        views: 0,
        applicants: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('jobs')
        .insert(newJobData)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Job wurde dupliziert");
      return data.id;
    } catch (err: any) {
      toast.error(`Duplizieren fehlgeschlagen: ${err.message}`);
      return null;
    }
  };

  return {
    job,
    applicants,
    stats,
    isLoading,
    error,
    updateJobStatus,
    duplicateJob,
    isAdmin
  };
}

export function useApplicants() {
  // Additional hook for applicant-specific operations  
  const sortApplicants = (applicants: Applicant[], field: keyof Applicant, direction: 'asc' | 'desc') => {
    return [...applicants].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] < b[field] ? -1 : 1;
      } else {
        return a[field] > b[field] ? -1 : 1;
      }
    });
  };

  const filterApplicants = (applicants: Applicant[], searchTerm: string) => {
    if (!searchTerm) return applicants;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    return applicants.filter(applicant => 
      applicant.name.toLowerCase().includes(lowerCaseSearch) ||
      applicant.status.toLowerCase().includes(lowerCaseSearch)
    );
  };

  return {
    sortApplicants,
    filterApplicants
  };
}
