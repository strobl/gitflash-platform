
import { useState, useEffect, useRef } from 'react';
import { getConversationTranscript } from '@/services/tavusService';
import { AlertCircle, Search, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TranscriptViewerProps {
  conversationId: string;
  sessionId: string;
}

export function TranscriptViewer({ conversationId, sessionId }: TranscriptViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [formattedTranscript, setFormattedTranscript] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function loadTranscript() {
      if (!conversationId || !sessionId) {
        setError('Fehlende Informationen zum Transkript');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const transcriptData = await getConversationTranscript(conversationId, sessionId);
        
        if (transcriptData.status === 'pending' || transcriptData.status === 'processing') {
          // Wenn das Transkript noch verarbeitet wird und wir noch nicht zu oft versucht haben
          if (retryCount < 5) {
            // Versuche es nach 5 Sekunden erneut
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 5000);
            return;
          } else {
            setError('Die Verarbeitung des Transkripts dauert länger als erwartet. Bitte versuchen Sie es später erneut.');
            setIsLoading(false);
            return;
          }
        }
        
        if (transcriptData.status === 'error' || transcriptData.status === 'failed') {
          setError('Das Transkript konnte nicht abgerufen werden.');
          setIsLoading(false);
          return;
        }
        
        if (transcriptData.transcript) {
          setTranscript(transcriptData.transcript);
        } else {
          setError('Kein Transkript gefunden');
        }
      } catch (error) {
        console.error('Error loading transcript:', error);
        setError(error instanceof Error ? error.message : 'Fehler beim Laden des Transkripts');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTranscript();
  }, [conversationId, sessionId, retryCount]);
  
  useEffect(() => {
    if (!transcript) return;
    
    // Format transcript and highlight search terms if any
    formatTranscript(transcript, searchQuery);
  }, [transcript, searchQuery]);
  
  const formatTranscript = (text: string, query: string) => {
    if (!text) return;
    
    try {
      // Simple transcript formatting - assume format from the API
      // This would need to be adjusted based on the actual transcript format
      const lines = text.split('\n');
      
      const formattedLines = lines.map((line, index) => {
        // Check if line has speaker information (assuming format like "Speaker: Text")
        const speakerMatch = line.match(/^(.+?):\s(.+)$/);
        
        if (speakerMatch) {
          const [, speaker, content] = speakerMatch;
          
          // Highlight search term if present
          if (query && query.trim() !== '') {
            const regex = new RegExp(`(${query})`, 'gi');
            const parts = content.split(regex);
            
            const highlightedContent = parts.map((part, i) => 
              regex.test(part) ? 
                <span key={i} className="bg-yellow-200 text-black">{part}</span> : 
                part
            );
            
            return (
              <div key={index} className="mb-2">
                <span className="font-semibold">{speaker}: </span>
                <span>{highlightedContent}</span>
              </div>
            );
          }
          
          return (
            <div key={index} className="mb-2">
              <span className="font-semibold">{speaker}: </span>
              <span>{content}</span>
            </div>
          );
        }
        
        // No speaker format, just return the line
        return <div key={index} className="mb-2">{line}</div>;
      });
      
      setFormattedTranscript(<>{formattedLines}</>);
    } catch (error) {
      console.error('Error formatting transcript:', error);
      setFormattedTranscript(<div>{text}</div>);
    }
  };
  
  const handleSearch = () => {
    if (!transcript) return;
    
    // Re-format with the search term
    formatTranscript(transcript, searchQuery);
    
    // Find first match and scroll to it
    if (searchQuery && transcriptRef.current) {
      setTimeout(() => {
        const highlight = transcriptRef.current?.querySelector('.bg-yellow-200');
        highlight?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gitflash-primary mb-4" />
        <p className="text-muted-foreground">
          {retryCount > 0 
            ? `Transkript wird verarbeitet, bitte warten (${retryCount}/5)...` 
            : 'Transkript wird geladen...'}
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (!transcript) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p>Kein Transkript verfügbar</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Im Transkript suchen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Suchen</Button>
      </div>
      
      <div 
        className="border rounded-md p-4 bg-white max-h-[60vh] overflow-y-auto" 
        ref={transcriptRef}
      >
        {formattedTranscript}
      </div>
    </div>
  );
}
