
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gitflash-primary mb-4">
            GitFlash - Ihr Talent-Marktplatz
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Verbinden Sie Talente mit Unternehmen in der Baubranche
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/login">Anmelden</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/register">Registrieren</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
