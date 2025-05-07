
import React from "react";
import { Play, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define clearer camera status types
export type CameraStatus = "unknown" | "requesting" | "denied" | "ready";

interface UebungStartSectionProps {
  isStarting: boolean;
  onStartInterview: () => void;
  isAuthenticated: boolean;
  cameraStatus: CameraStatus;
  onRequestCameraAccess: () => void;
}

export const UebungStartSection: React.FC<UebungStartSectionProps> = ({ 
  isStarting, 
  onStartInterview,
  isAuthenticated,
  cameraStatus,
  onRequestCameraAccess
}) => {
  // Determine if the interview button should be disabled
  const isInterviewButtonDisabled = isStarting || !isAuthenticated || cameraStatus !== "ready";
  
  // Show camera access UI if camera is not ready yet
  const showCameraAccessUI = cameraStatus !== "ready";
  const isRequesting = cameraStatus === "requesting";
  const isDenied = cameraStatus === "denied";
  
  if (showCameraAccessUI) {
    return (
      <div className="bg-[#1A1F2C] text-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="flex items-center justify-center flex-col text-center py-16 px-6">
          <div className="bg-[#2c3241] h-16 w-16 rounded-full flex items-center justify-center mb-6">
            <Camera className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-xl font-medium mb-4">
            {isDenied ? "Kamerazugriff verweigert" : "Kamerazugriff erforderlich"}
          </h3>
          
          <p className="text-[#b3b8c2] text-sm max-w-lg mb-8">
            {isDenied 
              ? "Der Zugriff auf deine Kamera wurde verweigert. Bitte erlaube den Zugriff in deinen Browsereinstellungen und aktualisiere die Seite."
              : "Bitte erlaube den Zugriff auf deine Kamera und dein Mikrofon, um am Interview teilzunehmen. Diese werden nur während des Interviews verwendet und nicht gespeichert."
            }
          </p>
          
          <Button 
            onClick={onRequestCameraAccess}
            disabled={isRequesting}
            variant="outline"
            className="border border-white rounded-[100px] px-8 py-2.5 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full mr-2 inline-block"></div>
                Zugriff wird angefragt...
              </>
            ) : (
              isDenied ? 'Kamerazugriff erneut anfragen' : 'Kamerazugriff erlauben'
            )}
          </Button>
          
          {!isAuthenticated && (
            <p className="text-sm text-[#b3b8c2] mt-4">
              Zum Starten des Interviews ist ein Login erforderlich.
            </p>
          )}
          
          <div className="mt-6 text-sm">
            <a href="#" className="text-white hover:underline">
              Technische Probleme?
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // Show the interview start UI if camera is ready
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto">
        <div className="bg-gitflash-primary/10 h-20 w-20 rounded-full flex items-center justify-center mb-6">
          <Play className="h-10 w-10 text-gitflash-primary ml-1" />
        </div>
        
        <h2 className="text-2xl font-bold text-gitflash-primary mb-3">
          Bereit für dein Interview?
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          Starte das Interview, um mit dem KI-Interviewer zu sprechen. 
          Die Dauer beträgt etwa 15-20 Minuten. Stelle sicher, dass du dich in einer 
          ruhigen Umgebung befindest und deine Kamera sowie dein Mikrofon funktionieren.
        </p>
        
        {/* Interview start button */}
        <Button 
          onClick={onStartInterview} 
          className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white px-8 py-[11px] h-auto text-lg rounded-[100px] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isInterviewButtonDisabled}
        >
          {isStarting ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full mr-3"></div>
              Wird gestartet...
            </>
          ) : (
            <>
              Interview starten
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
        
        {/* Authentication message */}
        {!isAuthenticated && (
          <p className="text-sm text-gray-500 mt-4">
            Zum Starten des Interviews ist ein Login erforderlich.
          </p>
        )}
        
        <div className="mt-6 text-sm">
          <a href="#" className="text-gitflash-primary hover:underline">
            Technische Probleme?
          </a>
        </div>
      </div>
    </div>
  );
};
