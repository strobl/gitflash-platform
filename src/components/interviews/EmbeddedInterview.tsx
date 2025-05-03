
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize, ExternalLink, RefreshCcw, Play, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { updateInterviewSessionStatus } from '@/services/tavusService';

interface EmbeddedInterviewProps {
  conversationUrl: string | null;
  onFullscreenOpen?: () => void;
  interviewId?: string;
  status?: string;
  sessionId?: string;
  onStartInterview?: () => Promise<string>;
  onSessionStatusChange?: (status: string) => void;
}

export function EmbeddedInterview({ 
  conversationUrl, 
  onFullscreenOpen, 
  interviewId, 
  status,
  sessionId,
  onStartInterview,
  onSessionStatusChange
}: EmbeddedInterviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | null>(conversationUrl);
  const [sessionStatus, setSessionStatus] = useState<string | undefined>(status);
  
  const isDraft = !sessionId || status === 'pending' || !conversationUrl || conversationUrl === 'pending';
  const isActive = sessionStatus === 'active';
  const isClosed = sessionStatus === 'ended';
  
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
  
  const handleIframeLoad = () => {
    setIsLoading(false);
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
    // Force iframe refresh by appending a timestamp to the URL
    if (localUrl) {
      const refreshUrl = new URL(localUrl);
      refreshUrl.searchParams.set('refresh', Date.now().toString());
      const iframe = document.getElementById('interview-iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = refreshUrl.toString();
      }
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
      
      toast.success("Interview-Sitzung erfolgreich beendet");
    } catch (error) {
      console.error("Failed to close interview session:", error);
      toast.error("Fehler beim Beenden der Interview-Sitzung");
    } finally {
      setIsClosing(false);
    }
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
              isClosed ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isActive ? 'Aktiv' : isClosed ? 'Beendet' : 'Ausstehend'}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
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
            disabled={!localUrl || isLoading || isDraft || isClosed}
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
      
      {/* Closed interview notification */}
      {isClosed && (
        <div className="absolute inset-0 bg-background/90 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-center max-w-md mx-auto p-6">
            <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interview beendet</h3>
            <p className="text-muted-foreground mb-4">
              Diese Interview-Sitzung wurde abgeschlossen und ist jetzt im schreibgeschützten Modus.
            </p>
            {sessionId && (
              <div className="text-sm text-muted-foreground">
                Sitzungs-ID: {sessionId}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {isLoading && localUrl && !isDraft && !isClosed && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground">Interview wird geladen...</p>
          </div>
        </div>
      )}
      
      {/* Iframe container */}
      <div className="flex-1 bg-background">
        {localUrl && !isDraft && (
          <iframe
            id="interview-iframe"
            src={localUrl}
            className="w-full h-full border-0"
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            onLoad={handleIframeLoad}
          ></iframe>
        )}
      </div>
    </div>
  );
}
