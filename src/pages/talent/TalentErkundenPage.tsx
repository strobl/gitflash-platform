
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';

const TalentErkundenPage = () => {
  return (
    <TalentLayout activeTab="erkunden">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">Jobs erkunden</h1>
        <p className="text-gray-600 mb-6">
          Entdecken Sie passende Projekte und Jobangebote aus der Baubranche.
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Aktuelle Angebote</h2>
          <p className="text-gray-600">
            Hier werden Ihnen passende Jobs angezeigt.
          </p>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentErkundenPage;
