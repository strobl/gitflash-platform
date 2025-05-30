
import { useApplications } from '@/hooks/useApplications';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUpdateApplicationStatus } from '@/hooks/useUpdateApplicationStatus';
import { useState } from 'react';

interface ApplicationsListProps {
  jobId?: string;
  type: 'talent' | 'recruiter';
}

export function ApplicationsList({ jobId, type }: ApplicationsListProps) {
  const { applications, loading, refresh } = useApplications({ type, jobId });
  const { updateStatus, updating } = useUpdateApplicationStatus();
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const handleStatusChange = async (applicationId: string, version: number, newStatus: string) => {
    const result = await updateStatus({
      applicationId,
      currentVersion: version,
      newStatus,
      notes: `Status geändert zu ${newStatus}`
    });
    
    if (result) {
      refresh();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === 'talent' ? 'Meine Bewerbungen' : 'Bewerbungen'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {type === 'talent' 
              ? 'Sie haben noch keine Bewerbungen eingereicht.'
              : 'Noch keine Bewerbungen für diese Stelle erhalten.'
            }
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {type === 'talent' && <TableHead>Stelle</TableHead>}
                {type === 'recruiter' && <TableHead>Bewerber</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Eingereicht am</TableHead>
                <TableHead>Letzte Aktivität</TableHead>
                {type === 'recruiter' && <TableHead>Aktionen</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  {type === 'talent' && (
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.job?.title}</div>
                        <div className="text-sm text-gray-500">{application.job?.location}</div>
                      </div>
                    </TableCell>
                  )}
                  {type === 'recruiter' && (
                    <TableCell>
                      <div className="font-medium">Bewerber #{application.talent_id.slice(-8)}</div>
                    </TableCell>
                  )}
                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(application.created_at).toLocaleDateString('de-DE')}
                  </TableCell>
                  <TableCell>
                    {new Date(application.last_activity_at).toLocaleDateString('de-DE')}
                  </TableCell>
                  {type === 'recruiter' && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(application.id, application.version, 'reviewing')}
                          disabled={updating || application.status === 'reviewing'}
                        >
                          Bearbeiten
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(application.id, application.version, 'interview')}
                          disabled={updating || application.status === 'interview'}
                        >
                          Interview
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(application.id, application.version, 'rejected')}
                          disabled={updating || application.status === 'rejected'}
                        >
                          Ablehnen
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
