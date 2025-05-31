
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
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log('🚫 Dashboard: User not authenticated, redirecting to login');
        navigate("/login", { replace: true });
      } else if (profile?.role) {
        const redirectPath = getRoleRedirectPath(profile.role);
        console.log('✅ Dashboard: Redirecting to role-specific path:', redirectPath);
        navigate(redirectPath, { replace: true });
      } else if (isAuthenticated && !profile) {
        console.log('⚠️ Dashboard: User authenticated but no profile found, redirecting to login for profile creation');
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, isLoading, isAuthenticated, profile]);

  // Show loading while auth and profile are being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  // Fallback redirect if something goes wrong
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role) {
    const redirectPath = getRoleRedirectPath(profile.role);
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated but no profile, redirect to login
  return <Navigate to="/login" replace />;
};

export default Dashboard;
