
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SharedNavbar } from "@/components/navigation/SharedNavbar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TalentNavigation } from "@/components/talent/TalentNavigation";
import TalentStartseitePanel from "@/components/talent/TalentStartseitePanel";
import TalentInterviewPanel from "@/components/talent/TalentInterviewPanel";
import TalentErkundenPanel from "@/components/talent/TalentErkundenPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const TalentPage: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<string>("startseite");
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Return early if not authenticated
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top Navigation Bar */}
      <SharedNavbar />
      
      {/* Main Layout with Sidebar/Bottom Nav */}
      <div className="flex w-full">
        {/* Talent Navigation (Sidebar on desktop, Bottom Nav on mobile) */}
        <TalentNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Main Content Area */}
        <main className={cn(
          "flex-1 min-h-screen",
          isMobile ? "pb-20" : "md:ml-16 lg:ml-64", // Space for navigation
          "pt-16" // Space for navbar
        )}>
          {/* Tab Content */}
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="startseite" className="m-0 w-full">
              <TalentStartseitePanel />
            </TabsContent>
            <TabsContent value="interview" className="m-0 w-full">
              <TalentInterviewPanel />
            </TabsContent>
            <TabsContent value="erkunden" className="m-0 w-full">
              <TalentErkundenPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TalentPage;
