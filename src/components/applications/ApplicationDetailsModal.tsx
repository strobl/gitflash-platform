
import React from 'react';
import { ApplicationHistoryDialog } from './ApplicationHistoryDialog';
import { Application } from '@/hooks/useApplications';

interface ApplicationDetailsModalProps {
  application: Application | null;
  userType: 'talent' | 'business';
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationDetailsModal({ 
  application, 
  userType, 
  isOpen, 
  onClose 
}: ApplicationDetailsModalProps) {
  if (!application || !isOpen) {
    return null;
  }

  return (
    <ApplicationHistoryDialog 
      application={application}
      userType={userType}
      onClose={onClose}
    />
  );
}
