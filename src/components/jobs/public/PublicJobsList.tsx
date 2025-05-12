
import React, { useState } from 'react';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { PublicJobCard } from './PublicJobCard';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublicJobsListProps {
  searchTerm?: string;
  locationFilter?: string;
}

export function PublicJobsList({ searchTerm = '', locationFilter = '' }: PublicJobsListProps) {
  const { jobs, isLoading, error } = usePublicJobs();
  const [visibleJobs, setVisibleJobs] = useState(6);
  
  // Filter jobs based on search term and location
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === '' ||
      (job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase()));
    
    return matchesSearch && matchesLocation;
  });

  const loadMore = () => {
    setVisibleJobs(prev => prev + 6);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-gitflash-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-md bg-red-50 mb-4">
        <h3 className="text-lg font-medium">Fehler beim Laden der Jobs</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Jobs gefunden</h3>
        <p className="text-gray-500">
          Leider wurden keine Jobs gefunden, die Ihren Filterkriterien entsprechen.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.slice(0, visibleJobs).map(job => (
          <PublicJobCard key={job.id} job={job} />
        ))}
      </div>
      
      {visibleJobs < filteredJobs.length && (
        <div className="mt-10 text-center">
          <Button
            onClick={loadMore}
            variant="outline"
            className="px-6 py-2"
          >
            Mehr Jobs laden
          </Button>
        </div>
      )}
    </div>
  );
}
