
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';

const CompanyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Unternehmen Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Jobs verwalten</h2>
            <p className="text-gray-600 mb-4">Erstellen und verwalten Sie Ihre Stellenangebote</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Interviews erstellen</h2>
            <p className="text-gray-600 mb-4">Erstellen Sie personalisierte Interview-Szenarien</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Talente entdecken</h2>
            <p className="text-gray-600 mb-4">Durchsuchen Sie unsere Datenbank von qualifizierten Fachkräften</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
