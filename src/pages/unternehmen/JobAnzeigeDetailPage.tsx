
import React from 'react';
import { useParams } from 'react-router-dom';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { useJobDetail } from '@/hooks/useJobDetail';

export default function JobAnzeigeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { job, isLoading, error } = useJobDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex flex-1 overflow-hidden">
          <UnternehmenNavigation />
          <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
            <div className="flex justify-center items-center h-80">
              <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex flex-1 overflow-hidden">
          <UnternehmenNavigation />
          <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-4">Fehler</h1>
              <p className="text-red-600">{error || 'Job nicht gefunden'}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">{job.title}</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-700">Status:</label>
                <span className="ml-2">{job.status}</span>
              </div>
              <div>
                <label className="font-medium text-gray-700">Standort:</label>
                <span className="ml-2">{job.location}</span>
              </div>
              <div>
                <label className="font-medium text-gray-700">Beschreibung:</label>
                <p className="mt-1 text-gray-600">{job.description}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
