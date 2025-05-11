
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import TalentStartseitePanel from '@/components/talent/TalentStartseitePanel';

export default function TalentStartseitePage() {
  return (
    <TalentLayout activeTab="startseite">
      <TalentStartseitePanel />
    </TalentLayout>
  );
}
