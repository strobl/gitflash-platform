
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { AusgabenOverview } from '@/components/unternehmen/Ausgaben/AusgabenOverview';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UnternehmenAusgabenPage() {
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <AusgabenOverview />
      </div>
    </div>
  );
}
