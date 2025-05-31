
import { useState } from 'react';
import { Application, ApplicationHistoryItem } from '@/hooks/useApplications';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { useUpdateApplicationStatus } from '@/hooks/useUpdateApplicationStatus';

interface ApplicationHistoryDialogProps {
  application: Application;
  userType: 'talent' | 'business';
  onClose: () => void;
}

export function ApplicationHistoryDialog({ application, userType, onClose }: ApplicationHistoryDialogProps) {
  const [newStatus, setNewStatus] = useState(application.status);
  const [notes, setNotes] = useState('');
  const { updateStatus, updating } = useUpdateApplicationStatus();

  const statusOptions = [
    { value: 'new', label: 'Neu' },
    { value: 'in_review', label: 'In Prüfung' },
    { value: 'interview', label: 'Interview' },
    { value: 'offer', label: 'Angebot' },
    { value: 'hired', label: 'Eingestellt' },
    { value: 'rejected', label: 'Abgelehnt' },
    { value: 'withdrawn', label: 'Zurückgezogen' }
  ];

  const handleStatusUpdate = async () => {
    if (newStatus !== application.status) {
      await updateStatus({
        applicationId: application.id,
        currentVersion: application.version,
        newStatus,
        notes: notes || `Status geändert zu ${newStatus}`
      });
      onClose();
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_review': return 'secondary';
      case 'interview': return 'outline';
      case 'offer': return 'default';
      case 'hired': return 'default';
      case 'rejected': return 'destructive';
      case 'withdrawn': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bewerbungsdetails</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Stelle</Label>
              <p className="text-sm">{application.job?.title || 'Unbekannt'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge variant={getStatusBadgeVariant(application.status) as any}>
                {statusOptions.find(opt => opt.value === application.status)?.label || application.status}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Bewerber</Label>
              <p className="text-sm">{application.applicant_name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">E-Mail</Label>
              <p className="text-sm">{application.applicant_email}</p>
            </div>
          </div>

          {application.cover_letter && (
            <div>
              <Label className="text-sm font-medium">Anschreiben</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <p className="text-sm">{application.cover_letter}</p>
              </div>
            </div>
          )}

          {userType === 'business' && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium">Status ändern</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Neuer Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notiz (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Grund für Statusänderung..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button 
                  onClick={handleStatusUpdate}
                  disabled={updating || newStatus === application.status}
                >
                  Status aktualisieren
                </Button>
              </div>
            </div>
          )}

          {application.history && application.history.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Verlauf</h3>
              <div className="space-y-2">
                {application.history.map((item: ApplicationHistoryItem) => (
                  <div key={item.id} className="text-sm border-l-2 border-gray-200 pl-3">
                    <div className="flex justify-between items-start">
                      <span>
                        Status geändert von "{item.old_status || 'Neu'}" zu "{item.new_status}"
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDistanceToNow(new Date(item.changed_at), { addSuffix: true, locale: de })}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-gray-600 mt-1">{item.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
