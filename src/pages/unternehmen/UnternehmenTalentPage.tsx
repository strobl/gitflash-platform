
import React from 'react';
import { useParams } from 'react-router-dom';
import TalentProfile from '@/components/unternehmen/TalentProfile';

export default function UnternehmenTalentPage() {
  const { id } = useParams<{ id: string }>();

  return <TalentProfile />;
}
