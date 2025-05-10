
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { TeamDashboard } from '@/components/team/TeamDashboard';

export default function UnternehmenTeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Team Verwaltung</h1>
        <TeamDashboard />
      </div>
    </div>
  );
}
