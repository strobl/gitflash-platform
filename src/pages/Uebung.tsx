
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { CustomVideoInterview } from "@/components/interviews/custom/CustomVideoInterview";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getConversation, startConversation } from "@/services/tavusService";
import { useAuth } from "@/context/AuthContext";
import { UebungHeader } from "@/components/uebung/UebungHeader";
import { UebungCameraWarning } from "@/components/uebung/UebungCameraWarning";
import { UebungStartSection } from "@/components/uebung/UebungStartSection";
import { UebungDescription } from "@/components/uebung/UebungDescription";
import { UebungCompanyInfo } from "@/components/uebung/UebungCompanyInfo";
import { UebungSimilarInterviews } from "@/components/uebung/UebungSimilarInterviews";
import { UebungDeviceSelector } from "@/components/uebung/UebungDeviceSelector";
import { DailyVideo, DailyProvider, useDevices } from "@daily-co/daily-react";

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
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRequestingCamera, setIsRequestingCamera] = useState(false);
  const [localSessionId, setLocalSessionId] = useState<string | null>(null);
  const [similarInterviews, setSimilarInterviews] = useState([]);
  const [showCameraWarning, setShowCameraWarning] = useState(true);
  
  // Reference to Daily call object
  const callObjectRef = useRef(null);

  useEffect(() => {
    // Check for camera access when component mounts
    checkCameraAccess();
    
    if (id) {
      fetchInterviewDetails();
    }
    
    return () => {
      // Clean up camera preview when component unmounts
      if (callObjectRef.current) {
        callObjectRef.current.destroy();
        callObjectRef.current = null;
      }
    };
  }, [id]);

  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCamera(true);
      // Don't automatically set camera as active, wait for user to click the button
      setShowCameraWarning(false);  // Hide warning if permissions already granted
      // Always stop the stream so we don't keep the camera on unnecessarily
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.log("Camera access denied or unavailable:", err);
      setHasCamera(false);
      setIsCameraActive(false);
      setShowCameraWarning(true);  // Show warning if permissions not granted
    }
  };
  
  const startCamera = async () => {
    try {
      setIsRequestingCamera(true);
      
      if (!callObjectRef.current) {
        console.log("Initializing Daily call object for preview");
        // Initialize Daily call object for preview
        const DailyIFrame = (await import('@daily-co/daily-js')).default;
        callObjectRef.current = DailyIFrame.createCallObject({
          audioSource: true, // Enable microphone
          videoSource: true, // Enable camera
        });
        
        // Join with camera/mic on
        await callObjectRef.current.startCamera();
        setIsCameraActive(true);
        setHasCamera(true);
        setShowCameraWarning(false); // Hide warning once camera is active
        
        // Get the local participant's session ID for the video preview
        const participants = callObjectRef.current.participants();
        if (participants && participants.local) {
          setLocalSessionId(participants.local.session_id);
          console.log("Local session ID set:", participants.local.session_id);
        } else {
          console.error("Could not get local participant", participants);
        }
        
        toast.success('Kamera erfolgreich aktiviert');
      }
    } catch (err) {
      console.error("Error starting camera:", err);
      toast.error('Fehler beim Aktivieren der Kamera. Bitte erlaube den Zugriff in deinen Browsereinstellungen.');
      setHasCamera(false);
      setShowCameraWarning(true);
    } finally {
      setIsRequestingCamera(false);
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
    
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not logged in, redirect to the login page
      const currentPath = `/uebung/${id}`;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    // Check if camera access is available
    if (!hasCamera || !isCameraActive) {
      toast.error('Kamerazugriff ist für das Interview erforderlich');
      await startCamera(); // Try to request camera permission
      return;
    }
    
    setIsStarting(true);
    
    try {
      console.log("Starting interview with ID:", id);
      
      const result = await startConversation(id);
      console.log("Interview start result:", result);
      
      // Success message
      toast.success('Interview erfolgreich gestartet!');
      
      // Set the session information
      setSessionId(result.session_id);
      setConversationUrl(result.url || result.conversation_url);
      setSessionStatus('active');

      // Clean up camera preview as the interview will take over
      if (callObjectRef.current) {
        callObjectRef.current.destroy();
        callObjectRef.current = null;
        setLocalSessionId(null);
      }

      // Return the conversation URL for the embedded interview component
      return result.url || result.conversation_url;
    } catch (error) {
      console.error('Error starting interview:', error);
      toast.error('Fehler beim Starten des Interviews. Bitte versuche es erneut.');
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

  // Camera access button handler
  const handleRequestCameraAccess = async () => {
    console.log("Requesting camera access");
    await startCamera();
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
    <DailyProvider>
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
          
          {/* Camera Access Warning - only show if camera access not granted */}
          {showCameraWarning && !conversationUrl && (
            <UebungCameraWarning 
              onRequestCameraAccess={handleRequestCameraAccess}
              isRequesting={isRequestingCamera}
            />
          )}
          
          {/* Camera Preview and Device Selector (when camera is active but interview not started) */}
          {isCameraActive && localSessionId && !conversationUrl && (
            <>
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
                <div className="aspect-video w-full max-w-2xl mx-auto relative">
                  <DailyVideo 
                    sessionId={localSessionId} 
                    type="video" 
                    automirror 
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                    Videovorschau
                  </div>
                </div>
              </div>
              
              {/* Device Selection */}
              <UebungDeviceSelector />
            </>
          )}
          
          {/* Interview content - only show start section if camera is active */}
          {(!showCameraWarning || isCameraActive) && !conversationUrl && (
            <div className="mt-8">
              <UebungStartSection 
                isStarting={isStarting}
                onStartInterview={handleStartInterview}
                isAuthenticated={isAuthenticated}
                hasDeviceAccess={isCameraActive && hasCamera}
              />
            </div>
          )}
          
          {/* Active interview view */}
          {conversationUrl && (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
              <CustomVideoInterview 
                conversationUrl={conversationUrl} 
                interviewId={id}
                sessionId={sessionId}
                status={sessionStatus}
                onSessionStatusChange={handleSessionStatusChange}
              />
            </div>
          )}
          
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
    </DailyProvider>
  );
};

export default Uebung;
