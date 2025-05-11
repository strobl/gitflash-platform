
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import { PaymentsView } from '@/components/talent/PaymentsView';

export default function TalentZahlungenPage() {
  return (
    <TalentLayout activeTab="zahlungen">
      <PaymentsView />
    </TalentLayout>
  );
}
