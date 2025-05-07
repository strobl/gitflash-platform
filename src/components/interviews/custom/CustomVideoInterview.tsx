import { useState, useEffect, useCallback } from 'react';
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
import type { DailyCall, DailyEventObject } from '@daily-co/daily-js';
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
  Camera,
  Volume2,
  VolumeX
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
import { getDailyCallInstance, setAudioOutputDevice, testAudioOutput } from '@/utils/dailyCallSingleton';

interface CustomVideoInterviewProps {
  conversationUrl: string | null;
  interviewId?: string;
  conversationId?: string;
  status?: string;
  sessionId?: string;
  onStartInterview?: () => Promise<string>;
  onSessionStatusChange?: (status: string) => void;
}

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
      // Use the shared singleton pattern to get the Daily call instance
      const daily = getDailyCallInstance();
      setCallObject(daily);

      // Log device info for debugging
      daily.enumerateDevices()
        .then(devices => {
          console.log("Available devices:", devices);
        })
        .catch(error => console.error("Error enumerating devices:", error));
    }
    
    return () => {
      // Only leave the call if we're in one, but don't destroy the object
      if (callObject && localUrl) {
        console.log("Leaving call but keeping singleton alive");
        try {
          callObject.leave();
        } catch (error) {
          console.error("Error leaving call:", error);
        }
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
  const [hasAudioOutput, setHasAudioOutput] = useState<boolean>(true);
  const [isAudioOutputTesting, setIsAudioOutputTesting] = useState(false);
  
  // Listen for join-meeting events
  useDailyEvent(
    'joined-meeting',
    useCallback(() => {
      console.log('Successfully joined the meeting');
      setIsJoined(true);
      setIsJoining(false);
      
      // Check initial audio/video state
      if (callObject) {
        setIsAudioMuted(!callObject.localAudio());
        setIsVideoMuted(!callObject.localVideo());
        
        // Try to ensure audio is unmuted
        if (!callObject.localAudio()) {
          console.log("Trying to enable audio on join...");
          try {
            callObject.setLocalAudio(true);
          } catch (e) {
            console.error("Failed to enable audio:", e);
          }
        }
      }
    }, [callObject])
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
  
  // Track local participant's audio and video state using standard event names
  useDailyEvent(
    'track-started',
    useCallback((ev: DailyEventObject) => {
      if (ev.track.kind === 'audio') {
        console.log("Audio track started");
        setIsAudioMuted(false);
      } else if (ev.track.kind === 'video') {
        console.log("Video track started");
        setIsVideoMuted(false);
      }
    }, [])
  );
  
  useDailyEvent(
    'track-stopped',
    useCallback((ev: DailyEventObject) => {
      if (ev.track.kind === 'audio') {
        console.log("Audio track stopped");
        setIsAudioMuted(true);
      } else if (ev.track.kind === 'video') {
        console.log("Video track stopped");
        setIsVideoMuted(true);
      }
    }, [])
  );
  
  // New event for audio output changes
  useDailyEvent(
    'output-devices-updated',
    useCallback((ev: any) => {
      console.log("Output devices updated:", ev);
      if (ev && ev.outputDeviceId) {
        setHasAudioOutput(true);
        toast.success("Audioausgabegerät erfolgreich geändert");
      }
    }, [])
  );
  
  // This event is triggered when the remote participant's audio state changes
  useDailyEvent(
    'participant-updated',
    useCallback((ev: any) => {
      if (ev?.participant?.user_id !== 'local') {
        console.log("Remote participant update:", 
          ev.participant.session_id, 
          "Audio:", ev.participant.audio, 
          "Video:", ev.participant.video);
      }
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
          
          // Start camera first with explicit audio enabled using correct properties
          await callObject.startCamera({
            // Use the supported properties for startCamera
            audioSource: true,
            videoSource: true
          });
          
          console.log("Camera/mic started, joining with URL:", conversationUrl);
          
          // Then join the meeting
          await callObject.join({ 
            url: conversationUrl,
            // Don't specify audio/video here as they're already started
          });
          
          // Add a short delay and then check audio status
          setTimeout(() => {
            if (callObject && !callObject.localAudio()) {
              console.log("Audio still not enabled after join, trying again");
              try {
                callObject.setLocalAudio(true);
              } catch (e) {
                console.error("Failed to enable audio on retry:", e);
              }
            }
          }, 1000);
          
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
        try {
          callObject.leave();
        } catch (error) {
          console.error("Error leaving call:", error);
        }
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
  
  const toggleAudio = async () => {
    if (!callObject) return;
    
    try {
      const newState = !isAudioMuted;
      console.log(`Setting audio to: ${newState}`);
      await callObject.setLocalAudio(newState);
      setIsAudioMuted(!newState);
      
      if (newState) {
        toast.success("Mikrofon aktiviert");
      } else {
        toast.success("Mikrofon deaktiviert");
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
      toast.error("Fehler beim Ändern des Audiostatus");
    }
  };
  
  const toggleVideo = async () => {
    if (!callObject) return;
    
    try {
      const newState = !isVideoMuted;
      console.log(`Setting video to: ${newState}`);
      await callObject.setLocalVideo(newState);
      setIsVideoMuted(!newState);
      
      if (newState) {
        toast.success("Kamera aktiviert");
      } else {
        toast.success("Kamera deaktiviert");
      }
    } catch (error) {
      console.error("Error toggling video:", error);
      toast.error("Fehler beim Ändern des Videostatus");
    }
  };
  
  // Handle audio output testing
  const handleTestAudioOutput = async () => {
    setIsAudioOutputTesting(true);
    try {
      await testAudioOutput();
      toast.success("Audiotest wird abgespielt");
    } catch (error) {
      console.error("Error testing audio output:", error);
      toast.error("Fehler beim Testen der Audioausgabe");
      setHasAudioOutput(false);
    } finally {
      setTimeout(() => setIsAudioOutputTesting(false), 1500);
    }
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
        <DeviceSettings onTestAudioOutput={handleTestAudioOutput} isAudioOutputTesting={isAudioOutputTesting} />
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
        
        {/* Audio issue indicator */}
        {!hasAudioOutput && isJoined && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md flex items-center">
            <VolumeX className="h-4 w-4 mr-1" />
            <span className="text-sm">Kein Ton? Klicken Sie auf Einstellungen</span>
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
          <Button 
            variant="outline"
            size="icon"
            onClick={handleTestAudioOutput}
            disabled={isAudioOutputTesting || !isJoined}
            title="Audiotest abspielen"
          >
            {isAudioOutputTesting ? (
              <div className="h-4 w-4 animate-pulse bg-blue-500 rounded-full"></div>
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
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
const DeviceSettings = ({ onTestAudioOutput, isAudioOutputTesting }: { 
  onTestAudioOutput: () => Promise<void>;
  isAudioOutputTesting: boolean;
}) => {
  const deviceHook = useDevices();
  const { cameras, microphones, speakers, setCamera, setMicrophone, setSpeaker } = deviceHook;
  const daily = useDaily();
  
  // Extract selected deviceIds from the hook result
  const selectedCameraId = cameras.find(c => c.selected)?.device.deviceId || '';
  const selectedMicrophoneId = microphones.find(m => m.selected)?.device.deviceId || '';
  const selectedSpeakerId = speakers.find(s => s.selected)?.device.deviceId || '';
  
  // Enhanced device change handlers with better error handling
  const handleCameraChange = async (deviceId: string) => {
    try {
      console.log("Changing camera to:", deviceId);
      await setCamera(deviceId);
      toast.success('Kamera erfolgreich geändert');
    } catch (err) {
      console.error("Error changing camera:", err);
      toast.error('Fehler beim Ändern der Kamera');
    }
  };
  
  const handleMicChange = async (deviceId: string) => {
    try {
      console.log("Changing microphone to:", deviceId);
      await setMicrophone(deviceId);
      
      // Force unmute after mic change
      if (daily) {
        try {
          daily.setLocalAudio(true);
        } catch (err) {
          console.error("Error unmuting after mic change:", err);
        }
      }
      
      toast.success('Mikrofon erfolgreich geändert');
    } catch (err) {
      console.error("Error changing microphone:", err);
      toast.error('Fehler beim Ändern des Mikrofons');
    }
  };
  
  const handleSpeakerChange = async (deviceId: string) => {
    try {
      console.log("Changing speaker to:", deviceId);
      // First update Daily.co's internal state
      await setSpeaker(deviceId);
      
      // Also use our utility to ensure the output device is set
      await setAudioOutputDevice(deviceId);
      
      toast.success('Lautsprecher erfolgreich geändert');
    } catch (err) {
      console.error("Error changing speaker:", err);
      toast.error('Fehler beim Ändern des Lautsprechers');
    }
  };

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
              onValueChange={handleCameraChange}
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
              onValueChange={handleMicChange}
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
              onValueChange={handleSpeakerChange}
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
            
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={onTestAudioOutput}
                disabled={isAudioOutputTesting}
              >
                {isAudioOutputTesting ? (
                  <div className="h-3 w-3 animate-pulse bg-blue-500 rounded-full"></div>
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
                Audiotest abspielen
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm mt-4">
            <p className="font-medium mb-1">Tipps bei Audioproblemen:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Stellen Sie sicher, dass Ihr Mikrofon nicht stumm geschaltet ist</li>
              <li>Prüfen Sie die Lautstärkeeinstellungen Ihres Browsers</li>
              <li>Erlauben Sie der Seite den Zugriff auf Ihr Mikrofon und Ihre Lautsprecher</li>
              <li>Versuchen Sie, einen anderen Lautsprecher auszuwählen</li>
              <li>Drücken Sie auf "Audiotest abspielen" - wenn Sie einen Ton hören, ist die Ausgabe konfiguriert</li>
              <li>Starten Sie Ihren Browser neu, falls Probleme bestehen bleiben</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomVideoInterview;
