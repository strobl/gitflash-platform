
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getRoleRedirectPath } from "@/utils/routingUtils";

const TalentPage: React.FC = () => {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth to finish loading before making decisions
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      } else if (profile?.role !== 'user') {
        // If authenticated but not a talent user, redirect to appropriate area
        navigate(getRoleRedirectPath(profile?.role), { replace: true });
      } else {
        // If authenticated talent user, redirect to talent startseite
        navigate("/talent/startseite", { replace: true });
      }
    }
  }, [navigate, isLoading, isAuthenticated, profile]);

  // Show loading while redirecting or immediately redirect
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return <Navigate to="/talent/startseite" replace />;
};

export default TalentPage;
