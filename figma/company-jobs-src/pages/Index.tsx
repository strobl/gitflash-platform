import React from 'react';
import JobListings from '@/components/jobs/JobListings';

const Index: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <JobListings />
    </main>
  );
};

export default Index;
