
import React from "react";
import { Camera } from "lucide-react";

interface UebungCameraWarningProps {
  onRequestCameraAccess: () => void;
}

export const UebungCameraWarning: React.FC<UebungCameraWarningProps> = ({ 
  onRequestCameraAccess 
}) => {
  return (
    <div className="w-full">
      <div className="bg-[#1A1F2C] text-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-center flex-col text-center py-12 px-6">
          <div className="bg-[#2c3241] h-16 w-16 rounded-full flex items-center justify-center mb-6">
            <Camera className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-xl font-medium mb-4">
            Kamerazugriff erforderlich
          </h3>
          
          <p className="text-[#b3b8c2] text-sm max-w-lg mb-8">
            Bitte erlaube den Zugriff auf deine Kamera und dein Mikrofon, um am Interview teilzunehmen.
            Diese werden nur während des Interviews verwendet und nicht gespeichert.
          </p>
          
          <button 
            onClick={onRequestCameraAccess}
            className="border border-white rounded-[100px] px-8 py-2.5 text-white hover:bg-white/10 transition-colors"
          >
            Kamerazugriff erlauben
          </button>
        </div>
      </div>
    </div>
  );
};
