
import React from "react";

const TalentStartseitePanel: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Willkommen bei GitFlash</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Dein Profil</h3>
          <p className="text-gray-600 mb-4">
            Vervollständige dein Profil, um bessere Aufträge zu erhalten und deine Expertise zu zeigen.
          </p>
          <button className="bg-gitflash-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Profil bearbeiten
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Deine Interviews</h3>
          <p className="text-gray-600 mb-4">
            Erstelle dein erstes KI-Interview oder schau dir deine bisherigen Interviews an.
          </p>
          <button className="bg-gitflash-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Interview starten
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Neue Projekte</h3>
          <div className="space-y-3">
            <p className="text-gray-600">
              Hier erscheinen Projekte basierend auf deinem Profil und deinen Fähigkeiten.
            </p>
            <div className="flex justify-center items-center h-24 bg-gray-100 rounded-lg">
              <p className="text-gray-500">Aktuell sind keine passenden Projekte verfügbar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentStartseitePanel;
