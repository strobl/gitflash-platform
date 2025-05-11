
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const TalentPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      } else {
        // If authenticated, redirect to the startseite
        navigate("/talent/startseite", { replace: true });
      }
    }
  }, [navigate, isLoading, isAuthenticated]);

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
    </div>
  );
};

export default TalentPage;
