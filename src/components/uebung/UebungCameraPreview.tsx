
import React from "react";
import { Camera } from "lucide-react";
import { CameraStatus } from "@/components/uebung/UebungStartSection";
import { DailyProvider, DailyVideo } from "@daily-co/daily-react";
import type { DailyCall } from '@daily-co/daily-js';

interface UebungCameraPreviewProps {
  cameraStatus: CameraStatus;
  localSessionId: string | null;
  dailyCallObject: DailyCall | null;
}

export const UebungCameraPreview: React.FC<UebungCameraPreviewProps> = ({
  cameraStatus,
  localSessionId,
  dailyCallObject
}) => {
  // Show the Daily camera preview when ready
  if (dailyCallObject && cameraStatus === "ready" && localSessionId) {
    return (
      <DailyProvider callObject={dailyCallObject}>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="aspect-video w-full relative">
            <DailyVideo 
              sessionId={localSessionId} 
              type="video" 
              automirror 
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              Videovorschau
            </div>
          </div>
        </div>
        
        {/* Device settings info text */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gitflash-primary mb-2">
            Geräteeinstellungen
          </h3>
          <p className="text-gray-600 text-sm">
            Kamera und Mikrofon sind aktiv. Während des Interviews kannst du jederzeit 
            die Geräte wechseln oder stumm schalten.
          </p>
        </div>
      </DailyProvider>
    );
  }

  // Show a placeholder when camera is not ready
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex items-center justify-center h-full mb-6">
      <div className="text-center py-10">
        {cameraStatus === "unknown" ? (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Camera className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500">Kameraansicht wird angezeigt, sobald du den Zugriff erlaubst</p>
          </div>
        ) : cameraStatus === "denied" ? (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <Camera className="h-10 w-10 text-red-500" />
            </div>
            <p className="text-red-500">Kamerazugriff wurde abgelehnt</p>
          </div>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <Camera className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500">Kamera wird aktiviert...</p>
          </div>
        )}
      </div>
    </div>
  );
};
