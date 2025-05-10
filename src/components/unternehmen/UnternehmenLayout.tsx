
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UnternehmenSidebar } from "./UnternehmenSidebar";

export function UnternehmenLayout() {
  const { profile, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Zeige Ladeindikator während Authentifizierung lädt
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  // Umleitung zur Login-Seite, wenn nicht authentifiziert
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Umleitung zum Talent-Dashboard für nicht-Unternehmensnutzer
  if (profile?.role !== 'business') {
    return <Navigate to="/talent" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar für Navigation */}
      <UnternehmenSidebar />
      
      {/* Hauptinhalt */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
