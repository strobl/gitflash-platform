
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getConversation, startConversation } from "@/services/tavusService";
import { useAuth } from "@/context/AuthContext";
import { CameraStatus } from "@/components/uebung/UebungStartSection";
import type { DailyCall } from '@daily-co/daily-js';
import { getDailyCallInstance, setAudioOutputDevice } from "@/utils/dailyCallSingleton";

// Helper function to assign a category based on interview name or context
export const getCategoryForInterview = (interview: any) => {
  if (!interview) return 'general';
  
  const name = interview.conversation_name?.toLowerCase() || '';
  const context = interview.conversation_context?.toLowerCase() || '';
  
  if (name.includes('architekt') || context.includes('architekt')) return 'architecture';
  if (name.includes('recht') || context.includes('recht') || name.includes('anwalt') || context.includes('anwalt')) return 'law';
  if (name.includes('ingenieur') || context.includes('ingenieur') || name.includes('bau') || context.includes('statik')) return 'engineering';
  if (name.includes('projekt') || context.includes('projekt') || name.includes('manage')) return 'management';
  
  return 'general';
};

export const CATEGORIES = {
  architecture: { name: 'Architektur', color: 'blue' },
  law: { name: 'Baurecht', color: 'indigo' },
  engineering: { name: 'Bauingenieurwesen', color: 'orange' },
  management: { name: 'Projektmanagement', color: 'green' },
  general: { name: 'Allgemein', color: 'gray' },
};

export interface InterviewData {
  id?: string;
  conversation_name?: string;
  conversation_context?: string;
  created_at?: string;
  status?: string;
  [key: string]: any;
}

export function useInterviewSession(interviewId: string | undefined) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [interviewCategory, setInterviewCategory] = useState('general');
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("unknown");
  const [localSessionId, setLocalSessionId] = useState<string | null>(null);
  const [similarInterviews, setSimilarInterviews] = useState([]);
  const [dailyCallObject, setDailyCallObject] = useState<DailyCall | null>(null);

  // Fetch interview details
  const fetchInterviewDetails = async () => {
    if (!interviewId) return;
    
    try {
      setIsLoading(true);
      console.log(`useInterviewSession: Fetching interview with ID: ${interviewId}`);
      const data = await getConversation(interviewId);
      console.log("useInterviewSession: Interview data:", data);
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
      console.error('useInterviewSession: Error fetching interview details:', error);
      toast.error('Fehler beim Laden der Interview-Details');
    } finally {
      setIsLoading(false);
    }
  };

  // Request camera access
  const requestCameraAccess = useCallback(async () => {
    // If camera is already active or being requested, do nothing
    if (cameraStatus === "ready" || cameraStatus === "requesting") {
      console.log("useInterviewSession: Camera is already active or being requested, skipping");
      return;
    }
    
    try {
      console.log("useInterviewSession: Requesting camera access");
      setCameraStatus("requesting");
      
      // Get the singleton call object
      const callObject = getDailyCallInstance();
      
      console.log("useInterviewSession: Starting camera");
      // Start camera with correct properties according to the Daily API types
      await callObject.startCamera({
        // These properties are supported by startCamera()
        audioSource: true,
        videoSource: true
      });
      
      console.log("useInterviewSession: Camera started successfully");
      setDailyCallObject(callObject);
      setCameraStatus("ready");
      
      // Get local session ID for video preview
      const participants = callObject.participants();
      if (participants && participants.local) {
        console.log("useInterviewSession: Setting local session ID:", participants.local.session_id);
        setLocalSessionId(participants.local.session_id);
      } else {
        console.error("useInterviewSession: Could not get local participant", participants);
      }
      
      // Set default audio output - this helps ensure audio will work when the interview starts
      try {
        // Get available output devices
        const devices = await callObject.enumerateDevices();
        const outputDevices = devices.devices.filter(d => d.kind === 'audiooutput');
        
        if (outputDevices.length > 0) {
          // Use the first available output device (usually default)
          const defaultOutputDevice = outputDevices[0].deviceId;
          console.log("useInterviewSession: Setting default audio output to:", defaultOutputDevice);
          await setAudioOutputDevice(defaultOutputDevice);
        }
      } catch (err) {
        console.error("useInterviewSession: Error setting default audio output:", err);
      }
      
      toast.success('Kamera und Mikrofon erfolgreich aktiviert');
    } catch (err) {
      console.error("useInterviewSession: Error requesting camera/audio access:", err);
      setCameraStatus("denied");
      toast.error('Fehler beim Aktivieren der Kamera oder des Mikrofons. Bitte erlaube den Zugriff in deinen Browsereinstellungen.');
    }
  }, [cameraStatus]);

  // Start interview handler
  const handleStartInterview = async () => {
    if (!interviewId) return;
    
    // Check if camera is ready
    if (cameraStatus !== "ready") {
      toast.error('Kamera- und Mikrofonzugriff sind für das Interview erforderlich');
      await requestCameraAccess();
      return;
    }
    
    setIsStarting(true);
    
    try {
      console.log("useInterviewSession: Starting interview with ID:", interviewId);
      
      const result = await startConversation(interviewId);
      console.log("useInterviewSession: Interview start result:", result);
      
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
      console.error('useInterviewSession: Error starting interview:', error);
      
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

  const handleSessionStatusChange = (status: string) => {
    setSessionStatus(status);
    
    // If the session has ended, reset the camera state
    if (status === 'ended') {
      setCameraStatus("unknown");
      setLocalSessionId(null);
      setDailyCallObject(null);
    }
  };

  // Navigation helper
  const handleBackClick = () => {
    navigate('/interviews');
  };

  // Load interview data on component mount
  useEffect(() => {
    console.log("useInterviewSession: initializing with interview ID:", interviewId);
    
    if (interviewId) {
      fetchInterviewDetails();
    }
    
    // Clean up resources when unmounting
    return () => {
      console.log("useInterviewSession: cleaning up");
    };
  }, [interviewId]);

  return {
    interview,
    isLoading,
    isStarting,
    sessionStatus,
    sessionId,
    conversationUrl,
    interviewCategory,
    cameraStatus,
    localSessionId,
    similarInterviews,
    dailyCallObject,
    isAuthenticated,
    handleStartInterview,
    requestCameraAccess,
    handleBackClick,
    handleSessionStatusChange,
    CATEGORIES
  };
}
