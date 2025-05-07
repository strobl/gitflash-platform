
import React from "react";

interface UebungDescriptionProps {
  interview: {
    conversation_context?: string;
    language?: string;
    max_call_duration?: number;
  };
  categoryName: string;
}

export const UebungDescription: React.FC<UebungDescriptionProps> = ({ 
  interview,
  categoryName 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
      <h2 className="text-2xl font-bold text-gitflash-primary mb-6">
        Über dieses Interview
      </h2>
      
      <div className="prose max-w-none text-gray-700">
        <p className="whitespace-pre-line mb-6">
          {interview.conversation_context || 'Keine Kontextinformationen verfügbar.'}
        </p>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="font-medium text-lg mb-4">Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Kategorie</p>
            <p className="font-medium">{categoryName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Sprache</p>
            <p className="font-medium">{interview.language === 'de' ? 'Deutsch' : interview.language}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Dauer</p>
            <p className="font-medium">{interview.max_call_duration ? Math.floor(interview.max_call_duration / 60) : 15} Minuten</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Schwierigkeit</p>
            <p className="font-medium">Mittel</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="font-medium text-lg mb-4">Hinweise für Kandidaten</h3>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>Stelle sicher, dass deine Kamera und Mikrofon korrekt funktionieren</li>
          <li>Suche dir einen ruhigen Ort ohne Hintergrundgeräusche</li>
          <li>Sorge für gute Lichtverhältnisse, damit du gut zu sehen bist</li>
          <li>Antworte klar und deutlich auf die gestellten Fragen</li>
          <li>Bei technischen Problemen kann das Interview jederzeit neu gestartet werden</li>
        </ul>
      </div>
    </div>
  );
};
