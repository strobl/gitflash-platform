
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { JobDetail, Applicant, JobStats } from '@/components/unternehmen/JobDetail/types';

export function useJobDetail(jobId: string | undefined) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (jobError) throw jobError;

        if (!jobData) {
          setError("Job nicht gefunden");
          return;
        }

        // Map database job to JobDetail type
        const mappedJob: JobDetail = {
          id: jobData.id,
          title: jobData.title,
          location: jobData.location,
          project: jobData.location, // Using location as project for now
          status: mapJobStatus(jobData.status),
          visibility: jobData.is_public ? 'Öffentlich' : 'Nur intern',
          createdAt: jobData.created_at,
          updatedAt: jobData.updated_at,
          description: jobData.description || ''
        };

        setJob(mappedJob);

        // Fetch applications for this job
        const { data: applicationsData, error: applicationsError } = await supabase
          .from('applications')
          .select('*')
          .eq('job_id', jobId);

        if (applicationsError) {
          console.error('Error fetching applications:', applicationsError);
          // Don't throw error, just set empty array
          setApplicants([]);
        } else {
          // Map applications to Applicant type
          const mappedApplicants: Applicant[] = (applicationsData || []).map(app => ({
            id: app.id,
            name: `Bewerber #${app.talent_id.slice(-8)}`, // Anonymized for now
            appliedAt: app.created_at,
            score: Math.floor(Math.random() * 40) + 60, // Mock score for now
            status: mapApplicationStatus(app.status)
          }));

          setApplicants(mappedApplicants);
        }

        // Create mock stats based on job data
        const mockStats: JobStats = {
          views: jobData.views || 0,
          applications: applicationsData?.length || 0,
          averageScore: 75 + Math.random() * 20, // Mock average score
          viewsOverTime: generateMockViewsData(jobData.created_at),
          applicationsOverTime: generateMockApplicationsData(jobData.created_at, applicationsData?.length || 0)
        };

        setStats(mockStats);

      } catch (err) {
        console.error('Error fetching job details:', err);
        setError("Fehler beim Laden der Jobdaten");
        toast.error("Fehler beim Laden der Jobdaten");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const mapJobStatus = (status: string): JobDetail['status'] => {
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

  const mapApplicationStatus = (status: string): string => {
    switch (status) {
      case 'new':
        return 'Neu';
      case 'reviewing':
        return 'In Bearbeitung';
      case 'interview':
        return 'Vorstellungsgespräch';
      case 'offer':
        return 'Angebot';
      case 'rejected':
        return 'Abgelehnt';
      case 'hired':
        return 'Eingestellt';
      default:
        return 'Neu';
    }
  };

  const generateMockViewsData = (createdAt: string) => {
    const startDate = new Date(createdAt);
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 30) + 10
      });
    }
    
    return data;
  };

  const generateMockApplicationsData = (createdAt: string, totalApplications: number) => {
    const startDate = new Date(createdAt);
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        applications: i < totalApplications ? (Math.random() > 0.7 ? 1 : 0) : 0
      });
    }
    
    return data;
  };

  const updateJobStatus = async (status: JobDetail['status']) => {
    if (!job) return false;

    try {
      const dbStatus = mapStatusToDb(status);
      
      const { error } = await supabase
        .from('jobs')
        .update({ status: dbStatus })
        .eq('id', job.id);

      if (error) throw error;

      // Optimistic UI update
      setJob(prevJob => prevJob ? { ...prevJob, status } : null);
      
      toast.success(`Job wurde als "${status}" markiert`);
      return true;
    } catch (err) {
      console.error('Error updating job status:', err);
      toast.error("Statusänderung fehlgeschlagen");
      return false;
    }
  };

  const mapStatusToDb = (status: JobDetail['status']): string => {
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

  const duplicateJob = async () => {
    if (!job) return;
    
    try {
      const { data: jobData, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', job.id)
        .single();

      if (fetchError) throw fetchError;

      const { error: insertError } = await supabase
        .from('jobs')
        .insert({
          title: `${jobData.title} (Kopie)`,
          location: jobData.location,
          description: jobData.description,
          contract_type: jobData.contract_type,
          billing_type: jobData.billing_type,
          hourly_rate_min: jobData.hourly_rate_min,
          hourly_rate_max: jobData.hourly_rate_max,
          referral_bonus: jobData.referral_bonus,
          interview: jobData.interview,
          form: jobData.form,
          rejection_email: jobData.rejection_email,
          automatic_communication: jobData.automatic_communication,
          automatic_redirect: jobData.automatic_redirect,
          status: 'draft',
          user_id: jobData.user_id
        });

      if (insertError) throw insertError;
      
      toast.success("Job wurde dupliziert");
    } catch (err) {
      console.error('Error duplicating job:', err);
      toast.error("Duplizieren fehlgeschlagen");
    }
  };

  return {
    job,
    applicants,
    stats,
    isLoading,
    error,
    updateJobStatus,
    duplicateJob
  };
}

export function useApplicants() {
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
