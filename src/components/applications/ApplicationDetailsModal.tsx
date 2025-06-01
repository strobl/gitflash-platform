
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateApplicationStatus } from '@/hooks/useUpdateApplicationStatus';
import { Application } from '@/hooks/useApplications';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Download, Mail, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationDetailsModalProps {
  application: Application | null;
  userType: 'talent' | 'business';
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationDetailsModal({ 
  application, 
  userType, 
  isOpen, 
  onClose 
}: ApplicationDetailsModalProps) {
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const { updateStatus, updating } = useUpdateApplicationStatus();

  if (!application) return null;

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === application.status) return;
    
    try {
      await updateStatus({
        applicationId: application.id,
        currentVersion: application.version,
        newStatus,
        notes
      });
      
      toast.success('Status erfolgreich aktualisiert');
      setNotes('');
      onClose();
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Status');
    }
  };

  const handleResumeDownload = () => {
    if (!application.resume_url) {
      toast.error('Lebenslauf nicht verfügbar');
      return;
    }

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = application.resume_url;
    link.download = `Lebenslauf_${application.applicant_name.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download gestartet');
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Neu',
      'reviewing': 'In Prüfung',
      'interview': 'Interview',
      'offer': 'Angebot',
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
      case 'offer': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-teal-100 text-teal-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bewerbungsdetails</span>
            <Badge className={getStatusColor(application.status)}>
              {getStatusLabel(application.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {userType === 'talent' 
              ? `Deine Bewerbung für ${application.job?.title || 'Unbenannte Stelle'}`
              : `Bewerbung von ${application.applicant_name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bewerberinformationen */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium">Name</Label>
              <p className="text-sm">{application.applicant_name}</p>
            </div>
            <div>
              <Label className="font-medium">E-Mail</Label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{application.applicant_email}</p>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* LinkedIn Profil */}
          {application.linkedin_profile && (
            <div>
              <Label className="font-medium">LinkedIn Profil</Label>
              <div className="flex items-center gap-2">
                <a 
                  href={application.linkedin_profile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {application.linkedin_profile}
                </a>
                <Button variant="ghost" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Anschreiben */}
          {application.cover_letter && (
            <div>
              <Label className="font-medium">Anschreiben</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm whitespace-pre-wrap">
                {application.cover_letter}
              </div>
            </div>
          )}

          {/* Lebenslauf */}
          {application.resume_url && (
            <div>
              <Label className="font-medium">Lebenslauf</Label>
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResumeDownload}
                  className="hover:bg-gray-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Lebenslauf herunterladen
                </Button>
              </div>
            </div>
          )}

          {/* Bewerbungsdatum */}
          <div>
            <Label className="font-medium">Eingereicht</Label>
            <p className="text-sm text-gray-600">
              {formatDistanceToNow(new Date(application.created_at), { addSuffix: true, locale: de })} 
              ({new Date(application.created_at).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })})
            </p>
          </div>

          {/* Status-Management (nur für Business User) */}
          {userType === 'business' && (
            <div className="border-t pt-4">
              <Label className="font-medium">Status ändern</Label>
              <div className="space-y-4 mt-2">
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Neuen Status wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Neu</SelectItem>
                    <SelectItem value="reviewing">In Prüfung</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Angebot</SelectItem>
                    <SelectItem value="hired">Eingestellt</SelectItem>
                    <SelectItem value="rejected">Abgelehnt</SelectItem>
                  </SelectContent>
                </Select>

                <div>
                  <Label htmlFor="notes">Notizen (optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Fügen Sie eine Notiz zu dieser Statusänderung hinzu..."
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleStatusUpdate}
                  disabled={updating || !newStatus || newStatus === application.status}
                  className="w-full"
                >
                  {updating ? 'Wird aktualisiert...' : 'Status aktualisieren'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
