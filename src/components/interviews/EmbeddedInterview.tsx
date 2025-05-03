import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize, ExternalLink, RefreshCcw, Play, CheckCircle, Clock, Video, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { updateInterviewSessionStatus, getConversationStatus, getConversationRecording } from '@/services/tavusService';
import { Progress } from '@/components/ui/progress';

interface EmbeddedInterviewProps {
  conversationUrl: string | null;
  onFullscreenOpen?: () => void;
  interviewId?: string;
  conversationId?: string;
  status?: string;
  sessionId?: string;
  onStartInterview?: () => Promise<string>;
  onSessionStatusChange?: (status: string) => void;
}

export function EmbeddedInterview({ 
  conversationUrl, 
  onFullscreenOpen, 
  interviewId, 
  conversationId,
  status,
  sessionId,
  onStartInterview,
  onSessionStatusChange
}: EmbeddedInterviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | null>(conversationUrl);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(status);
  const [statusDetails, setStatusDetails] = useState<any>(null);
  const [pollCount, setPollCount] = useState(0);
  const [pollingProgress, setPollingProgress] = useState(0);
  const [isAutoJoinAttempted, setIsAutoJoinAttempted] = useState(false);
  const [autoJoinSuccess, setAutoJoinSuccess] = useState(false);
  const [recordingData, setRecordingData] = useState<any>(null);
  const [isLoadingRecording, setIsLoadingRecording] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pollingIntervalRef = useRef<number | null>(null);
  const pollingTimeoutRef = useRef<number | null>(null);
  
  const isDraft = !sessionId || status === 'pending' || !conversationUrl || conversationUrl === 'pending';
  const isActive = sessionStatus === 'active';
  const isClosed = sessionStatus === 'ended';
  const isInitializing = sessionStatus === 'waiting';
  
  // Status polling interval in milliseconds
  const POLLING_INTERVAL = 10000; // 10 seconds
  const MAX_POLL_COUNT = 30; // Stop polling after 30 attempts (5 minutes)
  
  useEffect(() => {
    setLocalUrl(conversationUrl);
  }, [conversationUrl]);
  
  useEffect(() => {
    setSessionStatus(status);
  }, [status]);
  
  useEffect(() => {
    // Reset loading state when URL changes
    if (localUrl) {
      setIsLoading(true);
      
      // Create a timeout to assume loading is complete after 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [localUrl]);

  // Auto-join functionality
  useEffect(() => {
    if (
      iframeRef.current && 
      !isLoading && 
      localUrl && 
      !isDraft && 
      !isClosed && 
      !isAutoJoinAttempted
    ) {
      // Wait a bit after loading to make sure the iframe content is fully rendered
      const autoJoinTimer = setTimeout(() => {
        attemptAutoJoin();
      }, 1500);
      
      return () => clearTimeout(autoJoinTimer);
    }
  }, [isLoading, localUrl, isDraft, isClosed, isAutoJoinAttempted]);

  // Poll for status updates when active
  useEffect(() => {
    if (sessionId && conversationId && (isActive || isInitializing) && !isClosed) {
      startStatusPolling();
    } else if (isClosed || (!isActive && !isInitializing)) {
      stopStatusPolling();
    }
    
    return () => {
      stopStatusPolling();
    };
  }, [sessionId, conversationId, isActive, isClosed, isInitializing]);
  
  // Automatically check for recording when session is ended
  useEffect(() => {
    if (sessionId && conversationId && isClosed && !recordingData && !isLoadingRecording) {
      // Wait a bit before checking for the recording
      const recordingTimer = setTimeout(() => {
        fetchRecording();
      }, 1000);
      
      return () => clearTimeout(recordingTimer);
    }
  }, [sessionId, conversationId, isClosed, recordingData, isLoadingRecording]);
  
  const attemptAutoJoin = () => {
    if (!iframeRef.current || isAutoJoinAttempted) return;
    
    try {
      setIsAutoJoinAttempted(true);
      console.log('Attempting auto-join...');
      
      // The script to be injected into the iframe to auto-join
      const autoJoinScript = `
        try {
          // Function to find and click the join button
          function findAndClickJoinButton() {
            console.log('Looking for join button...');
            
            // Look for common Daily.co join button selectors
            const possibleSelectors = [
              'button:contains("Join")', 
              'button:contains("Join Meeting")',
              'button.join-button',
              'button[data-testid="join-button"]',
              'button.daily-button--join',
              '[role="button"]:contains("Join")',
              // Additional selectors as needed
            ];
            
            let joinButton = null;
            
            // Try each selector
            for (const selector of possibleSelectors) {
              try {
                const buttons = document.querySelectorAll('button');
                for (let btn of buttons) {
                  if (btn.textContent && btn.textContent.includes('Join')) {
                    joinButton = btn;
                    break;
                  }
                }
                
                if (!joinButton) {
                  // Try finding by attribute if text search failed
                  joinButton = document.querySelector(selector);
                }
                
                if (joinButton) break;
              } catch (e) {
                console.log('Selector error:', e);
              }
            }
            
            if (joinButton) {
              console.log('Join button found, clicking...');
              joinButton.click();
              window.parent.postMessage({ type: 'AUTO_JOIN_SUCCESS' }, '*');
              return true;
            } else {
              console.log('Join button not found');
              window.parent.postMessage({ type: 'AUTO_JOIN_FAILED', reason: 'Button not found' }, '*');
              return false;
            }
          }
          
          // Try immediately
          if (!findAndClickJoinButton()) {
            // If not found, try again in 1 second
            setTimeout(findAndClickJoinButton, 1000);
            
            // And again after 3 seconds
            setTimeout(findAndClickJoinButton, 3000);
          }
        } catch (error) {
          console.error('Auto-join error:', error);
          window.parent.postMessage({ type: 'AUTO_JOIN_ERROR', error: error.message }, '*');
        }
      `;
      
      // Set up message listener for communication from iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'AUTO_JOIN_SUCCESS') {
          console.log('Auto-join successful');
          setAutoJoinSuccess(true);
          toast.success('Interview beigetreten');
        } else if (event.data.type === 'AUTO_JOIN_FAILED') {
          console.log('Auto-join failed:', event.data.reason);
          // Keep silent about failure as it's an automatic process
        } else if (event.data.type === 'AUTO_JOIN_ERROR') {
          console.error('Auto-join error:', event.data.error);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Inject the script
      const iframe = iframeRef.current;
      iframe.onload = () => {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDocument) {
            const scriptElement = iframeDocument.createElement('script');
            scriptElement.textContent = autoJoinScript;
            iframeDocument.body.appendChild(scriptElement);
          }
        } catch (error) {
          console.error('Error injecting auto-join script:', error);
        }
      };
      
      // If iframe is already loaded, inject the script now
      if (iframe.contentDocument || iframe.contentWindow?.document) {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDocument) {
            const scriptElement = iframeDocument.createElement('script');
            scriptElement.textContent = autoJoinScript;
            iframeDocument.body.appendChild(scriptElement);
          }
        } catch (error) {
          console.error('Error injecting auto-join script (already loaded):', error);
        }
      }
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    } catch (error) {
      console.error('Error in attemptAutoJoin:', error);
      setIsAutoJoinAttempted(true);
    }
  };
  
  const startStatusPolling = () => {
    if (isPolling || !sessionId || !conversationId) return;
    
    setIsPolling(true);
    setPollCount(0);
    console.log('Starting status polling for session:', sessionId);
    
    // Immediately fetch status once
    fetchConversationStatus();
    
    // Set up interval for polling
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    pollingIntervalRef.current = setInterval(() => {
      setPollingProgress(0);
      fetchConversationStatus();
      setPollCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= MAX_POLL_COUNT) {
          stopStatusPolling();
        }
        return newCount;
      });
    }, POLLING_INTERVAL) as unknown as number;
    
    // Progress animation
    if (pollingTimeoutRef.current) clearInterval(pollingTimeoutRef.current);
    pollingTimeoutRef.current = setInterval(() => {
      setPollingProgress(prev => {
        const nextProgress = prev + (100 / (POLLING_INTERVAL / 1000));
        return Math.min(nextProgress, 100);
      });
    }, 1000) as unknown as number;
  };
  
  const stopStatusPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    
    if (pollingTimeoutRef.current) {
      clearInterval(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
    
    setIsPolling(false);
    setPollingProgress(0);
  };
  
  const fetchConversationStatus = async () => {
    if (!sessionId || !conversationId) return;
    
    try {
      const statusData = await getConversationStatus(conversationId, sessionId);
      console.log('Status update received:', statusData);
      
      setStatusDetails(statusData);
      
      // Update local status if changed
      if (statusData.status !== sessionStatus) {
        setSessionStatus(statusData.status);
        
        // Notify parent component about status change
        if (onSessionStatusChange) {
          onSessionStatusChange(statusData.status);
        }
        
        // Automatically stop polling when status is 'ended'
        if (statusData.status === 'ended') {
          stopStatusPolling();
          toast.info('Die Interview-Sitzung wurde beendet');
        }
      }
    } catch (error) {
      console.error('Failed to fetch conversation status:', error);
      // Don't show toast on every poll error to avoid spamming
      if (pollCount === 0 || pollCount % 5 === 0) {
        toast.error('Status-Update fehlgeschlagen');
      }
    }
  };
  
  const fetchRecording = async () => {
    if (!sessionId || !conversationId) return;
    
    try {
      setIsLoadingRecording(true);
      console.log(`Fetching recording for conversation: ${conversationId}, session: ${sessionId}`);
      
      const recordingData = await getConversationRecording(conversationId, sessionId);
      setRecordingData(recordingData);
      
      console.log('Recording data:', recordingData);
      
    } catch (error) {
      console.error('Error fetching recording:', error);
      // Don't show toast to avoid spamming the user
    } finally {
      setIsLoadingRecording(false);
    }
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // If this is the first load and auto-join hasn't been attempted yet, try it
    if (!isAutoJoinAttempted && !isDraft && !isClosed) {
      const timer = setTimeout(() => {
        attemptAutoJoin();
      }, 500);
      return () => clearTimeout(timer);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleOpenExternal = () => {
    if (localUrl) {
      window.open(localUrl, '_blank');
      if (onFullscreenOpen) onFullscreenOpen();
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setIsAutoJoinAttempted(false);
    setAutoJoinSuccess(false);
    
    // Force iframe refresh by appending a timestamp to the URL
    if (localUrl) {
      const refreshUrl = new URL(localUrl);
      refreshUrl.searchParams.set('refresh', Date.now().toString());
      if (iframeRef.current) {
        iframeRef.current.src = refreshUrl.toString();
      }
    }
    
    // Also refresh status if we have a session ID
    if (sessionId && conversationId) {
      fetchConversationStatus();
    }
    
    // Also refresh recording if session is closed
    if (sessionId && conversationId && isClosed) {
      fetchRecording();
    }
  };

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
      setIsAutoJoinAttempted(false);
      
      // Start polling for status updates
      startStatusPolling();
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast.error("Fehler beim Starten des Interviews");
    } finally {
      setIsStarting(false);
    }
  };
  
  const handleCloseSession = async () => {
    if (!sessionId) {
      toast.error("Keine aktive Sitzung vorhanden");
      return;
    }
    
    try {
      setIsClosing(true);
      await updateInterviewSessionStatus(sessionId, 'ended');
      setSessionStatus('ended');
      
      if (onSessionStatusChange) {
        onSessionStatusChange('ended');
      }
      
      stopStatusPolling();
      toast.success("Interview-Sitzung erfolgreich beendet");
    } catch (error) {
      console.error("Failed to close interview session:", error);
      toast.error("Fehler beim Beenden der Interview-Sitzung");
    } finally {
      setIsClosing(false);
    }
  };

  const renderRecordingSection = () => {
    if (!sessionId || !conversationId || !isClosed) return null;
    
    if (isLoadingRecording) {
      return (
        <div className="p-4 text-center">
          <div className="animate-spin h-6 w-6 border-2 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Aufnahme wird geprüft...</p>
        </div>
      );
    }
    
    if (recordingData && recordingData.status === 'ready' && recordingData.recording_url) {
      return (
        <div className="py-4">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Interview-Aufnahme
          </h3>
          <div className="relative aspect-video w-full bg-black rounded-md overflow-hidden">
            <video
              src={recordingData.recording_url}
              controls
              className="w-full h-full"
              poster="/placeholder.svg"
            >
              Ihr Browser unterstützt keine Video-Wiedergabe.
            </video>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-sm text-muted-foreground">
              Die Aufnahme steht zum Ansehen bereit.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(recordingData.recording_url, '_blank')}
            >
              In neuem Tab öffnen
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      );
    }
    
    if (recordingData && recordingData.status === 'processing') {
      return (
        <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800">
          <h3 className="text-md font-medium mb-1 flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Aufnahme wird verarbeitet
          </h3>
          <p className="text-sm">
            Die Aufnahme des Interviews wird noch verarbeitet. 
            Bitte versuchen Sie es später erneut.
          </p>
          <div className="mt-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchRecording}
              className="bg-white"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Status aktualisieren
            </Button>
          </div>
        </div>
      );
    }
    
    if (recordingData && (recordingData.status === 'error' || recordingData.status === 'failed')) {
      return (
        <div className="p-4 border rounded-md bg-red-50 text-red-800">
          <h3 className="text-md font-medium mb-1">Aufnahme nicht verfügbar</h3>
          <p className="text-sm">
            Leider konnte die Aufnahme des Interviews nicht abgerufen werden. 
            Dies kann verschiedene Ursachen haben:
          </p>
          <ul className="text-sm list-disc pl-5 mt-2 mb-3">
            <li>Die Aufnahme wurde nicht erstellt, da das Interview zu kurz war</li>
            <li>Ein technischer Fehler ist aufgetreten</li>
            <li>Die Verbindung zur Tavus-API ist unterbrochen</li>
          </ul>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchRecording}
            className="bg-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Erneut versuchen
          </Button>
        </div>
      );
    }
    
    return (
      <div className="p-4 border border-dashed rounded-md text-center">
        <Button 
          variant="outline" 
          onClick={fetchRecording}
          className="flex items-center gap-2"
        >
          <Video className="h-4 w-4" />
          Aufnahme abrufen
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Die Aufnahme steht möglicherweise erst einige Minuten nach dem Ende des Interviews zur Verfügung.
        </p>
      </div>
    );
  };

  return (
    <div className={`relative flex flex-col border rounded-md overflow-hidden ${
      isExpanded ? 'fixed inset-0 z-50 bg-background' : 'h-[600px]'
    }`}>
      {/* Controls header */}
      <div className="bg-muted p-2 flex items-center justify-between border-b">
        <div className="flex items-center">
          <h3 className="font-medium text-sm">Interview Interface</h3>
          {sessionStatus && (
            <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              isActive ? 'bg-green-100 text-green-800' : 
              isInitializing ? 'bg-yellow-100 text-yellow-800' :
              isClosed ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isActive ? 'Aktiv' : 
               isInitializing ? 'Initialisiert' :
               isClosed ? 'Beendet' : 'Ausstehend'}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          {isPolling && (
            <div className="flex items-center mr-2">
              <Clock size={14} className="animate-pulse text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">Status wird aktualisiert</span>
            </div>
          )}
          {isActive && !isClosed && sessionId && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleCloseSession} 
              title="Interview beenden"
              className="h-7 w-7"
              disabled={isClosing || isDraft}
            >
              <CheckCircle size={14} />
            </Button>
          )}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh} 
            title="Refresh"
            className="h-7 w-7"
            disabled={!localUrl || isLoading || isDraft || (isClosed && isLoadingRecording)}
          >
            <RefreshCcw size={14} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleOpenExternal} 
            title="Open in new tab"
            className="h-7 w-7"
            disabled={!localUrl || isDraft}
          >
            <ExternalLink size={14} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleExpand} 
            title={isExpanded ? "Minimize" : "Expand"}
            className="h-7 w-7"
            disabled={!localUrl || isDraft}
          >
            {isExpanded ? <Minimize size={14} /> : <Expand size={14} />}
          </Button>
        </div>
      </div>
      
      {/* Status polling progress bar */}
      {isPolling && (
        <div className="px-3 py-1 bg-background">
          <Progress value={pollingProgress} className="h-1" />
        </div>
      )}
      
      {/* Status details - shown when available */}
      {statusDetails && !isDraft && (
        <div className="bg-muted/30 px-3 py-1 text-xs flex flex-wrap gap-2 border-b">
          {statusDetails.participant_joined_at && (
            <span>Teilnehmer beigetreten: {new Date(statusDetails.participant_joined_at).toLocaleTimeString('de-DE')}</span>
          )}
          {statusDetails.duration !== null && (
            <span>Dauer: {statusDetails.duration}s</span>
          )}
          {statusDetails.tavus_status && (
            <span>Tavus Status: {statusDetails.tavus_status}</span>
          )}
        </div>
      )}
      
      {/* Information banners - non-blocking */}
      {isInitializing && !isDraft && !isClosed && (
        <div className="bg-yellow-50 border-b border-yellow-100 py-1.5 px-3 text-sm text-yellow-800 flex items-center justify-center">
          <Clock className="h-4 w-4 mr-2" />
          KI-Interview wird initialisiert... Bitte haben Sie einen Moment Geduld.
        </div>
      )}
      
      {isAutoJoinAttempted && !autoJoinSuccess && !isClosed && !isDraft && (
        <div className="bg-blue-50 border-b border-blue-100 py-1.5 px-3 text-sm text-blue-800 flex items-center justify-center">
          Automatischer Beitritt wird versucht...
        </div>
      )}
      
      {/* Start interview UI */}
      {isDraft && onStartInterview && (
        <div className="absolute inset-0 bg-background/95 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-center max-w-md mx-auto p-6">
            <div className="bg-gitflash-primary/20 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-gitflash-primary ml-1" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interview bereit</h3>
            <p className="text-muted-foreground mb-6">
              Klicken Sie auf "Interview starten", um mit dem KI-Interview zu beginnen.
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
                  Interview starten
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      {/* Closed interview notification (minimized banner) */}
      {isClosed && (
        <div className="bg-gray-50 border-b border-gray-100 py-2 px-3 text-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
            <span>Dieses Interview wurde am {statusDetails?.ended_at ? new Date(statusDetails.ended_at).toLocaleTimeString('de-DE') : '---'} beendet.</span>
          </div>
          {localUrl && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleOpenExternal}
            >
              Original-Interview ansehen
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      
      {/* Loading overlay - thinner and non-blocking */}
      {isLoading && localUrl && !isDraft && !isClosed && (
        <div className="absolute top-0 left-0 right-0 bg-background/80 py-3 flex items-center justify-center z-10 border-b">
          <div className="animate-spin h-4 w-4 border-2 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mr-2"></div>
          <p className="text-sm">Interview wird geladen...</p>
        </div>
      )}
      
      <div className="flex flex-1 flex-col">
        {/* Iframe container */}
        <div className={`flex-1 bg-background ${isClosed ? 'max-h-[400px]' : 'h-full'}`}>
          {localUrl && !isDraft && (
            <iframe
              ref={iframeRef}
              id="interview-iframe"
              src={localUrl}
              className="w-full h-full border-0"
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              onLoad={handleIframeLoad}
            ></iframe>
          )}
        </div>
        
        {/* Recording section */}
        {isClosed && (
          <div className="border-t p-4">
            {renderRecordingSection()}
          </div>
        )}
      </div>
    </div>
  );
}
