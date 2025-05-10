
import React from 'react';
import { JobsList } from '@/components/unternehmen/jobs/JobsList';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';

const JobsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto">
            <JobsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsPage;
