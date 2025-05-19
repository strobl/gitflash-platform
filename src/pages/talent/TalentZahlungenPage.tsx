
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';

const TalentZahlungenPage = () => {
  return (
    <TalentLayout activeTab="zahlungen">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">Zahlungen</h1>
        <p className="text-gray-600 mb-6">
          Hier finden Sie eine Übersicht Ihrer Einnahmen und Abrechnungen.
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Zahlungsübersicht</h2>
          <p className="text-gray-600">
            Ihre Abrechnungen werden hier aufgelistet.
          </p>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentZahlungenPage;
