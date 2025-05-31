
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getRoleRedirectPath } from "@/utils/routingUtils";

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const navigate = useNavigate();
  
  console.log('🎯 Dashboard: Current state:', {
    isAuthenticated,
    userRole: profile?.role,
    isLoading,
    hasProfile: !!profile,
    currentUrl: window.location.href
  });
  
  useEffect(() => {
    // Nur weiterleiten wenn wir nicht mehr loading sind
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log('🚫 Dashboard: User not authenticated, redirecting to login');
        navigate("/login", { replace: true });
      } else if (isAuthenticated && profile?.role) {
        const redirectPath = getRoleRedirectPath(profile.role);
        console.log('✅ Dashboard: User authenticated with role, redirecting to:', redirectPath);
        navigate(redirectPath, { replace: true });
      } else if (isAuthenticated && !profile) {
        console.log('⚠️ Dashboard: User authenticated but no profile, staying on login for profile setup');
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, isLoading, isAuthenticated, profile?.role]);

  // Während loading: Spinner zeigen
  if (isLoading) {
    console.log('⏳ Dashboard: Still loading, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  // Nach loading: Direct redirects ohne useEffect
  if (!isAuthenticated) {
    console.log('🚫 Dashboard: Not authenticated after loading, direct redirect to login');
    return <Navigate to="/login" replace />;
  }

  if (profile?.role) {
    const redirectPath = getRoleRedirectPath(profile.role);
    console.log('✅ Dashboard: Has role after loading, direct redirect to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated but no profile - back to login for profile creation
  console.log('⚠️ Dashboard: Authenticated but no profile, direct redirect to login');
  return <Navigate to="/login" replace />;
};

export default Dashboard;
