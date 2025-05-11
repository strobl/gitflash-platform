
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import TalentErkundenPanel from '@/components/talent/TalentErkundenPanel';

export default function TalentErkundenPage() {
  return (
    <TalentLayout activeTab="erkunden">
      <TalentErkundenPanel />
    </TalentLayout>
  );
}
