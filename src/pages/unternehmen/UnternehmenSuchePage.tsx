
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';

export default function UnternehmenSuchePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Talentsuche</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500">Talentsuche-Komponente wird hier eingebunden.</p>
        </div>
      </div>
    </div>
  );
}
