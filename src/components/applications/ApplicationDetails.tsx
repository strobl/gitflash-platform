
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import type { Application, ApplicationHistoryItem } from '@/hooks/useApplications';

interface ApplicationDetailsProps {
  application: Application;
  onStatusUpdate?: (newStatus: string, notes?: string) => void;
  userType: 'talent' | 'recruiter';
}

export function ApplicationDetails({ application, onStatusUpdate, userType }: ApplicationDetailsProps) {
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!onStatusUpdate) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(newStatus, notes);
      setNotes('');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Application Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>Bewerbungsdetails</CardTitle>
            <ApplicationStatusBadge status={application.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="font-medium">Eingereicht am</Label>
            <p className="text-sm text-gray-600">
              {new Date(application.created_at).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {application.cover_letter && (
            <div>
              <Label className="font-medium">Anschreiben</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                {application.cover_letter}
              </div>
            </div>
          )}
          
          {application.resume_url && (
            <div>
              <Label className="font-medium">Lebenslauf</Label>
              <div className="mt-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                    Lebenslauf ansehen
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status History */}
      {application.history && application.history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Status-Verlauf</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {application.history.map((historyItem) => (
                <div key={historyItem.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <ApplicationStatusBadge status={historyItem.new_status} />
                      {historyItem.old_status && (
                        <>
                          <span className="text-sm text-gray-400">von</span>
                          <ApplicationStatusBadge status={historyItem.old_status} />
                        </>
                      )}
                    </div>
                    {historyItem.notes && (
                      <p className="text-sm text-gray-600 mt-1">{historyItem.notes}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{new Date(historyItem.changed_at).toLocaleDateString('de-DE')}</div>
                    <div>{historyItem.profile?.name || 'System'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions for Recruiters */}
      {userType === 'recruiter' && onStatusUpdate && (
        <Card>
          <CardHeader>
            <CardTitle>Status ändern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => handleStatusUpdate('reviewing')}
                disabled={isUpdating || application.status === 'reviewing'}
                variant="outline"
              >
                In Bearbeitung
              </Button>
              <Button
                onClick={() => handleStatusUpdate('interview')}
                disabled={isUpdating || application.status === 'interview'}
                variant="outline"
              >
                Vorstellungsgespräch
              </Button>
              <Button
                onClick={() => handleStatusUpdate('offer')}
                disabled={isUpdating || application.status === 'offer'}
                variant="outline"
              >
                Angebot
              </Button>
              <Button
                onClick={() => handleStatusUpdate('hired')}
                disabled={isUpdating || application.status === 'hired'}
                variant="default"
              >
                Eingestellt
              </Button>
              <Button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isUpdating || application.status === 'rejected'}
                variant="destructive"
              >
                Ablehnen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
