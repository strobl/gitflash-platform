
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize, ExternalLink, RefreshCcw } from 'lucide-react';

interface EmbeddedInterviewProps {
  conversationUrl: string;
  onFullscreenOpen?: () => void;
}

export function EmbeddedInterview({ conversationUrl, onFullscreenOpen }: EmbeddedInterviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Reset loading state when URL changes
    setIsLoading(true);
    
    // Create a timeout to assume loading is complete after 3 seconds
    // This is a fallback since we can't reliably detect when an iframe is fully loaded
    // especially with cross-origin content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [conversationUrl]);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleOpenExternal = () => {
    window.open(conversationUrl, '_blank');
    if (onFullscreenOpen) onFullscreenOpen();
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Force iframe refresh by appending a timestamp to the URL
    const refreshUrl = new URL(conversationUrl);
    refreshUrl.searchParams.set('refresh', Date.now().toString());
    const iframe = document.getElementById('interview-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = refreshUrl.toString();
    }
  };

  return (
    <div className={`relative flex flex-col border rounded-md overflow-hidden ${
      isExpanded ? 'fixed inset-0 z-50 bg-background' : 'h-[600px]'
    }`}>
      {/* Controls header */}
      <div className="bg-muted p-2 flex items-center justify-between border-b">
        <h3 className="font-medium text-sm">Interview Interface</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh} 
            title="Refresh"
            className="h-7 w-7"
          >
            <RefreshCcw size={14} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleOpenExternal} 
            title="Open in new tab"
            className="h-7 w-7"
          >
            <ExternalLink size={14} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleExpand} 
            title={isExpanded ? "Minimize" : "Expand"}
            className="h-7 w-7"
          >
            {isExpanded ? <Minimize size={14} /> : <Expand size={14} />}
          </Button>
        </div>
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground">Interview wird geladen...</p>
          </div>
        </div>
      )}
      
      {/* Iframe container */}
      <div className="flex-1 bg-background">
        <iframe
          id="interview-iframe"
          src={conversationUrl}
          className="w-full h-full border-0"
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
}
