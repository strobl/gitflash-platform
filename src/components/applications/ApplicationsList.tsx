
import React, { useState, useMemo } from 'react';
import { useApplications, Application } from '@/hooks/useApplications';
import { useRealtimeApplications } from '@/hooks/useRealtimeApplications';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { ApplicationDetailsModal } from './ApplicationDetailsModal';
import { BusinessOfferActions } from './BusinessOfferActions';
import { Eye } from 'lucide-react';

interface ApplicationsListProps {
  type: 'talent' | 'business';
  jobId?: string;
  statusFilter?: string;
  searchTerm?: string;
}

export function ApplicationsList({ type, jobId, statusFilter, searchTerm }: ApplicationsListProps) {
  const { data: applications = [], isLoading, error, refetch } = useApplications({ type, jobId });
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Setup realtime updates
  useRealtimeApplications();

  // Filter applications based on status and search term
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.job?.title && app.job.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [applications, statusFilter, searchTerm]);

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
      'rejected': 'Abgelehnt'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'interview_scheduled': return 'bg-purple-200 text-purple-900';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'offer_pending': return 'bg-green-200 text-green-900';
      case 'offer_accepted': return 'bg-emerald-100 text-emerald-800';
      case 'offer_declined': return 'bg-orange-100 text-orange-800';
      case 'hired': return 'bg-teal-100 text-teal-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  if (filteredApplications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            {statusFilter && statusFilter !== 'all'
              ? `Keine Bewerbungen mit Status "${getStatusLabel(statusFilter)}" gefunden.`
              : searchTerm
              ? `Keine Bewerbungen gefunden für "${searchTerm}".`
              : type === 'talent' 
              ? 'Du hast noch keine Bewerbungen abgegeben.' 
              : 'Es gibt noch keine Bewerbungen.'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{type === 'talent' ? 'Stelle' : 'Bewerber'}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Eingereicht</TableHead>
                {type === 'business' && <TableHead>Angebote</TableHead>}
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id} className="hover:bg-gray-50">
                  <TableCell>
                    {type === 'talent' ? (
                      <div>
                        <div className="font-medium">{application.job?.title || 'Unbenannte Stelle'}</div>
                        <div className="text-sm text-gray-500">{application.job?.location}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">{application.applicant_name}</div>
                        <div className="text-sm text-gray-500">{application.applicant_email}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusLabel(application.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDistanceToNow(new Date(application.created_at), { addSuffix: true, locale: de })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(application.created_at).toLocaleDateString('de-DE')}
                    </div>
                  </TableCell>
                  
                  {/* NEW: Offer Actions Column for Business Users */}
                  {type === 'business' && (
                    <TableCell>
                      <BusinessOfferActions application={application} />
                    </TableCell>
                  )}
                  
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedApplication(application)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ApplicationDetailsModal 
        application={selectedApplication}
        userType={type}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
}
