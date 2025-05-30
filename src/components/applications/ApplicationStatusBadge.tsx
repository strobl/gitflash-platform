
import { Badge } from '@/components/ui/badge';

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return { variant: 'blue' as const, label: 'Neu' };
      case 'reviewing':
        return { variant: 'warning' as const, label: 'In Bearbeitung' };
      case 'interview':
        return { variant: 'secondary' as const, label: 'Vorstellungsgespräch' };
      case 'offer':
        return { variant: 'success' as const, label: 'Angebot' };
      case 'rejected':
        return { variant: 'destructive' as const, label: 'Abgelehnt' };
      case 'hired':
        return { variant: 'success' as const, label: 'Eingestellt' };
      default:
        return { variant: 'outline' as const, label: status };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
