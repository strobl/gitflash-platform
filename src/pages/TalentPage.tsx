
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const TalentPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the talent startseite page
    navigate("/talent/startseite", { replace: true });
  }, [navigate]);

  // Return null since this is just a redirect page
  return null;
};

export default TalentPage;
