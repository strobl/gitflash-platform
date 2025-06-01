
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ApplicationStatusBadgeProps {
  status: string;
  className?: string;
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Neu',
      'reviewing': 'In Prüfung',
      'interview': 'Interview',
      'interview_scheduled': 'Interview geplant',
      'offer': 'Angebot',
      'offer_pending': 'Angebot ausstehend',
      'offer_accepted': 'Angebot angenommen',
      'offer_declined': 'Angebot abgelehnt',
      'hired': 'Eingestellt',
      'rejected': 'Abgelehnt',
      'withdrawn': 'Zurückgezogen'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'interview_scheduled': return 'bg-purple-200 text-purple-900 border-purple-300';
      case 'offer': return 'bg-green-100 text-green-800 border-green-200';
      case 'offer_pending': return 'bg-green-200 text-green-900 border-green-300';
      case 'offer_accepted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'offer_declined': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hired': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'withdrawn': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge 
      className={`${getStatusColor(status)} ${className || ''}`}
      variant="outline"
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
