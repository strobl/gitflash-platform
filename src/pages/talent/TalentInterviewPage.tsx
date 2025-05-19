
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';

const TalentInterviewPage = () => {
  return (
    <TalentLayout activeTab="interview">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">Interviews</h1>
        <p className="text-gray-600 mb-6">
          Hier finden Sie Ihre absolvierten und anstehenden KI-Interviews.
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">KI-Interview starten</h2>
          <p className="text-gray-600">
            Mit unseren KI-gestützten Interviews können Sie Ihre Fähigkeiten demonstrieren.
          </p>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentInterviewPage;
