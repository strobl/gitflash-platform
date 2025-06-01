
import React from 'react';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';
import { ApplicationsFilter } from '@/components/applications/ApplicationsFilter';
import { useApplicationsWithStats } from '@/hooks/useApplicationsWithStats';

export default function TalentApplicationsPage() {
  const { stats, isLoading } = useApplicationsWithStats('talent');

  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedNavbar />
      <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Meine Bewerbungen</h1>
            <p className="text-gray-600 mt-1">Übersicht über alle deine eingereichten Bewerbungen</p>
            
            {stats && !isLoading && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-600">Gesamt</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-yellow-600">{stats.reviewing}</div>
                  <div className="text-sm text-gray-600">In Prüfung</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600">{stats.interview}</div>
                  <div className="text-sm text-gray-600">Interview</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
                  <div className="text-sm text-gray-600">Angebote</div>
                </div>
              </div>
            )}
          </div>

          <ApplicationsFilter type="talent" stats={stats} />
        </div>
      </main>
    </div>
  );
}
