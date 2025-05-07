
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { ChevronLeft } from "lucide-react";
import { UebungHeader } from "@/components/uebung/UebungHeader";
import { UebungDescription } from "@/components/uebung/UebungDescription";
import { UebungCompanyInfo } from "@/components/uebung/UebungCompanyInfo";
import { UebungSimilarInterviews } from "@/components/uebung/UebungSimilarInterviews";
import { UebungLoadingState } from "@/components/uebung/UebungLoadingState";
import { UebungInterviewContent } from "@/components/uebung/UebungInterviewContent";
import { useInterviewSession } from "@/hooks/useInterviewSession";

const Uebung: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Use our custom hook to manage all interview session state
  const {
    interview,
    isLoading,
    isStarting,
    sessionStatus,
    sessionId,
    conversationUrl,
    interviewCategory,
    cameraStatus,
    localSessionId,
    similarInterviews,
    dailyCallObject,
    isAuthenticated,
    handleStartInterview,
    requestCameraAccess,
    handleBackClick,
    handleSessionStatusChange,
    CATEGORIES
  } = useInterviewSession(id);

  // Log the state on component mount and params change for debugging
  useEffect(() => {
    console.log("Uebung: Component mounted or params changed", {
      id,
      isAuthenticated,
      location: location.pathname
    });
  }, [id, isAuthenticated, location.pathname]);

  // Loading or error state
  if (isLoading || !interview) {
    return <UebungLoadingState isLoading={isLoading} onBackClick={handleBackClick} />;
  }

  const categoryInfo = CATEGORIES[interviewCategory] || CATEGORIES.general;

  // Log current camera and authentication state
  console.log("Uebung: Current state:", {
    cameraStatus,
    isAuthenticated,
    interviewId: id
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="container mx-auto pt-6 pb-12 px-4">
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="inline-flex items-center text-gitflash-primary hover:text-gitflash-primary/80 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück zur Übersicht
        </button>
        
        {/* Interview Header */}
        <UebungHeader 
          title={interview?.conversation_name || "Interview"}
          category={categoryInfo}
        />
        
        {/* Interview content - camera preview or active interview */}
        <UebungInterviewContent
          conversationUrl={conversationUrl}
          interviewId={id || ""}
          sessionId={sessionId}
          sessionStatus={sessionStatus}
          onSessionStatusChange={handleSessionStatusChange}
          cameraStatus={cameraStatus}
          localSessionId={localSessionId}
          dailyCallObject={dailyCallObject}
          isAuthenticated={isAuthenticated}
          isStarting={isStarting}
          onStartInterview={handleStartInterview}
          onRequestCameraAccess={requestCameraAccess}
        />
        
        {/* Interview Description */}
        <UebungDescription 
          interview={interview}
          categoryName={categoryInfo.name}
        />
        
        {/* Company Info */}
        <UebungCompanyInfo />
        
        {/* Similar Interviews */}
        <UebungSimilarInterviews 
          interviews={similarInterviews}
          category={categoryInfo.name}
        />
      </main>
    </div>
  );
};

export default Uebung;
