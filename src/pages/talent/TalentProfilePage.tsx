
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function TalentProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Talent Profil</h1>
        <p className="mb-4">Profil-Bearbeitung wird noch implementiert.</p>
        <Button asChild>
          <Link to="/talent">Zum Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
