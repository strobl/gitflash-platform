
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';

const TalentProfilPage = () => {
  return (
    <TalentLayout activeTab="profil">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">Mein Profil</h1>
        <p className="text-gray-600 mb-6">
          Verwalten Sie hier Ihre persönlichen Daten und Ihren Lebenslauf.
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Persönliche Informationen</h2>
          <p className="text-gray-600">
            Hier können Sie Ihre Profildaten bearbeiten.
          </p>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentProfilPage;
