
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { ApplicationsList } from '@/components/applications/ApplicationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TalentApplicationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Meine Bewerbungen</h1>
              <p className="text-gray-600 mt-1">Übersicht über alle Ihre Bewerbungen und deren Status</p>
            </div>
            <Button asChild>
              <Link to="/jobs">
                <PlusCircle className="mr-2 h-4 w-4" />
                Neue Bewerbung
              </Link>
            </Button>
          </div>

          <ApplicationsList type="talent" />
        </div>
      </div>
    </div>
  );
}
