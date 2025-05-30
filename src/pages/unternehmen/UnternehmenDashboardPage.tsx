
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { JobsList } from '@/components/unternehmen/jobs/JobsList';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UnternehmenDashboardPage() {
  const { isAuthenticated, profile, isLoading } = useAuth();
  
  console.log('🏢 UnternehmenDashboard: Current state:', {
    isAuthenticated,
    userRole: profile?.role,
    isLoading,
    currentUrl: window.location.href
  });
  
  // Show loading state
  if (isLoading) {
    console.log('⏳ UnternehmenDashboard: Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    console.log('🚫 UnternehmenDashboard: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has business role
  if (profile?.role !== 'business' && profile?.role !== 'operator') {
    console.log('❌ UnternehmenDashboard: User role not authorized:', profile?.role, 'redirecting to talent');
    return <Navigate to="/talent" replace />;
  }

  console.log('✅ UnternehmenDashboard: All checks passed, rendering dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Willkommen in Ihrem Unternehmen-Dashboard</p>
            </div>
            <JobsList />
          </div>
        </main>
      </div>
    </div>
  );
}
