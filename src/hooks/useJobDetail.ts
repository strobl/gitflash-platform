
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { JobDetail, Applicant, JobStats } from '@/components/unternehmen/JobDetail/types';

// Mock data for the job
const mockJobData: Record<string, JobDetail> = {
  '1': {
    id: '1',
    title: 'Bauleiter:in Hochbau',
    location: 'Neubau Projekt A',
    project: 'Neubau Projekt A',
    status: 'Aktiv',
    visibility: 'Öffentlich',
    createdAt: '2025-04-12T10:00:00Z',
    updatedAt: '2025-04-12T10:00:00Z',
    description: '<h2>Jobbeschreibung</h2><p>Als Bauleiter:in Hochbau sind Sie verantwortlich für die Planung, Koordination und Überwachung von Bauprojekten im Hochbau. Sie arbeiten eng mit Architekten, Ingenieuren und Subunternehmern zusammen, um sicherzustellen, dass Projekte termingerecht und innerhalb des Budgets abgeschlossen werden.</p><h3>Ihre Aufgaben:</h3><ul><li>Koordination und Überwachung der Bauarbeiten</li><li>Sicherstellung der Einhaltung von Qualitäts-, Kosten- und Zeitvorgaben</li><li>Durchführung von Baustellenbesprechungen</li><li>Kommunikation mit Bauherren, Behörden und Nachunternehmern</li></ul>',
  },
  '2': {
    id: '2',
    title: 'Jurist:in Baurecht',
    location: 'Sanierung Lager11',
    project: 'Sanierung Lager11',
    status: 'In Prüfung',
    visibility: 'Nur intern',
    createdAt: '2025-04-10T09:15:00Z',
    updatedAt: '2025-04-10T09:15:00Z',
    description: '<h2>Jobbeschreibung</h2><p>Als Jurist:in im Bereich Baurecht werden Sie Teil unseres Rechtsteams mit Fokus auf baurechtliche Fragestellungen. Sie beraten unsere internen Abteilungen und unterstützen bei Vertragsverhandlungen mit Projektpartnern.</p><h3>Ihre Aufgaben:</h3><ul><li>Rechtliche Beratung in allen Fragen des Baurechts</li><li>Erstellung und Prüfung von Verträgen</li><li>Bearbeitung von Mängelansprüchen und Nachträgen</li><li>Unterstützung bei der Durchsetzung von Ansprüchen</li></ul>',
  },
};

// Mock applicant data
const mockApplicants: Record<string, Applicant[]> = {
  '1': [
    { id: '101', name: 'Max Mustermann', appliedAt: '2025-05-01T14:30:00Z', score: 85, status: 'In Bearbeitung' },
    { id: '102', name: 'Laura Schmidt', appliedAt: '2025-04-28T09:15:00Z', score: 92, status: 'Vorstellungsgespräch' },
    { id: '103', name: 'Thomas Weber', appliedAt: '2025-04-25T16:45:00Z', score: 78, status: 'Neu' },
    { id: '104', name: 'Anna Fischer', appliedAt: '2025-04-22T11:20:00Z', score: 88, status: 'Angebot' },
    { id: '105', name: 'Markus Becker', appliedAt: '2025-04-20T08:50:00Z', score: 71, status: 'Abgelehnt' },
  ],
  '2': [
    { id: '201', name: 'Julia Meyer', appliedAt: '2025-05-02T13:10:00Z', score: 90, status: 'Neu' },
    { id: '202', name: 'Stefan Müller', appliedAt: '2025-04-29T10:45:00Z', score: 83, status: 'In Bearbeitung' },
    { id: '203', name: 'Claudia Hoffmann', appliedAt: '2025-04-26T15:30:00Z', score: 95, status: 'Vorstellungsgespräch' },
  ],
};

// Mock statistics data
const mockStats: Record<string, JobStats> = {
  '1': {
    views: 245,
    applications: 5,
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
    ],
  },
  '2': {
    views: 156,
    applications: 3,
    averageScore: 89.3,
    viewsOverTime: [
      { date: '2025-04-10', views: 8 },
      { date: '2025-04-11', views: 12 },
      { date: '2025-04-12', views: 10 },
      { date: '2025-04-13', views: 14 },
      { date: '2025-04-14', views: 16 },
      { date: '2025-04-15', views: 19 },
      { date: '2025-04-16', views: 15 },
      { date: '2025-04-17', views: 12 },
      { date: '2025-04-18', views: 10 },
      { date: '2025-04-19', views: 11 },
      { date: '2025-04-20', views: 14 },
      { date: '2025-04-21', views: 15 },
    ],
    applicationsOverTime: [
      { date: '2025-04-18', applications: 0 },
      { date: '2025-04-19', applications: 0 },
      { date: '2025-04-20', applications: 0 },
      { date: '2025-04-21', applications: 0 },
      { date: '2025-04-22', applications: 0 },
      { date: '2025-04-23', applications: 0 },
      { date: '2025-04-24', applications: 1 },
      { date: '2025-04-25', applications: 0 },
      { date: '2025-04-26', applications: 1 },
      { date: '2025-04-27', applications: 0 },
      { date: '2025-04-28', applications: 0 },
      { date: '2025-04-29', applications: 1 },
    ],
  },
};

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
        // In a real application, this would be an API call
        // await fetch(`/api/jobs/${jobId}`) etc.
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (jobId in mockJobData) {
          setJob(mockJobData[jobId]);
          setApplicants(mockApplicants[jobId] || []);
          setStats(mockStats[jobId] || null);
        } else {
          setError("Job nicht gefunden");
        }
      } catch (err) {
        setError("Fehler beim Laden der Jobdaten");
        toast.error("Fehler beim Laden der Jobdaten");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const updateJobStatus = async (status: JobDetail['status']) => {
    if (!job) return false;

    try {
      // Optimistic UI update
      setJob(prevJob => prevJob ? { ...prevJob, status } : null);

      // In a real application, this would be an API call
      // await fetch(`/api/jobs/${jobId}`, { 
      //   method: 'PATCH', 
      //   body: JSON.stringify({ status }) 
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`Job wurde als "${status}" markiert`);
      return true;
    } catch (err) {
      // Revert optimistic update on failure
      setJob(mockJobData[job.id]);
      toast.error("Statusänderung fehlgeschlagen");
      return false;
    }
  };

  const duplicateJob = async () => {
    if (!job) return;
    
    try {
      // In a real application, this would be an API call
      // await fetch(`/api/jobs/${jobId}/duplicate`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Job wurde dupliziert");
    } catch (err) {
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
  // Additional hook for applicant-specific operations
  // This could be expanded for more complex applicant management
  
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
