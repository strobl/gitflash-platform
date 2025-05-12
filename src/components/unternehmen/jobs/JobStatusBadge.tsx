
import React from 'react';

interface JobStatusBadgeProps {
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Aktiv':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'In Prüfung':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'Entwurf':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    case 'Geschlossen':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};
