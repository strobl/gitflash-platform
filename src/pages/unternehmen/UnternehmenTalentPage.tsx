
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { useParams } from 'react-router-dom';

export default function UnternehmenTalentPage() {
  const { id } = useParams();
  
  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Talent Profil</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500">Talent Profil für ID: {id}</p>
          <p className="text-gray-500">Profil-Komponente wird hier eingebunden.</p>
        </div>
      </div>
    </div>
  );
}
