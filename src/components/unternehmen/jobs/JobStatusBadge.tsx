
import React from 'react';

type JobStatus = 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';

interface JobStatusBadgeProps {
  status: JobStatus;
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
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};
