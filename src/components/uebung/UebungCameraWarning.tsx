
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const UebungCameraWarning: React.FC = () => {
  return (
    <Alert className="bg-amber-50 border-amber-200 mb-6">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="flex-1">
        <div className="ml-2">
          <p className="font-medium text-amber-800">Kamerazugriff erforderlich</p>
          <p className="text-amber-700 text-sm mt-1">
            Bitte erlaube den Zugriff auf deine Kamera und dein Mikrofon, um am Interview teilzunehmen. 
            Diese werden nur während des Interviews verwendet und nicht gespeichert.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};
