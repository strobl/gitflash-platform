
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import { ProfileForm } from '@/components/talent/ProfileForm';

export default function TalentProfilPage() {
  return (
    <TalentLayout activeTab="profil">
      <ProfileForm />
    </TalentLayout>
  );
}
