
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getRoleRedirectPath } from "@/utils/routingUtils";

// Import the specific talent pages
import TalentStartseitePage from "./talent/TalentStartseitePage";
import TalentProfilPage from "./talent/TalentProfilPage";
import TalentInterviewPage from "./talent/TalentInterviewPage";
import TalentErkundenPage from "./talent/TalentErkundenPage";
import TalentZahlungenPage from "./talent/TalentZahlungenPage";

const TalentPage: React.FC = () => {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Show loading while authentication is in progress
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }
  
  // If authenticated but not a talent user, redirect to appropriate area
  if (profile?.role !== 'user') {
    navigate(getRoleRedirectPath(profile?.role), { replace: true });
    return null;
  }
  
  // Determine which subpage to show based on the current path
  const path = location.pathname;
  
  // Render the appropriate page component based on the path
  if (path === "/talent/profil") {
    return <TalentProfilPage />;
  } else if (path === "/talent/interview") {
    return <TalentInterviewPage />;
  } else if (path === "/talent/erkunden") {
    return <TalentErkundenPage />;
  } else if (path === "/talent/zahlungen") {
    return <TalentZahlungenPage />;
  } else {
    // Default to startseite for /talent or /talent/startseite
    return <TalentStartseitePage />;
  }
};

export default TalentPage;
