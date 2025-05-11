
import React from 'react';
import { CreateJobForm } from '@/components/unternehmen/createJob/CreateJobForm';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';

const CreateJobPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SharedNavbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-8 lg:px-8 max-w-4xl">
        <CreateJobForm />
      </main>
    </div>
  );
};

export default CreateJobPage;
