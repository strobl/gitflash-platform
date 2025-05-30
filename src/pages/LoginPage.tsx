
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Anmelden</h1>
        <p className="text-center text-gray-600 mb-4">
          Login-Funktionalität wird implementiert
        </p>
        <Button asChild className="w-full">
          <Link to="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}
