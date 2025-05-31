
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getRoleRedirectPath } from "@/utils/routingUtils";

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, profile } = useAuth();
  
  console.log('🎯 Dashboard: Current state:', {
    isAuthenticated,
    userRole: profile?.role,
    isLoading,
    hasProfile: !!profile,
    currentUrl: window.location.href
  });
  
  // Während loading: Spinner zeigen
  if (isLoading) {
    console.log('⏳ Dashboard: Still loading, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  // Nach loading: Klare Redirect-Logik ohne useEffect
  if (!isAuthenticated) {
    console.log('🚫 Dashboard: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (profile?.role) {
    const redirectPath = getRoleRedirectPath(profile.role);
    console.log('✅ Dashboard: Has role, redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated but no profile - back to login for profile creation
  console.log('⚠️ Dashboard: Authenticated but no profile, redirecting to login');
  return <Navigate to="/login" replace />;
};

export default Dashboard;
