
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function JobCreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Job erstellen</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-4">Job-Erstellungsformular wird noch implementiert.</p>
            <Button asChild>
              <Link to="/unternehmen/jobs">Zurück zu Jobs</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
