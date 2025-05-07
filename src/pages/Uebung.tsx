
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { CustomVideoInterview } from "@/components/interviews/custom/CustomVideoInterview";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play } from "lucide-react";
import { toast } from "sonner";
import { getConversation, startConversation } from "@/services/tavusService";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

// Hilfsfunktion zum Zuweisen einer Kategorie basierend auf Interview-Namen oder Kontext
const getCategoryForInterview = (interview) => {
  if (!interview) return 'general';
  
  const name = interview.conversation_name.toLowerCase();
  const context = interview.conversation_context?.toLowerCase() || '';
  
  if (name.includes('architekt') || context.includes('architekt')) return 'architecture';
  if (name.includes('recht') || context.includes('recht') || name.includes('anwalt') || context.includes('anwalt')) return 'law';
  if (name.includes('ingenieur') || context.includes('ingenieur') || name.includes('bau') || context.includes('statik')) return 'engineering';
  if (name.includes('projekt') || context.includes('projekt') || name.includes('manage')) return 'management';
  
  return 'general';
};

const CATEGORIES = {
  architecture: { name: 'Architektur', color: 'blue' },
  law: { name: 'Baurecht', color: 'indigo' },
  engineering: { name: 'Bauingenieurwesen', color: 'orange' },
  management: { name: 'Projektmanagement', color: 'green' },
  general: { name: 'Allgemein', color: 'gray' },
};

const Uebung: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [interviewCategory, setInterviewCategory] = useState('general');

  useEffect(() => {
    if (id) {
      fetchInterviewDetails();
    }
  }, [id]);

  async function fetchInterviewDetails() {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await getConversation(id);
      setInterview(data);
      
      // Kategorie bestimmen
      const category = getCategoryForInterview(data);
      setInterviewCategory(category);
    } catch (error) {
      console.error('Error fetching interview details:', error);
      toast.error('Fehler beim Laden der Interview-Details');
    } finally {
      setIsLoading(false);
    }
  }

  const handleStartInterview = async () => {
    if (!id) return;
    
    // Prüfen, ob der Benutzer eingeloggt ist
    if (!isAuthenticated) {
      // Wenn nicht eingeloggt, zur Login-Seite weiterleiten
      const currentPath = `/uebung/${id}`;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    setIsStarting(true);
    
    try {
      const result = await startConversation(id);
      
      // Erfolgsmeldung anzeigen
      toast.success('Interview erfolgreich gestartet!');
      
      // Set the session information
      setSessionId(result.session_id);
      setConversationUrl(result.url || result.conversation_url);
      setSessionStatus('active');

      // Return the conversation URL for the embedded interview component
      return result.url || result.conversation_url;
    } catch (error) {
      console.error('Error starting interview:', error);
      toast.error('Fehler beim Starten des Interviews');
      throw error;
    } finally {
      setIsStarting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/interviews');
  };

  const handleSessionStatusChange = (status: string) => {
    setSessionStatus(status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
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
        <Header />
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

  const categoryInfo = CATEGORIES[interviewCategory] || CATEGORIES.general;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
        </div>
        
        {/* Interview Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge 
              className={`bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800 hover:bg-${categoryInfo.color}-200`}
            >
              {categoryInfo.name}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{interview.conversation_name}</h1>
          <p className="text-lg text-muted-foreground">
            {interview.conversation_context ? (
              interview.conversation_context.length > 150 
                ? `${interview.conversation_context.substring(0, 150)}...` 
                : interview.conversation_context
            ) : (
              'Keine Beschreibung verfügbar.'
            )}
          </p>
        </div>
        
        {/* Interview Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column: Interview description */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Über dieses Interview</h2>
              <p className="whitespace-pre-line text-gray-700">{interview.conversation_context || 'Keine Kontextinformationen verfügbar.'}</p>
              
              <div className="mt-8 space-y-4">
                <h3 className="font-medium">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Kategorie</p>
                    <p>{categoryInfo.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Sprache</p>
                    <p>{interview.language === 'de' ? 'Deutsch' : interview.language}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Dauer</p>
                    <p>{Math.floor(interview.max_call_duration / 60)} Minuten</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Schwierigkeit</p>
                    <p>Mittel</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Hinweise für Kandidaten</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                <li>Stellen Sie sicher, dass Ihre Kamera und Ihr Mikrofon funktionieren</li>
                <li>Suchen Sie einen ruhigen Ort ohne Hintergrundgeräusche</li>
                <li>Sprechen Sie deutlich und in normaler Geschwindigkeit</li>
                <li>Das Interview kann jederzeit beendet werden</li>
                <li>Nach dem Interview erhalten Sie sofortiges Feedback</li>
              </ul>
            </div>
          </div>
          
          {/* Right column: Start interview / Video interface */}
          <div className="md:col-span-1">
            {!conversationUrl ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="bg-gitflash-primary/20 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Play className="h-8 w-8 text-gitflash-primary ml-1" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Bereit für das Interview?</h2>
                <p className="text-gray-600 mb-6 max-w-sm">
                  Starten Sie das Interview, um mit dem KI-Interviewer zu sprechen und Ihre Fähigkeiten zu testen.
                </p>
                <Button 
                  onClick={handleStartInterview} 
                  className="bg-gitflash-accent hover:bg-gitflash-accent/90"
                  disabled={isStarting}
                  size="lg"
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Wird gestartet...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Interview jetzt starten
                    </>
                  )}
                </Button>
                {!isAuthenticated && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Zum Starten des Interviews ist ein Login erforderlich.
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <CustomVideoInterview 
                  conversationUrl={conversationUrl} 
                  interviewId={id}
                  sessionId={sessionId}
                  status={sessionStatus}
                  onSessionStatusChange={handleSessionStatusChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uebung;
