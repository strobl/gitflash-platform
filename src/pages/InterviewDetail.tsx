
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ExternalLink, ChevronLeft, Play, AlertTriangle, RefreshCcw } from 'lucide-react';

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
import { EmbeddedInterview } from '@/components/interviews/EmbeddedInterview';

export default function InterviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [useEmbeddedView, setUseEmbeddedView] = useState(true);

  const isTalent = profile?.role === 'user';
  const isBusiness = profile?.role === 'business';

  useEffect(() => {
    fetchInterviewDetails();
  }, [id]);

  async function fetchInterviewDetails() {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await getConversation(id);
      console.log('Fetched interview details:', data);
      setInterview(data);
      
      // Wenn das Interview bereits aktiv ist, bereinigen wir mögliche Fehlermeldungen
      if (data.status === 'active' && data.conversation_url && data.conversation_url !== 'pending') {
        setErrorMessage(null);
        setDebugInfo(null);
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
      toast.error('Fehler beim Laden der Interview-Details');
    } finally {
      setIsLoading(false);
    }
  }

  const handleBackClick = () => {
    navigate('/interviews');
  };

  const handleRefresh = () => {
    fetchInterviewDetails();
    toast.info('Daten werden aktualisiert...');
  };

  // Funktion zum Starten eines Interviews über die Tavus API
  const handleStartInterview = async () => {
    if (!id) return;
    
    setIsStarting(true);
    setErrorMessage(null);
    setDebugInfo(null);
    
    try {
      console.log('Starting interview, ID:', id);
      
      const toastId = toast.loading('Interview wird gestartet...');
      
      const result = await startConversation(id);
      console.log('Interview started successfully, response:', result);
      
      // Erfolgsmeldung anzeigen
      toast.dismiss(toastId);
      toast.success('Interview erfolgreich gestartet!');
      
      // Update the local interview data with the Tavus response
      setInterview(prev => ({
        ...prev,
        conversation_id: result.id || result.conversation_id,
        conversation_url: result.url || result.conversation_url,
        status: 'active',
        participant_name: result.participant_name
      }));
      
      // In embedded view, no need to open a new tab
      if (!useEmbeddedView) {
        // Open the Tavus interview in a new tab only if not in embedded view
        const conversationUrl = result.url || result.conversation_url;
        if (conversationUrl) {
          window.open(conversationUrl, '_blank');
        } else {
          setErrorMessage('Keine gültige Interview-URL erhalten');
          console.error('No valid conversation URL received', result);
        }
      }
    } catch (error) {
      console.error('Error starting interview:', error);
      
      let errorMsg = '';
      let debugMsg = '';
      
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
      // Toggle embedded view off and open in new tab
      setUseEmbeddedView(false);
      window.open(interview.conversation_url, '_blank');
    }
  };

  const toggleEmbeddedView = () => {
    setUseEmbeddedView(!useEmbeddedView);
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

  const isActive = interview.status === 'active' && interview.conversation_url && interview.conversation_url !== 'pending';
  const isDraft = interview.status === 'pending' || !interview.conversation_url || interview.conversation_url === 'pending';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            className="flex gap-2 items-center"
          >
            <RefreshCcw size={16} />
            Aktualisieren
          </Button>
        </div>
        
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
            {isDraft && (
              <Button 
                onClick={handleStartInterview}
                className={isTalent ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
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
                    {isTalent ? 'Interview starten' : 'Interview testen'}
                  </>
                )}
              </Button>
            )}
            
            {isActive && !useEmbeddedView && (
              <Button 
                onClick={() => setUseEmbeddedView(true)}
                className="bg-gitflash-accent hover:bg-gitflash-accent/90"
              >
                {isTalent ? 'Interview einbetten' : 'In GitFlash anzeigen'}
              </Button>
            )}
            
            {isActive && useEmbeddedView && (
              <Button 
                onClick={handleOpenInterview}
                variant="outline"
              >
                In neuem Tab öffnen
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
              
              <div className="mt-4">
                <p className="font-medium mb-2">Mögliche Lösungen:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Überprüfen Sie, ob der TAVUS_API_KEY korrekt in den Supabase-Secrets konfiguriert ist.</li>
                  <li>Stellen Sie sicher, dass eine Internetverbindung besteht.</li>
                  <li>Versuchen Sie es später noch einmal.</li>
                </ul>
                
                <Button onClick={handleStartInterview} variant="outline" size="sm" className="mt-3">
                  Erneut versuchen
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Embedded Interview when active and embedded view is enabled */}
        {isActive && useEmbeddedView && (
          <div className="mb-6">
            <EmbeddedInterview 
              conversationUrl={interview.conversation_url} 
              onFullscreenOpen={() => setUseEmbeddedView(false)}
            />
          </div>
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
              
              {interview.participant_name && (
                <div>
                  <h3 className="font-medium mb-1">Teilnehmer</h3>
                  <p>{interview.participant_name}</p>
                </div>
              )}
              
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
                <p>{interview.replica_id || "r9fa0878977a (Standard)"}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Persona ID</h3>
                <p>{interview.persona_id || "pe13ed370726 (Standard)"}</p>
              </div>
              
              {interview.conversation_id && interview.conversation_id !== 'pending' && (
                <div>
                  <h3 className="font-medium mb-1">Conversation ID</h3>
                  <p className="break-all">{interview.conversation_id}</p>
                </div>
              )}

              {isActive && (
                <div>
                  <h3 className="font-medium mb-1">Conversation Link</h3>
                  <a 
                    href={interview.conversation_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all flex items-center"
                  >
                    {interview.conversation_url}
                    <ExternalLink className="h-3 w-3 ml-1 inline-block" />
                  </a>
                </div>
              )}
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
          
          {isDraft && (
            <Card className={isTalent ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}>
              <CardHeader>
                <CardTitle className={isTalent ? "text-green-800" : "text-blue-800"}>Interview starten</CardTitle>
                <CardDescription className={isTalent ? "text-green-700" : "text-blue-700"}>
                  {isTalent ? "Nehmen Sie an diesem KI-Interview teil" : "Testen Sie dieses KI-Interview"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${isTalent ? "text-green-700" : "text-blue-700"}`}>
                  {isTalent 
                    ? "Klicken Sie auf \"Interview starten\", um mit diesem KI-Interview zu beginnen. Ihre Antworten werden aufgezeichnet und können vom Unternehmen eingesehen werden."
                    : "Als Ersteller können Sie dieses Interview testen, bevor Sie es an Kandidaten freigeben."
                  }
                </p>
                <Button 
                  onClick={handleStartInterview} 
                  className={`w-full ${isTalent 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-blue-600 hover:bg-blue-700"}`}
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
                      {isTalent ? 'Interview starten' : 'Interview testen'}
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
