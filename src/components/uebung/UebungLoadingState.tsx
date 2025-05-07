
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/landing/Header";

interface UebungLoadingStateProps {
  isLoading: boolean;
  onBackClick: () => void;
}

export const UebungLoadingState: React.FC<UebungLoadingStateProps> = ({
  isLoading,
  onBackClick
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="container py-8">
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Interview-Details werden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Interview nicht gefunden</h2>
          <p className="text-muted-foreground mb-6">
            Das angeforderte Interview wurde nicht gefunden oder Sie haben keinen Zugriff darauf.
          </p>
          <button 
            onClick={onBackClick}
            className="inline-flex items-center gap-2 bg-gitflash-primary text-white px-4 py-2 rounded hover:bg-gitflash-primary/90"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    </div>
  );
};
