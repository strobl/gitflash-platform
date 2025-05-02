
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ExternalLink, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getConversation } from '@/services/tavusService';

export default function InterviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInterviewDetails() {
      if (!id) return;
      
      try {
        const data = await getConversation(id);
        setInterview(data);
      } catch (error) {
        console.error('Error fetching interview details:', error);
        toast.error('Fehler beim Laden der Interview-Details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchInterviewDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/interviews');
  };

  const handleOpenInterview = () => {
    if (interview?.conversation_url) {
      window.open(interview.conversation_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Interview-Details werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Interview nicht gefunden</h2>
          <p className="text-muted-foreground mb-6">
            Das angeforderte Interview wurde nicht gefunden oder Sie haben keinen Zugriff darauf.
          </p>
          <Button onClick={handleBackClick}>Zurück zur Übersicht</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button 
        variant="ghost" 
        onClick={handleBackClick} 
        className="mb-6"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Zurück zur Übersicht
      </Button>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{interview.conversation_name}</h1>
          <p className="text-muted-foreground">
            Interview-ID: {interview.conversation_id}
          </p>
        </div>
        <Button 
          onClick={handleOpenInterview}
          className="bg-gitflash-accent hover:bg-gitflash-accent/90"
        >
          Interview öffnen
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interview-Details</CardTitle>
            <CardDescription>Grundlegende Informationen zum Interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Status</h3>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {interview.status}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Sprache</h3>
              <p>{interview.language === 'de' ? 'Deutsch' : interview.language}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Erstellt am</h3>
              <p>{new Date(interview.created_at).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Maximale Dauer</h3>
              <p>{interview.max_call_duration} Sekunden</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Interviewkontext</CardTitle>
            <CardDescription>Anweisungen für den KI-Interviewer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-muted/20">
              <p className="whitespace-pre-line">{interview.conversation_context || 'Keine Kontextinformationen verfügbar.'}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Begrüßung</CardTitle>
            <CardDescription>Initiale Begrüßung des Kandidaten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-muted/20">
              <p className="whitespace-pre-line">{interview.custom_greeting || 'Keine benutzerdefinierte Begrüßung.'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
