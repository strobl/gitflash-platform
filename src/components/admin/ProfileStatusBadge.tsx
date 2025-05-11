
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ProfileStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

interface ProfileStatusBadgeProps {
  status: ProfileStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileStatusBadge: React.FC<ProfileStatusBadgeProps> = ({ 
  status,
  size = 'md'
}) => {
  // Define styling based on status
  const getStatusStyle = () => {
    switch (status) {
      case 'draft':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
      case 'submitted':
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'approved':
        return 'bg-green-100 hover:bg-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-100 hover:bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
    }
  };
  
  // Define human-readable status text
  const getStatusText = () => {
    switch (status) {
      case 'draft':
        return 'Entwurf';
      case 'submitted':
        return 'Eingereicht';
      case 'approved':
        return 'Freigegeben';
      case 'rejected':
        return 'Abgelehnt';
      default:
        return status;
    }
  };
  
  // Define size classes
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-0.5 px-2';
      case 'lg':
        return 'text-base py-1 px-3';
      default:
        return 'text-sm py-0.5 px-2.5';
    }
  };
  
  return (
    <Badge className={cn(getStatusStyle(), getSizeClass(), 'font-medium')}>
      {getStatusText()}
    </Badge>
  );
};
