
import { useState, useEffect } from 'react';

// Define job item type
export interface JobItem {
  id: number;
  title: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
  applicants: number;
  posted: string;
  views: number;
}

// Mock data for jobs
const mockJobs: JobItem[] = [
  { 
    id: 1, 
    title: 'Bauleiter:in Hochbau', 
    status: 'Aktiv', 
    applicants: 12, 
    posted: '12.04.2025',
    views: 345
  },
  { 
    id: 2, 
    title: 'Jurist:in Baurecht', 
    status: 'In Prüfung', 
    applicants: 5, 
    posted: '10.04.2025',
    views: 178
  },
  { 
    id: 3, 
    title: 'BIM-Koordinator:in', 
    status: 'Entwurf', 
    applicants: 0, 
    posted: '08.04.2025',
    views: 0
  },
];

export const useJobsList = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch jobs from API (mock for now)
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setJobs(mockJobs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update job status
  const updateJobStatus = async (id: number, newStatus: JobItem['status']) => {
    try {
      // Optimistic update
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === id ? { ...job, status: newStatus } : job
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would handle the API response here
      // and revert the optimistic update if it failed
    } catch (err) {
      // Revert optimistic update on error
      await fetchJobs();
      throw err;
    }
  };

  // Function to delete a job
  const deleteJob = async (id: number) => {
    try {
      // Optimistic update
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, handle API response here
    } catch (err) {
      // Revert optimistic update on error
      await fetchJobs();
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
