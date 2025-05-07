import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { CustomVideoInterview } from "@/components/interviews/custom/CustomVideoInterview";
import { ChevronLeft, Camera } from "lucide-react";
import { toast } from "sonner";
import { getConversation, startConversation } from "@/services/tavusService";
import { useAuth } from "@/context/AuthContext";
import { useCamera } from "@/context/CameraContext";
import { UebungHeader } from "@/components/uebung/UebungHeader";
import { UebungStartSection, CameraStatus } from "@/components/uebung/UebungStartSection";
import { UebungDescription } from "@/components/uebung/UebungDescription";
import { UebungCompanyInfo } from "@/components/uebung/UebungCompanyInfo";
import { UebungSimilarInterviews } from "@/components/uebung/UebungSimilarInterviews";
import { DailyVideo, DailyProvider } from "@daily-co/daily-react";
import type { DailyCall } from '@daily-co/daily-js';
import { getDailyCallInstance, destroyDailyCallInstance, setAudioOutputDevice } from "@/utils/dailyCallSingleton";

// Helper function to assign a category based on interview name or context
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
  const { 
    shouldActivateCamera, 
    deactivateCamera, 
    isInitiallyRequested, 
    setInitiallyRequested,
    setInterviewRedirectId,
    isAutoActivationEnabled
  } = useCamera();
  
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(null);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [interviewCategory, setInterviewCategory] = useState('general');
  
  // Camera state management
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("unknown");
  const [localSessionId, setLocalSessionId] = useState<string | null>(null);
  const [similarInterviews, setSimilarInterviews] = useState([]);
  
  // Reference to Daily call object and state for DailyProvider
  const [dailyCallObject, setDailyCallObject] = useState<DailyCall | null>(null);

  // Initialize the call object when the component mounts
  useEffect(() => {
    console.log("Component mounted, initializing camera resources");
    
    // Clean up function to run when component unmounts
    return () => {
      console.log("Component unmounted, cleaning up camera resources");
      // We don't destroy the singleton here anymore - it will persist until explicitly destroyed
    };
  }, []);

  // Effect to fetch interview details
  useEffect(() => {
    // Initial fetch of interview details
    if (id) {
      fetchInterviewDetails();
      // Store the current interview ID in the context for potential redirects
      setInterviewRedirectId(id);
    }
  }, [id, setInterviewRedirectId]);
  
  // Auto-activate camera if coming back from login or if auto-activation is enabled
  useEffect(() => {
    if (isAuthenticated && shouldActivateCamera && cameraStatus === "unknown") {
      console.log("Auto-requesting camera access after login redirect or by auto-activation");
      setInitiallyRequested(true);
      requestCameraAccess();
    }
  }, [isAuthenticated, shouldActivateCamera, cameraStatus, isInitiallyRequested]);

  // Request and initialize camera
  const requestCameraAccess = async () => {
    // If camera is already active or being requested, do nothing
    if (cameraStatus === "ready" || cameraStatus === "requesting") return;
    
    try {
      setCameraStatus("requesting");
      console.log("Requesting camera access");
      
      // Get the singleton call object
      const callObject = getDailyCallInstance();
      
      console.log("Starting camera");
      // Start camera with correct properties according to the Daily API types
      await callObject.startCamera({
        // These properties are supported by startCamera()
        audioSource: true,
        videoSource: true
      });
      
      console.log("Camera started successfully");
      setDailyCallObject(callObject);
      setCameraStatus("ready");
      
      // Get local session ID for video preview
      const participants = callObject.participants();
      if (participants && participants.local) {
        console.log("Setting local session ID:", participants.local.session_id);
        setLocalSessionId(participants.local.session_id);
      } else {
        console.error("Could not get local participant", participants);
      }
      
      // Set default audio output - this helps ensure audio will work when the interview starts
      try {
        // Get available output devices
        const devices = await callObject.enumerateDevices();
        const outputDevices = devices.devices.filter(d => d.kind === 'audiooutput');
        
        if (outputDevices.length > 0) {
          // Use the first available output device (usually default)
          const defaultOutputDevice = outputDevices[0].deviceId;
          console.log("Setting default audio output to:", defaultOutputDevice);
          await setAudioOutputDevice(defaultOutputDevice);
        }
      } catch (err) {
        console.error("Error setting default audio output:", err);
      }
      
      toast.success('Kamera und Mikrofon erfolgreich aktiviert');
    } catch (err) {
      console.error("Error requesting camera/audio access:", err);
      setCameraStatus("denied");
      toast.error('Fehler beim Aktivieren der Kamera oder des Mikrofons. Bitte erlaube den Zugriff in deinen Browsereinstellungen.');
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
      // If not logged in, redirect to the login page with the current path as redirect parameter
      // and a flag to activate the camera after login
      const currentPath = `/uebung/${id}`;
      console.log("User not authenticated, redirecting to login with redirect parameter:", currentPath);
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}&activateCamera=true`);
      return;
    }
    
    // Check if camera is ready
    if (cameraStatus !== "ready") {
      toast.error('Kamera- und Mikrofonzugriff sind für das Interview erforderlich');
      await requestCameraAccess();
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
      // Important: We no longer destroy the singleton here, as it's needed by CustomVideoInterview
      // Instead, we just reset our component state
      setCameraStatus("unknown");
      setLocalSessionId(null);

      // Return the conversation URL for the embedded interview component
      return result.url || result.conversation_url;
    } catch (error: any) {
      console.error('Error starting interview:', error);
      
      // More specific error handling
      let errorMessage = 'Fehler beim Starten des Interviews. Bitte versuche es erneut.';
      
      // Check if there's a specific error message from the Tavus API
      if (error.message && typeof error.message === 'string' && error.message.includes('The user is out of conversational credits')) {
        errorMessage = 'Keine Interview-Guthaben mehr verfügbar. Bitte kontaktiere den Support.';
      } else if (error.status === 402) {
        errorMessage = 'Keine Interview-Guthaben mehr verfügbar. Bitte kontaktiere den Support.';
      }
      
      toast.error(errorMessage);
      setIsStarting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/interviews');
  };

  const handleSessionStatusChange = (status: string) => {
    setSessionStatus(status);
    
    // If the session has ended, reset the camera state
    if (status === 'ended') {
      setCameraStatus("unknown");
      setLocalSessionId(null);
      setDailyCallObject(null);
      
      // Notify the camera context that we're no longer needing auto-activation
      deactivateCamera();
    }
  };

  // Clean up resources when navigating away or component unmounts
  useEffect(() => {
    return () => {
      // We don't destroy the singleton on normal unmount - only on explicit cleanup
      console.log("Component unmounting");
      // Reset camera context when leaving this component
      deactivateCamera();
      setInitiallyRequested(false);
    };
  }, [deactivateCamera, setInitiallyRequested]);

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
          title={interview?.conversation_name || "Interview"}
          category={categoryInfo}
        />
        
        {/* Active interview view or two-column layout */}
        {conversationUrl ? (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <CustomVideoInterview 
              conversationUrl={conversationUrl} 
              interviewId={id}
              sessionId={sessionId}
              status={sessionStatus}
              onSessionStatusChange={handleSessionStatusChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left column: Camera preview */}
            <div className="flex flex-col">
              {/* Camera Preview (when camera is active but interview not started) */}
              {dailyCallObject && cameraStatus === "ready" && localSessionId ? (
                <DailyProvider callObject={dailyCallObject}>
                  <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
                    <div className="aspect-video w-full relative">
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
                  
                  {/* Device settings info text instead of selector */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gitflash-primary mb-2">
                      Geräteeinstellungen
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Kamera und Mikrofon sind aktiv. Während des Interviews kannst du jederzeit 
                      die Geräte wechseln oder stumm schalten.
                    </p>
                  </div>
                </DailyProvider>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex items-center justify-center h-full mb-6">
                  <div className="text-center py-10">
                    {cameraStatus === "unknown" ? (
                      <div className="space-y-4">
                        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                          <Camera className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Kameraansicht wird angezeigt, sobald du den Zugriff erlaubst</p>
                      </div>
                    ) : cameraStatus === "denied" ? (
                      <div className="space-y-4">
                        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                          <Camera className="h-10 w-10 text-red-500" />
                        </div>
                        <p className="text-red-500">Kamerazugriff wurde abgelehnt</p>
                      </div>
                    ) : (
                      <div className="animate-pulse space-y-4">
                        <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                          <Camera className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Kamera wird aktiviert...</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column: Interview start section */}
            <div>
              <UebungStartSection 
                isStarting={isStarting}
                onStartInterview={handleStartInterview}
                isAuthenticated={isAuthenticated}
                cameraStatus={cameraStatus}
                onRequestCameraAccess={requestCameraAccess}
              />
            </div>
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
  );
};

export default Uebung;
