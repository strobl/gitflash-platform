
import { useAuth } from '@/context/AuthContext';
import { TalentDashboard } from '@/components/dashboard/TalentDashboard';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';

export default function Dashboard() {
  const { profile, isAuthenticated, isLoading } = useAuth();
  
  // For "user" role, redirect to talent page
  useEffect(() => {
    if (profile?.role === 'user' && !isLoading) {
      console.log("Dashboard: User role detected, redirecting to /talent");
    }
  }, [profile, isLoading]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect users with "user" role to /talent page
  if (!isLoading && profile?.role === 'user') {
    return <Navigate to="/talent" replace />;
  }

  // Show loading state while profile is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <BusinessDashboard />
      </div>
    </div>
  );
}
