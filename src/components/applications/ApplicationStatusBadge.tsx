
import { Badge } from '@/components/ui/badge';

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'in_review':
      case 'reviewing':
        return 'secondary';
      case 'interview':
        return 'outline';
      case 'offer':
        return 'default';
      case 'hired':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'withdrawn':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Neu',
      'in_review': 'In Prüfung',
      'reviewing': 'In Bearbeitung',
      'interview': 'Interview',
      'offer': 'Angebot',
      'hired': 'Eingestellt',
      'rejected': 'Abgelehnt',
      'withdrawn': 'Zurückgezogen'
    };
    return statusMap[status] || status;
  };

  return (
    <Badge variant={getVariant(status) as any}>
      {getLabel(status)}
    </Badge>
  );
}
