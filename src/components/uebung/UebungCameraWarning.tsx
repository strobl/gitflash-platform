
import React from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CameraStatus } from "./UebungStartSection";

interface UebungCameraWarningProps {
  onRequestCameraAccess: () => void;
  cameraStatus: CameraStatus;
}

export const UebungCameraWarning: React.FC<UebungCameraWarningProps> = ({ 
  onRequestCameraAccess,
  cameraStatus
}) => {
  // Only show this warning when camera access is needed or denied
  if (cameraStatus === "ready") return null;
  
  const isRequesting = cameraStatus === "requesting";
  const isDenied = cameraStatus === "denied";
  
  return (
    <div className="w-full">
      <div className="bg-[#1A1F2C] text-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-center flex-col text-center py-12 px-6">
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
        </div>
      </div>
    </div>
  );
};
