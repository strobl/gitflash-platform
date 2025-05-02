import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ExternalLink, ChevronLeft, Play, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getConversation, startConversation } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function InterviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const isTalent = profile?.role === 'user';
  const isBusiness = profile?.role === 'business';

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

  // Funktion zum Starten eines Interviews über die Tavus API
  const handleStartInterview = async () => {
    if (!id) return;
    
    setIsStarting(true);
    setErrorMessage(null);
    setDebugInfo(null);
    
    try {
      console.log('Starting interview, ID:', id);
      toast.loading('Interview wird gestartet...');
      
      const result = await startConversation(id);
      console.log('Interview started, response:', result);
      
      // Erfolgsmeldung anzeigen
      toast.dismiss();
      toast.success('Interview erfolgreich gestartet! Sie können jetzt teilnehmen.');
      
      // Update the local interview data with the Tavus response
      setInterview(prev => ({
        ...prev,
        conversation_id: result.conversation_id || result.id,
        conversation_url: result.conversation_url || result.url,
        status: result.status || 'active'
      }));
      
      // Open the Tavus interview in a new tab
      const conversationUrl = result.conversation_url || result.url;
      if (conversationUrl) {
        window.open(conversationUrl, '_blank');
      } else {
        setErrorMessage('Keine gültige Interview-URL erhalten');
        console.error('No valid conversation URL received', result);
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error starting interview:', error);
      
      let errorMsg, debugMsg;
      
      if (error instanceof Error) {
        errorMsg = `Fehler beim Starten des Interviews: ${error.message}`;
        debugMsg = error.stack || '';
      } else if (typeof error === 'object' && error !== null) {
        errorMsg = 'Fehler beim Starten des Interviews';
        debugMsg = JSON.stringify(error, null, 2);
      } else {
        errorMsg = `Fehler beim Starten des Interviews: ${String(error)}`;
      }
      
      setErrorMessage(errorMsg);
      setDebugInfo(debugMsg);
      toast.error('Fehler beim Starten des Interviews');
    } finally {
      setIsStarting(false);
    }
  };

  const handleOpenInterview = () => {
    if (interview?.conversation_url && interview.conversation_url !== 'pending') {
      window.open(interview.conversation_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8">
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Interview-Details werden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Interview nicht gefunden</h2>
            <p className="text-muted-foreground mb-6">
              Das angeforderte Interview wurde nicht gefunden oder Sie haben keinen Zugriff darauf.
            </p>
            <Button onClick={handleBackClick}>Zurück zur Übersicht</Button>
          </div>
        </div>
      </div>
    );
  }

  const isActive = interview.status === 'active' && interview.conversation_url !== 'pending';
  const isDraft = interview.status === 'draft' || interview.conversation_url === 'pending';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
            <div className="flex flex-wrap gap-3 mt-1">
              <Badge variant={isDraft ? "outline" : "default"}>
                Status: {isDraft ? 'Entwurf' : interview.status}
              </Badge>
              
              {interview.replica_id && (
                <Badge variant="secondary">
                  Replica ID: {interview.replica_id}
                </Badge>
              )}
              
              {interview.persona_id && (
                <Badge variant="secondary">
                  Persona ID: {interview.persona_id}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Verschiedene Buttons je nach Status und Benutzerrolle */}
          <div className="flex gap-2">
            {isTalent && isDraft && (
              <Button 
                onClick={handleStartInterview}
                className="bg-green-600 hover:bg-green-700"
                disabled={isStarting}
              >
                {isStarting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div>
                    Wird gestartet...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Interview starten
                  </>
                )}
              </Button>
            )}
            
            {isActive && (
              <Button 
                onClick={handleOpenInterview}
                className="bg-gitflash-accent hover:bg-gitflash-accent/90"
              >
                {isTalent ? 'Am Interview teilnehmen' : 'Interview öffnen'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription className="whitespace-pre-line">
              {errorMessage}
              
              {debugInfo && (
                <div className="mt-3 p-2 rounded bg-black/5 overflow-x-auto text-xs">
                  <pre>{debugInfo}</pre>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Interview-Details</CardTitle>
              <CardDescription>Grundlegende Informationen zum Interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Status</h3>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isDraft 
                    ? "bg-yellow-100 text-yellow-800" 
                    : interview.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                }`}>
                  {isDraft ? 'Entwurf' : interview.status}
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
              
              <div>
                <h3 className="font-medium mb-1">Replica ID</h3>
                <p>{interview.replica_id || "Nicht angegeben"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Persona ID</h3>
                <p>{interview.persona_id || "Nicht angegeben"}</p>
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
          
          {isTalent && isDraft && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Interview starten</CardTitle>
                <CardDescription className="text-green-700">
                  Nehmen Sie an diesem KI-Interview teil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-green-700">
                  Klicken Sie auf "Interview starten", um mit diesem KI-Interview zu beginnen. 
                  Ihre Antworten werden aufgezeichnet und können vom Unternehmen eingesehen werden.
                </p>
                <Button 
                  onClick={handleStartInterview} 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  disabled={isStarting}
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div>
                      Wird gestartet...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Interview starten
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
