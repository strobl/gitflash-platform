import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { CustomVideoInterview } from "@/components/interviews/custom/CustomVideoInterview";
import { ChevronLeft, Play, ArrowRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getConversation, startConversation } from "@/services/tavusService";
import { useAuth } from "@/context/AuthContext";
import { UebungHeader } from "@/components/uebung/UebungHeader";
import { UebungCameraWarning } from "@/components/uebung/UebungCameraWarning";
import { UebungStartSection } from "@/components/uebung/UebungStartSection";
import { UebungDescription } from "@/components/uebung/UebungDescription";
import { UebungCompanyInfo } from "@/components/uebung/UebungCompanyInfo";
import { UebungSimilarInterviews } from "@/components/uebung/UebungSimilarInterviews";

// Hilfsfunktion zum Zuweisen einer Kategorie basierend auf Interview-Namen oder Kontext
const getCategoryForInterview = (interview) => {
  if (!interview) return 'general';
  
  const name = interview.conversation_name?.toLowerCase() || '';
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
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [similarInterviews, setSimilarInterviews] = useState([]);

  useEffect(() => {
    // Check for camera access when component mounts
    checkCameraAccess();
    
    if (id) {
      fetchInterviewDetails();
    }
  }, [id]);

  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCamera(true);
      // Always stop the stream so we don't keep the camera on
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.log("Camera access denied or unavailable:", err);
      setHasCamera(false);
    }
  };

  async function fetchInterviewDetails() {
    if (!id) return;
    
    try {
      setIsLoading(true);
      console.log(`Fetching interview with ID: ${id}`);
      const data = await getConversation(id);
      console.log("Interview data:", data);
      setInterview(data);
      
      // Kategorie bestimmen
      const category = getCategoryForInterview(data);
      setInterviewCategory(category);
      
      // Fetch similar interviews (mock data for now)
      const mockSimilarInterviews = [
        {
          id: "similar1",
          conversation_name: "Bauprojektmanager",
          conversation_context: "Führung von Bauprojekten und Ressourcenplanung",
          image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
          duration: "18m",
          difficulty: "Mittel",
          category: category
        },
        {
          id: "similar2",
          conversation_name: "Baustellenleiter",
          conversation_context: "Koordination von Baustellen und Sicherheitsvorschriften",
          image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
          duration: "22m",
          difficulty: "Schwer",
          category: category
        },
        {
          id: "similar3",
          conversation_name: "Tiefbauingenieur",
          conversation_context: "Planung und Umsetzung von Infrastrukturprojekten",
          image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
          duration: "15m",
          difficulty: "Einfach",
          category: category
        }
      ];
      setSimilarInterviews(mockSimilarInterviews);
      
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
      <div className="min-h-screen flex flex-col bg-white">
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
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="container py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Interview nicht gefunden</h2>
            <p className="text-muted-foreground mb-6">
              Das angeforderte Interview wurde nicht gefunden oder Sie haben keinen Zugriff darauf.
            </p>
            <button 
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 bg-gitflash-primary text-white px-4 py-2 rounded hover:bg-gitflash-primary/90"
            >
              <ChevronLeft className="h-4 w-4" />
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = CATEGORIES[interviewCategory] || CATEGORIES.general;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="container mx-auto pt-6 pb-12 px-4">
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="inline-flex items-center text-gitflash-primary hover:text-gitflash-primary/80 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück zur Übersicht
        </button>
        
        {/* Interview Header */}
        <UebungHeader 
          title={interview.conversation_name}
          category={categoryInfo}
        />
        
        {/* Camera Access Warning */}
        {hasCamera === false && !conversationUrl && (
          <UebungCameraWarning />
        )}
        
        {/* Interview content */}
        <div className="mt-8">
          {!conversationUrl ? (
            <UebungStartSection 
              isStarting={isStarting}
              onStartInterview={handleStartInterview}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
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
        
        {/* Interview Description */}
        <UebungDescription 
          interview={interview}
          categoryName={categoryInfo.name}
        />
        
        {/* Company Info */}
        <UebungCompanyInfo />
        
        {/* Similar Interviews */}
        <UebungSimilarInterviews 
          interviews={similarInterviews}
          category={categoryInfo.name}
        />
      </main>
    </div>
  );
};

export default Uebung;
