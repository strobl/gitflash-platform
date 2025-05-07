
import React from "react";
import { UebungCameraPreview } from "./UebungCameraPreview";
import { UebungStartSection, CameraStatus } from "./UebungStartSection";
import { CustomVideoInterview } from "@/components/interviews/custom/CustomVideoInterview";
import { DailyCall } from "@daily-co/daily-js";

interface UebungInterviewContentProps {
  conversationUrl: string | null;
  interviewId: string;
  sessionId: string | undefined;
  sessionStatus: string | undefined;
  onSessionStatusChange: (status: string) => void;
  cameraStatus: CameraStatus;
  localSessionId: string | null;
  dailyCallObject: DailyCall | null;
  isAuthenticated: boolean;
  isStarting: boolean;
  onStartInterview: () => void;
  onRequestCameraAccess: () => void;
}

export const UebungInterviewContent: React.FC<UebungInterviewContentProps> = ({
  conversationUrl,
  interviewId,
  sessionId,
  sessionStatus,
  onSessionStatusChange,
  cameraStatus,
  localSessionId,
  dailyCallObject,
  isAuthenticated,
  isStarting,
  onStartInterview,
  onRequestCameraAccess
}) => {
  // Show the active interview if there is a conversation URL
  if (conversationUrl) {
    return (
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <CustomVideoInterview 
          conversationUrl={conversationUrl} 
          interviewId={interviewId}
          sessionId={sessionId}
          status={sessionStatus}
          onSessionStatusChange={onSessionStatusChange}
        />
      </div>
    );
  }

  // Show the camera preview and interview start UI
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Left column: Camera preview */}
      <div className="flex flex-col">
        <UebungCameraPreview
          cameraStatus={cameraStatus}
          localSessionId={localSessionId}
          dailyCallObject={dailyCallObject}
        />
      </div>
      
      {/* Right column: Interview start section */}
      <div>
        <UebungStartSection 
          isStarting={isStarting}
          onStartInterview={onStartInterview}
          isAuthenticated={isAuthenticated}
          cameraStatus={cameraStatus}
          onRequestCameraAccess={onRequestCameraAccess}
          interviewId={interviewId}
        />
      </div>
    </div>
  );
};
