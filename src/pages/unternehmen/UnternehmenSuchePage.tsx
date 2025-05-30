
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UnternehmenSuchePage() {
  const { isAuthenticated, profile, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has business role
  if (profile?.role !== 'business' && profile?.role !== 'operator') {
    return <Navigate to="/talent" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Talentsuche</h1>
              <p className="text-gray-600">Finden Sie die besten Talente für Ihr Unternehmen</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">Talentsuche-Funktionalität wird hier implementiert.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
