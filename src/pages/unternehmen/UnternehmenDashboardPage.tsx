
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';

export default function UnternehmenDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Unternehmen Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p>Dashboard-Inhalte werden noch implementiert.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
