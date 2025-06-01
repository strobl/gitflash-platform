
import React from 'react';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';
import { ApplicationsFilter } from '@/components/applications/ApplicationsFilter';

export default function TalentApplicationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedNavbar />
      <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Meine Bewerbungen</h1>
            <p className="text-gray-600 mt-1">Übersicht über alle deine eingereichten Bewerbungen</p>
          </div>

          <ApplicationsFilter type="talent" />
        </div>
      </main>
    </div>
  );
}
