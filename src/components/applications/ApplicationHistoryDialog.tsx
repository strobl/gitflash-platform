
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useUpdateApplicationStatus } from '@/hooks/useUpdateApplicationStatus';
import { useApplicationHistory } from '@/hooks/useApplicationHistory';
import { Application } from '@/hooks/useApplications';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { TalentOfferActions } from './TalentOfferActions';
import { BusinessOfferActions } from './BusinessOfferActions';

interface ApplicationHistoryDialogProps {
  application: Application;
  userType: 'talent' | 'business';
  onClose: () => void;
}

export function ApplicationHistoryDialog({ application, userType, onClose }: ApplicationHistoryDialogProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [newStatus, setNewStatus] = useState(application.status);
  const { updateStatus, updating } = useUpdateApplicationStatus();
  const { data: history = [], isLoading: historyLoading } = useApplicationHistory(application.id);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleUpdateStatus = async () => {
    if (newStatus === application.status) return;
    
    await updateStatus({
      applicationId: application.id,
      newStatus
    });
    
    handleClose();
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bewerbungsdetails</DialogTitle>
          <DialogDescription>
            {userType === 'talent' 
              ? `Deine Bewerbung für ${application.job?.title || 'Unbenannte Stelle'}`
              : `Bewerbung von ${application.applicant_name}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-1">Aktueller Status</div>
            <ApplicationStatusBadge status={application.status} />
          </div>
          
          {application.cover_letter && (
            <div>
              <div className="text-sm font-medium mb-1">Anschreiben</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap border rounded-md p-3 max-h-32 overflow-y-auto">
                {application.cover_letter}
              </div>
            </div>
          )}
          
          <Separator />
          
          <div>
            <div className="text-sm font-medium mb-2">Status-Historie</div>
            {historyLoading ? (
              <div className="text-sm text-muted-foreground">Lade Historie...</div>
            ) : history.length > 0 ? (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {history.map((entry) => (
                  <div key={entry.id} className="text-xs border rounded p-2">
                    <div className="flex items-center gap-2">
                      {entry.old_status && (
                        <>
                          <Badge variant="outline" className="text-xs">
                            {getStatusLabel(entry.old_status)}
                          </Badge>
                          <span>→</span>
                        </>
                      )}
                      <Badge className="text-xs">
                        {getStatusLabel(entry.new_status)}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true, locale: de })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Keine Historie verfügbar</div>
            )}
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Bewerbung eingereicht</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(application.created_at), { addSuffix: true, locale: de })}
            </div>
          </div>
          
          {userType === 'business' && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-2">Angebot verwalten</div>
                <BusinessOfferActions application={application} />
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Status ändern</div>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Neu</SelectItem>
                    <SelectItem value="reviewing">In Prüfung</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="interview_scheduled">Interview geplant</SelectItem>
                    <SelectItem value="offer">Angebot</SelectItem>
                    <SelectItem value="offer_pending">Angebot ausstehend</SelectItem>
                    <SelectItem value="offer_accepted">Angebot angenommen</SelectItem>
                    <SelectItem value="offer_declined">Angebot abgelehnt</SelectItem>
                    <SelectItem value="hired">Eingestellt</SelectItem>
                    <SelectItem value="rejected">Abgelehnt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {userType === 'talent' && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-2">Verfügbare Aktionen</div>
                <TalentOfferActions application={application} />
              </div>
            </>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={handleClose}>
            Schließen
          </Button>
          
          {userType === 'business' && (
            <Button 
              onClick={handleUpdateStatus} 
              disabled={updating || newStatus === application.status}
            >
              {updating ? 'Wird aktualisiert...' : 'Status aktualisieren'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
