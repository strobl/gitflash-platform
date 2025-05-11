
import React from 'react';
import { useParams } from 'react-router-dom';
import TalentProfile from '@/components/unternehmen/TalentProfile';
import { UnternehmenLayout } from '@/components/unternehmen/UnternehmenLayout';

export default function UnternehmenTalentPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <UnternehmenLayout>
        <TalentProfile />
      </UnternehmenLayout>
    </>
  );
}
