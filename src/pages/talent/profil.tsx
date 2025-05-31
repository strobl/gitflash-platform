
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import { ProfileForm } from '@/components/talent/ProfileForm';

export default function TalentProfilPage() {
  return (
    <TalentLayout activeTab="profil">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mein Profil</h1>
          <p className="text-gray-500">Vervollständigen Sie Ihr Profil, um von Unternehmen gefunden zu werden.</p>
        </div>
        <ProfileForm />
      </div>
    </TalentLayout>
  );
}
