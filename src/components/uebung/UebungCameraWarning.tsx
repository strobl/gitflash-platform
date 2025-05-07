
import React from "react";
import { Camera } from "lucide-react";

export const UebungCameraWarning: React.FC = () => {
  return (
    <div className="bg-[#1A1F2C] text-white rounded-xl shadow-sm border border-[#2c3241] p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-center flex-col text-center">
        <div className="bg-[#2c3241] h-16 w-16 rounded-full flex items-center justify-center mb-5">
          <Camera className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-medium mb-3">
          Kamerazugriff erforderlich
        </h3>
        
        <p className="text-[#b3b8c2] text-sm max-w-lg">
          Bitte erlaube den Zugriff auf deine Kamera und dein Mikrofon, um am Interview teilzunehmen.
          Diese werden nur während des Interviews verwendet und nicht gespeichert.
        </p>
      </div>
    </div>
  );
};
