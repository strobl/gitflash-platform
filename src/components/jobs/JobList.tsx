
import React from 'react';
import { JobListItem } from './JobListItem';
import { PublicJob } from '@/hooks/usePublicJobs';
import { Briefcase } from 'lucide-react';

interface JobListProps {
  jobs: PublicJob[];
  title: string;
}

export function JobList({ jobs, title }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 max-w-lg mx-auto">
          <Briefcase className="w-16 h-16 text-gitflash-accent mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gitflash-primary mb-4">
            Keine Stellenanzeigen gefunden
          </h3>
          <p className="text-gitflash-secondary">
            Versuchen Sie andere Suchkriterien oder entfernen Sie Filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
          <JobListItem job={job} />
        </div>
      ))}
    </div>
  );
}
