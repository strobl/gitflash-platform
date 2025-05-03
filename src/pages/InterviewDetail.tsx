import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ExternalLink, ChevronLeft, Play, AlertTriangle, RefreshCcw, PlusCircle, Clock, CheckCircle2, Video, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getConversation, startConversation, getInterviewSessions, getConversationRecording } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { EmbeddedInterview } from '@/components/interviews/EmbeddedInterview';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InterviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [interview, setInterview] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');

  const isTalent = profile?.role === 'user';
  const isBusiness = profile?.role === 'business';

  useEffect(() => {
    if (id) {
      fetchInterviewDetails();
      fetchInterviewSessions();
    }
  }, [id]);

  async function fetchInterviewDetails() {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await getConversation(id);
      console.log('Fetched interview details:', data);
      setInterview(data);
      
      // Bereinigen wir mögliche Fehlermeldungen
      setErrorMessage(null);
      setDebugInfo(null);
    } catch (error) {
      console.error('Error fetching interview details:', error);
      toast.error('Fehler beim Laden der Interview-Details');
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchInterviewSessions() {
    if (!id) return;
    
    try {
      const data = await getInterviewSessions(id);
      console.log('Fetched interview sessions:', data);
      setSessions(data || []);
      
      // Set the current session to the most recent active one if available
      const activeSession = data.find(s => (s.status === 'active' || s.status === 'waiting') && s.conversation_url);
      if (activeSession) {
        setCurrentSession(activeSession);
        setActiveTab('interview');
      } else {
        // Wenn keine aktive Session existiert, prüfe, ob es eine beendete Session mit Aufnahme gibt
        const closedSessionWithRecording = data.find(s => 
          s.status === 'ended' && s.conversation_url && 
          (s.recording_status === 'ready' || s.recording_status === 'processing')
        );
        
        if (closedSessionWithRecording) {
          setCurrentSession(closedSessionWithRecording);
          setActiveTab('interview');
        }
      }
    } catch (error) {
      console.error('Error fetching interview sessions:', error);
    }
  }

  const handleBackClick = () => {
    navigate('/interviews');
  };

  const handleRefresh = () => {
    fetchInterviewDetails();
    fetchInterviewSessions();
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
      
      // Fetch updated sessions list
      await fetchInterviewSessions();
      
      // Set the current session to the newly created one
      const newSession = {
        id: result.session_id,
        conversation_id: result.id,
        conversation_url: result.url || result.conversation_url,
        status: 'active',
        participant_name: result.participant_name
      };
      
      setCurrentSession(newSession);
      setActiveTab('interview');

      // Return the conversation URL for the embedded interview component
      return result.url || result.conversation_url;
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
      throw error;
    } finally {
      setIsStarting(false);
    }
  };

  const handleSelectSession = (session: any) => {
    setCurrentSession(session);
    setActiveTab('interview');
  };

  const handleSessionStatusChange = async (status: string) => {
    if (!currentSession) return;
    
    // Update the local state
    setCurrentSession({
      ...currentSession,
      status
    });
    
    // Refresh the sessions list to reflect the status change
    await fetchInterviewSessions();
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

  const hasActiveSession = currentSession && (currentSession.status === 'active' || currentSession.status === 'waiting') && currentSession.conversation_url;
  const hasClosedSession = currentSession && currentSession.status === 'ended' && currentSession.conversation_url;
  const hasRecording = currentSession && currentSession.recording_url && currentSession.recording_status === 'ready';

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
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{interview.conversation_name}</h1>
            <div className="flex flex-wrap gap-3 mt-1">
              <Badge variant="outline">
                Vorlage
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="interview" disabled={!hasActiveSession && !hasClosedSession && !id}>
                Interview
                {hasRecording && <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>}
              </TabsTrigger>
              <TabsTrigger value="sessions">Sitzungen ({sessions.length})</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Interview-Vorlage</CardTitle>
                  <CardDescription>Grundlegende Informationen zum Interview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <div>
                    <h3 className="font-medium mb-1">Sprache</h3>
                    <p>{interview.language === 'de' ? 'Deutsch' : interview.language}</p>
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
          </TabsContent>
          
          <TabsContent value="interview">
            {hasActiveSession || hasClosedSession ? (
              <>
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-1">
                    {currentSession.status === 'ended' ? 'Beendete Interview-Sitzung' : 
                     currentSession.status === 'waiting' ? 'Interview wird initialisiert' : 
                     'Aktive Interview-Sitzung'}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-muted-foreground text-sm flex items-center">
                      <span>
                        Sitzung gestartet am {new Date(currentSession.created_at).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </p>
                    
                    <Badge variant={currentSession.status === 'ended' ? 'outline' : 
                                    currentSession.status === 'waiting' ? 'secondary' : 'default'}>
                      {currentSession.status === 'active' ? 'Aktiv' : 
                       currentSession.status === 'waiting' ? 'Initialisierung' :
                       currentSession.status === 'ended' ? 'Beendet' : currentSession.status}
                    </Badge>
                    
                    {currentSession.recording_status && (
                      <Badge variant={
                        currentSession.recording_status === 'ready' ? 'success' :
                        currentSession.recording_status === 'processing' ? 'secondary' :
                        currentSession.recording_status === 'error' || currentSession.recording_status === 'failed' ? 'destructive' :
                        'outline'
                      }>
                        <Video className="h-3 w-3 mr-1" />
                        {currentSession.recording_status === 'ready' ? 'Aufnahme verfügbar' :
                         currentSession.recording_status === 'processing' ? 'Aufnahme wird verarbeitet' :
                         currentSession.recording_status === 'error' || currentSession.recording_status === 'failed' ? 'Aufnahme fehlgeschlagen' :
                         'Keine Aufnahme'}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <EmbeddedInterview 
                  conversationUrl={currentSession.conversation_url} 
                  interviewId={id}
                  conversationId={currentSession.conversation_id}
                  sessionId={currentSession.id}
                  status={currentSession.status}
                  onSessionStatusChange={handleSessionStatusChange}
                />
              </>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <div className="bg-gitflash-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-gitflash-primary ml-1" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kein aktives Interview</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Starten Sie ein neues Interview, um den Interviewprozess zu beginnen.
                </p>
                <Button 
                  onClick={handleStartInterview} 
                  className="bg-gitflash-accent hover:bg-gitflash-accent/90"
                  disabled={isStarting}
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Wird gestartet...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Neues Interview starten
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Interview-Sitzungen</CardTitle>
                  <CardDescription>
                    Übersicht aller Durchführungen dieses Interviews
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleStartInterview}
                  disabled={isStarting}
                >
                  {isStarting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full"></div>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Neue Sitzung
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">Keine Interview-Sitzungen vorhanden</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Starten Sie ein neues Interview, um eine Sitzung zu erstellen
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => {
                      const isActive = session.status === 'active' && session.conversation_url;
                      const isInitializing = session.status === 'waiting' && session.conversation_url;
                      const isClosed = session.status === 'ended';
                      const hasRecording = session.recording_status === 'ready' && session.recording_url;
                      
                      return (
                        <div 
                          key={session.id}
                          className={`p-4 border rounded-md flex items-center justify-between ${
                            currentSession?.id === session.id ? 'border-gitflash-primary bg-gitflash-primary/5' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-4 ${
                              isActive ? 'bg-green-100' : 
                              isInitializing ? 'bg-yellow-100' :
                              isClosed ? 'bg-gray-100' : 'bg-yellow-100'
                            }`}>
                              {isActive ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : isInitializing ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : isClosed ? (
                                <CheckCircle2 className="h-5 w-5 text-gray-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                Sitzung vom {new Date(session.created_at).toLocaleDateString('de-DE', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </p>
                              <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                                <span>{new Date(session.created_at).toLocaleTimeString('de-DE')}</span>
                                {session.participant_name && <span>• Teilnehmer: {session.participant_name}</span>}
                                <span>• Status: {
                                  isActive ? 'Aktiv' : 
                                  isInitializing ? 'Initialisierung' :
                                  isClosed ? 'Beendet' : session.status
                                }</span>
                                
                                {/* Zeige Recording Status an */}
                                {session.recording_status && session.recording_status !== 'pending' && (
                                  <span className={`inline-flex items-center ${
                                    session.recording_status === 'ready' ? 'text-green-600' :
                                    session.recording_status === 'processing' ? 'text-yellow-600' :
                                    'text-red-600'
                                  }`}>
                                    <Video className="h-3 w-3 mr-1" />
                                    {session.recording_status === 'ready' ? 'Aufnahme verfügbar' :
                                     session.recording_status === 'processing' ? 'Wird verarbeitet' :
                                     'Aufnahme fehlgeschlagen'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {hasRecording && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(session.recording_url, '_blank')}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Aufnahme
                              </Button>
                            )}
                            
                            {(isActive || isClosed || isInitializing) && session.conversation_url && (
                              <Button 
                                size="sm" 
                                onClick={() => handleSelectSession(session)}
                                variant={currentSession?.id === session.id ? "default" : "outline"}
                              >
                                {currentSession?.id === session.id ? 'Aktiv' : 'Anzeigen'}
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
