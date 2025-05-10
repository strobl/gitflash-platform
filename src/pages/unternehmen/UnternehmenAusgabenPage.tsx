
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { AusgabenPage } from '@/components/ausgaben/AusgabenPage';

export default function UnternehmenAusgabenPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Ausgaben</h1>
        <AusgabenPage />
      </div>
    </div>
  );
}
