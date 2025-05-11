
import React from 'react';
import { CreateJobForm } from '@/components/unternehmen/createJob/CreateJobForm';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';

const CreateJobPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SharedNavbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-6 lg:px-8 max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Job erstellen</h1>
        <CreateJobForm />
      </main>
    </div>
  );
};

export default CreateJobPage;
