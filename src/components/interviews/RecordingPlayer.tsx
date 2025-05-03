
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getConversationRecording } from '@/services/tavusService';
import { Loader2, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RecordingPlayerProps {
  conversationId: string;
  sessionId: string;
}

export function RecordingPlayer({ conversationId, sessionId }: RecordingPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function loadRecording() {
      if (!conversationId || !sessionId) {
        setError('Fehlende Informationen zur Aufnahme');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const recordingData = await getConversationRecording(conversationId, sessionId);
        
        if (recordingData.status === 'processing') {
          // Wenn die Aufnahme noch verarbeitet wird und wir noch nicht zu oft versucht haben
          if (retryCount < 5) {
            // Versuche es nach 5 Sekunden erneut
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 5000);
            return;
          } else {
            setError('Die Verarbeitung der Aufnahme dauert länger als erwartet. Bitte versuchen Sie es später erneut.');
            setIsLoading(false);
            return;
          }
        }
        
        if (recordingData.status === 'error' || recordingData.status === 'failed') {
          setError('Die Aufnahme konnte nicht abgerufen werden.');
          setIsLoading(false);
          return;
        }
        
        if (recordingData.recording_url) {
          setRecordingUrl(recordingData.recording_url);
        } else {
          setError('Keine Aufnahme-URL gefunden');
        }
      } catch (error) {
        console.error('Error loading recording:', error);
        setError(error instanceof Error ? error.message : 'Fehler beim Laden der Aufnahme');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadRecording();
  }, [conversationId, sessionId, retryCount]);
  
  const handleDownload = () => {
    if (recordingUrl) {
      // Dateiname generieren
      const fileName = `interview-${sessionId}-recording.mp4`;
      
      // Download starten
      const a = document.createElement('a');
      a.href = recordingUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success('Download gestartet');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gitflash-primary mb-4" />
        <p className="text-muted-foreground">
          {retryCount > 0 
            ? `Aufnahme wird verarbeitet, bitte warten (${retryCount}/5)...` 
            : 'Aufnahme wird geladen...'}
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (!recordingUrl) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p>Keine Aufnahme verfügbar</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <video
          src={recordingUrl}
          controls
          className="w-full"
          style={{ maxHeight: '70vh' }}
        >
          Ihr Browser unterstützt keine Videowiedergabe.
        </video>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleDownload} 
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Aufnahme herunterladen
        </Button>
      </div>
    </div>
  );
}
