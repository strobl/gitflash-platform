
import React from 'react';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';
import { ContractsOverview } from '@/components/contracts/ContractsOverview';

export default function UnternehmenContractsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedNavbar />
      <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Verträge</h1>
            <p className="text-gray-600 mt-1">
              Übersicht über alle aktiven Verträge und Projekte
            </p>
          </div>

          <ContractsOverview />
        </div>
      </main>
    </div>
  );
}
