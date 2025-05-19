
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';

const TalentStartseitePage = () => {
  return (
    <TalentLayout activeTab="startseite">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">Willkommen bei GitFlash</h1>
        <p className="text-gray-600">
          Hier finden Sie Ihre persönliche Übersicht und aktuelle Projekte.
        </p>
        
        <div className="mt-6 grid gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">Aktuelle Empfehlungen</h2>
            <p className="text-gray-600">
              Basierend auf Ihrem Profil haben wir folgende Jobs für Sie gefunden.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">Nächste Schritte</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Vervollständigen Sie Ihr Profil</li>
              <li>• Nehmen Sie an einem KI-Interview teil</li>
              <li>• Erkunden Sie aktuelle Projektangebote</li>
            </ul>
          </div>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentStartseitePage;
