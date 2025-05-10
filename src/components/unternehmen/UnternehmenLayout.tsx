
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';

export function UnternehmenLayout() {
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
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar navigation */}
        <UnternehmenNavigation />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
