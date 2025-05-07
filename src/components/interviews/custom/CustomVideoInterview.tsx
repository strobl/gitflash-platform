
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  DailyProvider,
  useDaily,
  useDevices,
  useDailyEvent,
  useParticipantIds,
  useLocalSessionId,
  DailyVideo
} from '@daily-co/daily-react';
import DailyIframe from '@daily-co/daily-js';
import type { DailyCall } from '@daily-co/daily-js';
import { Button } from '@/components/ui/button';
import { updateInterviewSessionStatus } from '@/services/tavusService';
import { 
  Check, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  RefreshCcw,
  Settings,
  ChevronDown,
  Camera
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CustomVideoInterviewProps {
  conversationUrl: string | null;
  interviewId?: string;
  conversationId?: string;
  status?: string;
  sessionId?: string;
  onStartInterview?: () => Promise<string>;
  onSessionStatusChange?: (status: string) => void;
}

// Create a singleton instance of the DailyCall object
// This ensures we only have one instance throughout the application
let dailyCallSingleton: DailyCall | null = null;

// Function to get or create the singleton Daily call object
const getDailyCallInstance = (): DailyCall => {
  if (!dailyCallSingleton) {
    dailyCallSingleton = DailyIframe.createCallObject();
    
    // Add cleanup for when the app unmounts
    window.addEventListener('beforeunload', () => {
      if (dailyCallSingleton) {
        dailyCallSingleton.destroy().catch(console.error);
        dailyCallSingleton = null;
      }
    });
  }
  
  return dailyCallSingleton;
};

// Main wrapper component that creates the Daily call object and provides it via context
export function CustomVideoInterview({ 
  conversationUrl, 
  interviewId, 
  conversationId,
  status,
  sessionId,
  onStartInterview,
  onSessionStatusChange
}: CustomVideoInterviewProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | null>(conversationUrl);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(status);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  
  // Initialize the Daily call object when the component mounts
  useEffect(() => {
    if (!callObject) {
      // Use the singleton pattern to get the Daily call instance
      const daily = getDailyCallInstance();
      setCallObject(daily);
    }
    
    // No need for cleanup here as we're managing the singleton elsewhere
    return () => {
      // Only leave the call if we're in one, but don't destroy the object
      if (callObject && localUrl) {
        callObject.leave().catch(console.error);
      }
    };
  }, [callObject, localUrl]);
  
  // Update the local URL when the prop changes
  useEffect(() => {
    setLocalUrl(conversationUrl);
  }, [conversationUrl]);
  
  // Update the session status when the prop changes
  useEffect(() => {
    setSessionStatus(status);
  }, [status]);
  
  const isDraft = !sessionId || status === 'pending' || !conversationUrl || conversationUrl === 'pending';
  const isActive = sessionStatus === 'active';
  const isClosed = sessionStatus === 'ended';
  
  const handleStartInterview = async () => {
    if (!onStartInterview) {
      toast.error("Start-Interview-Funktion nicht verfügbar");
      return;
    }
    
    try {
      setIsStarting(true);
      const newUrl = await onStartInterview();
      setLocalUrl(newUrl);
      setSessionStatus('active');
      toast.success("Interview erfolgreich gestartet!");
      
      // Instead of recreating the call object, just join with the new URL
      if (callObject) {
        // Make sure we're not in a call first
        if (callObject.participants().local) {
          try {
            await callObject.leave();
          } catch (error) {
            console.error("Failed to leave previous call:", error);
          }
        }
        
        // Fix: We can't directly modify properties.url, we need to leave and rejoin
        // We'll store the URL in our state and use it when joining
      }
      
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast.error("Fehler beim Starten des Interviews");
    } finally {
      setIsStarting(false);
    }
  };
  
  // Render the draft state (before starting interview)
  if (isDraft) {
    return (
      <div className="rounded-md border overflow-hidden flex flex-col">
        <div className="p-4 bg-muted/20 border-b">
          <h3 className="font-medium">Interview starten</h3>
        </div>
        
        <div className="flex-1 bg-black/5 flex items-center justify-center p-6 min-h-[500px]">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-gitflash-primary/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Camera className="h-8 w-8 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bereit für das Interview?</h3>
            <p className="text-muted-foreground mb-6">
              Klicken Sie auf "Interview starten", um mit dem KI-Interview zu beginnen. Stellen Sie sicher, dass Ihre Kamera und Ihr Mikrofon funktionieren.
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
                  <Video className="mr-2 h-4 w-4" />
                  Interview starten
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // If the call object is ready and the URL is available, render the video call
  if (callObject && localUrl) {
    return (
      <DailyProvider callObject={callObject}>
        <VideoCallUI 
          conversationUrl={localUrl} 
          sessionId={sessionId}
          sessionStatus={sessionStatus}
          isClosed={isClosed}
          onSessionStatusChange={onSessionStatusChange}
        />
      </DailyProvider>
    );
  }
  
  // Loading state
  return (
    <div className="rounded-md border overflow-hidden flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Initialisierung...</p>
      </div>
    </div>
  );
}

// The internal video call UI component that uses Daily hooks
const VideoCallUI = ({ 
  conversationUrl, 
  sessionId,
  sessionStatus,
  isClosed,
  onSessionStatusChange
}: {
  conversationUrl: string;
  sessionId?: string;
  sessionStatus?: string;
  isClosed?: boolean;
  onSessionStatusChange?: (status: string) => void;
}) => {
  const callObject = useDaily();
  const localSessionId = useLocalSessionId();
  const participantIds = useParticipantIds();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  
  // Listen for join-meeting events
  useDailyEvent(
    'joined-meeting',
    useCallback(() => {
      console.log('Successfully joined the meeting');
      setIsJoined(true);
      setIsJoining(false);
    }, [])
  );
  
  // Listen for errors
  useDailyEvent(
    'error',
    useCallback((ev) => {
      console.error('Daily error:', ev);
      toast.error(`Fehler: ${ev.errorMsg}`);
      setIsJoining(false);
    }, [])
  );
  
  // Handle camera/mic permission errors
  useDailyEvent(
    'camera-error',
    useCallback((ev: any) => {
      console.error('Camera error:', ev);
      if (ev.errorMsg && typeof ev.errorMsg === 'string' && ev.errorMsg.includes('Permission denied')) {
        setHasCameraPermission(false);
        toast.error('Kamera-Zugriff verweigert. Bitte erlauben Sie den Zugriff in Ihren Browsereinstellungen.');
      } else {
        toast.error(`Kamera-Fehler: ${ev.errorMsg}`);
      }
    }, [])
  );
  
  // Track local participant's audio and video state
  useDailyEvent(
    'local-audio-changed' as any,
    useCallback((ev: any) => {
      setIsAudioMuted(!ev?.on);
    }, [])
  );
  
  useDailyEvent(
    'local-video-changed' as any,
    useCallback((ev: any) => {
      setIsVideoMuted(!ev?.on);
    }, [])
  );
  
  // Effect to check device permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const cameraPermission = await navigator.permissions.query({ name: 'camera' as any });
        const micPermission = await navigator.permissions.query({ name: 'microphone' as any });
        
        setHasCameraPermission(cameraPermission.state === 'granted');
        setHasMicPermission(micPermission.state === 'granted');
        
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    };
    
    checkPermissions();
  }, []);
  
  // Effect to auto-join the call when the component mounts
  useEffect(() => {
    if (callObject && !isJoined && !isJoining && !isClosed) {
      const joinCall = async () => {
        try {
          setIsJoining(true);
          
          // Start camera first
          await callObject.startCamera();
          
          // Then join the meeting
          await callObject.join({ url: conversationUrl });
          
        } catch (error) {
          console.error('Error joining call:', error);
          setIsJoining(false);
          toast.error('Fehler beim Beitreten zum Interview');
        }
      };
      
      joinCall();
    }
    
    return () => {
      if (callObject && isJoined) {
        callObject.leave().catch(console.error);
      }
    };
  }, [callObject, isJoined, isJoining, conversationUrl, isClosed]);
  
  const handleEndCall = async () => {
    if (!callObject || !sessionId) return;
    
    try {
      setIsClosing(true);
      
      // First leave the Daily call
      await callObject.leave();
      setIsJoined(false);
      
      // Then update the session status in our backend
      await updateInterviewSessionStatus(sessionId, 'ended');
      
      if (onSessionStatusChange) {
        onSessionStatusChange('ended');
      }
      
      toast.success('Interview erfolgreich beendet');
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Fehler beim Beenden des Interviews');
    } finally {
      setIsClosing(false);
    }
  };
  
  const toggleAudio = () => {
    if (!callObject) return;
    callObject.setLocalAudio(!isAudioMuted);
  };
  
  const toggleVideo = () => {
    if (!callObject) return;
    callObject.setLocalVideo(!isVideoMuted);
  };
  
  // If the call is closed/ended, show the ended state
  if (isClosed) {
    return (
      <div className="rounded-md border overflow-hidden flex flex-col">
        <div className="p-4 bg-muted/20 border-b flex items-center">
          <Check className="text-green-500 mr-2 h-4 w-4" />
          <h3 className="font-medium">Interview beendet</h3>
        </div>
        
        <div className="p-4 text-center">
          <p className="mb-4">Dieses Interview wurde erfolgreich beendet. Die Aufnahme wird verarbeitet und steht in Kürze zur Verfügung.</p>
          
          <div className="animate-pulse text-muted-foreground flex items-center justify-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            <span>Aufnahme wird verarbeitet...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-2 bg-muted/20 border-b flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="font-medium text-sm">GitFlash KI-Interview</h3>
          <div className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            {isJoined ? 'Aktiv' : 'Verbinde...'}
          </div>
        </div>
        <DeviceSettings />
      </div>
      
      {/* Main video area */}
      <div className="bg-black flex flex-col relative">
        {/* Remote video (AI) */}
        <div className="aspect-video w-full bg-black">
          {remoteParticipantIds.length > 0 ? (
            remoteParticipantIds.map((id) => (
              <DailyVideo 
                key={id} 
                sessionId={id} 
                mirror={false}
                automirror={false}
                fit="cover"
                type="video"
                className="h-full w-full object-cover"
              />
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white/70">
              <div className="text-center">
                <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-2"></div>
                <p>KI-Interviewer wird verbunden...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Local video (user) - small overlay */}
        {localSessionId && (
          <div className="absolute bottom-4 right-4 w-32 h-24 md:w-40 md:h-32 bg-black rounded-md overflow-hidden border-2 border-white/40 shadow-lg">
            <DailyVideo 
              sessionId={localSessionId} 
              mirror={true}
              automirror={true}
              fit="cover"
              type="video"
              className="h-full w-full object-cover"
            />
            
            {/* Mute indicators on the local video */}
            <div className="absolute bottom-1 right-1 flex space-x-1">
              {isAudioMuted && (
                <div className="bg-red-500 rounded-full p-1">
                  <MicOff className="h-3 w-3 text-white" />
                </div>
              )}
              {isVideoMuted && (
                <div className="bg-red-500 rounded-full p-1">
                  <VideoOff className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="p-4 bg-white flex items-center justify-between">
        <div className="flex space-x-2">
          <Button 
            variant={isAudioMuted ? "destructive" : "outline"} 
            size="icon"
            onClick={toggleAudio}
            disabled={!isJoined}
          >
            {isAudioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button 
            variant={isVideoMuted ? "destructive" : "outline"} 
            size="icon"
            onClick={toggleVideo}
            disabled={!isJoined}
          >
            {isVideoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          className="gap-2"
          onClick={handleEndCall}
          disabled={!isJoined || isClosing}
        >
          {isClosing ? (
            <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />
          ) : (
            <Phone className="h-4 w-4 rotate-135" />
          )}
          Interview beenden
        </Button>
      </div>
    </div>
  );
};

// Device settings component (dropdown to select camera/mic)
const DeviceSettings = () => {
  const deviceHook = useDevices();
  const { cameras, microphones, speakers, setCamera, setMicrophone, setSpeaker } = deviceHook;
  
  // Extrahieren der deviceIds aus dem Hook-Ergebnis
  const selectedCameraId = cameras.find(c => c.selected)?.device.deviceId || '';
  const selectedMicrophoneId = microphones.find(m => m.selected)?.device.deviceId || '';
  const selectedSpeakerId = speakers.find(s => s.selected)?.device.deviceId || '';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Settings className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Geräteeinstellungen</SheetTitle>
          <SheetDescription>
            Wählen Sie Ihre Kamera, Mikrofon und Lautsprecher
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-4 mt-4">
          {/* Camera select */}
          <div className="space-y-2">
            <label htmlFor="camera" className="text-sm font-medium">
              Kamera
            </label>
            <Select 
              value={selectedCameraId}
              onValueChange={setCamera}
            >
              <SelectTrigger id="camera">
                <SelectValue placeholder="Kamera wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Verfügbare Kameras</SelectLabel>
                  {cameras.map((camera) => (
                    <SelectItem 
                      key={camera.device.deviceId} 
                      value={camera.device.deviceId}
                    >
                      {camera.device.label || `Kamera ${cameras.indexOf(camera) + 1}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Microphone select */}
          <div className="space-y-2">
            <label htmlFor="microphone" className="text-sm font-medium">
              Mikrofon
            </label>
            <Select 
              value={selectedMicrophoneId}
              onValueChange={setMicrophone}
            >
              <SelectTrigger id="microphone">
                <SelectValue placeholder="Mikrofon wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Verfügbare Mikrofone</SelectLabel>
                  {microphones.map((mic) => (
                    <SelectItem 
                      key={mic.device.deviceId} 
                      value={mic.device.deviceId}
                    >
                      {mic.device.label || `Mikrofon ${microphones.indexOf(mic) + 1}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {/* Speaker select */}
          <div className="space-y-2">
            <label htmlFor="speaker" className="text-sm font-medium">
              Lautsprecher
            </label>
            <Select 
              value={selectedSpeakerId}
              onValueChange={setSpeaker}
            >
              <SelectTrigger id="speaker">
                <SelectValue placeholder="Lautsprecher wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Verfügbare Lautsprecher</SelectLabel>
                  {speakers.map((speaker) => (
                    <SelectItem 
                      key={speaker.device.deviceId} 
                      value={speaker.device.deviceId}
                    >
                      {speaker.device.label || `Lautsprecher ${speakers.indexOf(speaker) + 1}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomVideoInterview;
