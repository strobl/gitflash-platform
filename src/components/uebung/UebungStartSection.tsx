
import React from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UebungStartSectionProps {
  isStarting: boolean;
  onStartInterview: () => void;
  isAuthenticated: boolean;
}

export const UebungStartSection: React.FC<UebungStartSectionProps> = ({ 
  isStarting, 
  onStartInterview,
  isAuthenticated
}) => {
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
        
        <button 
          onClick={onStartInterview} 
          className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white px-8 py-[11px] h-auto text-lg rounded-[100px] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isStarting}
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
        </button>
        
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
