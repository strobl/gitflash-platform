
import { useAuth } from '@/context/AuthContext';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { getRoleRedirectPath } from '@/utils/routingUtils';

export default function Dashboard() {
  const { profile, isAuthenticated, isLoading } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect users with "user" role to their appropriate area
  if (!isLoading && profile?.role === 'user') {
    return <Navigate to="/talent/startseite" replace />;
  }

  // Redirect business users to their appropriate area
  if (!isLoading && profile?.role === 'business') {
    return <Navigate to="/unternehmen" replace />;
  }

  // Show loading state while profile is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  // Only operators should reach this point
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <BusinessDashboard />
      </div>
    </div>
  );
}
