
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
import { Application } from '@/hooks/useApplications';

interface ApplicationHistoryDialogProps {
  application: Application;
  userType: 'talent' | 'recruiter';
  onClose: () => void;
}

export function ApplicationHistoryDialog({ application, userType, onClose }: ApplicationHistoryDialogProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [newStatus, setNewStatus] = useState(application.status);
  const { updateStatus, updating } = useUpdateApplicationStatus();

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleUpdateStatus = async () => {
    if (newStatus === application.status) return;
    
    const result = await updateStatus({
      applicationId: application.id,
      currentVersion: application.version,
      newStatus
    });
    
    if (result) {
      handleClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bewerbungsdetails</DialogTitle>
          <DialogDescription>
            {userType === 'talent' 
              ? `Deine Bewerbung für ${application.job?.title || 'Unbenannte Stelle'}`
              : `Bewerbung von ${format(new Date(application.created_at), 'PPP', { locale: de })}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-1">Aktueller Status</div>
            <Badge>{getStatusLabel(application.status)}</Badge>
          </div>
          
          {application.cover_letter && (
            <div>
              <div className="text-sm font-medium mb-1">Anschreiben</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap border rounded-md p-3">
                {application.cover_letter}
              </div>
            </div>
          )}
          
          <Separator />
          
          <div>
            <div className="text-sm font-medium mb-2">Statusverlauf</div>
            {application.history && application.history.length > 0 ? (
              <div className="space-y-2">
                {application.history.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">
                          {item.old_status ? `${getStatusLabel(item.old_status)} → ` : ''}
                          {getStatusLabel(item.new_status)}
                        </span>
                        {item.profile?.name && (
                          <span className="text-muted-foreground"> von {item.profile.name}</span>
                        )}
                      </div>
                      <div className="text-muted-foreground">
                        {formatDistanceToNow(new Date(item.changed_at), { addSuffix: true, locale: de })}
                      </div>
                    </div>
                    {item.notes && (
                      <div className="text-muted-foreground mt-1 ml-2">{item.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Keine Statusänderungen bisher.</div>
            )}
          </div>
          
          {userType === 'recruiter' && (
            <div>
              <div className="text-sm font-medium mb-2">Status ändern</div>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Neu</SelectItem>
                  <SelectItem value="in_review">In Prüfung</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Angebot</SelectItem>
                  <SelectItem value="hired">Eingestellt</SelectItem>
                  <SelectItem value="rejected">Abgelehnt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={handleClose}>
            Schließen
          </Button>
          
          {userType === 'recruiter' && (
            <Button 
              onClick={handleUpdateStatus} 
              disabled={updating || newStatus === application.status}
            >
              {updating ? 'Wird aktualisiert...' : 'Status aktualisieren'}
            </Button>
          )}
          
          {userType === 'talent' && application.status === 'new' && (
            <Button 
              variant="destructive" 
              onClick={async () => {
                await updateStatus({
                  applicationId: application.id,
                  currentVersion: application.version,
                  newStatus: 'withdrawn'
                });
                handleClose();
              }}
              disabled={updating}
            >
              Bewerbung zurückziehen
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
