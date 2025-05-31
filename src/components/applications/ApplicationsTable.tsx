
import { useState } from 'react';
import { useApplications, Application } from '@/hooks/useApplications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { ApplicationHistoryDialog } from './ApplicationHistoryDialog';

interface ApplicationsTableProps {
  type: 'talent' | 'business';
  jobId?: string;
}

export function ApplicationsTable({ type, jobId }: ApplicationsTableProps) {
  const { applications, isLoading, error, refetch } = useApplications({ type, jobId });
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_review': return 'secondary';
      case 'interview': return 'outline';
      case 'offer': return 'blue';
      case 'hired': return 'success';
      case 'rejected': return 'destructive';
      case 'withdrawn': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Neu',
      'in_review': 'In Prüfung',
      'interview': 'Interview',
      'offer': 'Angebot',
      'hired': 'Eingestellt',
      'rejected': 'Abgelehnt',
      'withdrawn': 'Zurückgezogen'
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Bewerbungen werden geladen...</div>;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-destructive">Fehler beim Laden der Bewerbungen: {error.message || 'Unbekannter Fehler'}</div>
          <Button onClick={() => refetch()} className="mt-2">Erneut versuchen</Button>
        </CardContent>
      </Card>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            {type === 'talent' 
              ? 'Du hast noch keine Bewerbungen abgegeben.' 
              : 'Es gibt noch keine Bewerbungen für diesen Job.'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{type === 'talent' ? 'Stelle' : 'Datum'}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Letzte Änderung</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    {type === 'talent' 
                      ? application.job?.title || 'Unbenannte Stelle' 
                      : formatDistanceToNow(new Date(application.created_at), { addSuffix: true, locale: de })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(application.status) as any}>
                      {getStatusLabel(application.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(application.last_activity_at), { addSuffix: true, locale: de })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedApplication(application)}
                    >
                      {type === 'talent' ? 'Details' : 'Bearbeiten'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedApplication && (
        <ApplicationHistoryDialog 
          application={selectedApplication}
          userType={type}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}
