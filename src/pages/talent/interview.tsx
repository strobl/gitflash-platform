
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import TalentInterviewPanel from '@/components/talent/TalentInterviewPanel';

export default function TalentInterviewPage() {
  return (
    <TalentLayout activeTab="interview">
      <TalentInterviewPanel />
    </TalentLayout>
  );
}
