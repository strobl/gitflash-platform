
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Job Detail</h1>
        <p className="mb-4">Diese Seite wird noch implementiert.</p>
        <Button asChild>
          <Link to="/jobs">Zurück zu Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
