import React from 'react';
import JobanzeigeErstellen from '@/components/jobs/JobanzeigeErstellen';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <JobanzeigeErstellen />
    </div>
  );
};

export default Index;
