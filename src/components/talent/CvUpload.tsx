
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, AlertCircle, File } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CvUploadProps {
  cvUrl: string | undefined;
  onUpload: (file: File) => Promise<string | null>;
  isEditable: boolean;
}

export const CvUpload: React.FC<CvUploadProps> = ({ cvUrl, onUpload, isEditable }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    // Validate file type
    if (file.type !== 'application/pdf') {
      setFileError('Nur PDF-Dateien werden unterstützt.');
      toast({
        title: "Falsches Dateiformat",
        description: "Bitte lade nur PDF-Dateien hoch.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('Die Datei ist zu groß. Maximale Größe: 5MB.');
      toast({
        title: "Datei zu groß",
        description: "Die maximale Dateigröße beträgt 5MB.",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    
    try {
      const url = await onUpload(file);
      if (url) {
        toast({
          title: "Upload erfolgreich",
          description: "Dein Lebenslauf wurde erfolgreich hochgeladen.",
        });
      } else {
        throw new Error("Upload fehlgeschlagen");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload fehlgeschlagen",
        description: "Es gab ein Problem beim Hochladen deines Lebenslaufs. Bitte versuche es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Extract file name from URL
  const extractFileName = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const displayFileName = cvUrl ? extractFileName(cvUrl) : fileName;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Lebenslauf (CV)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cv-upload">PDF-Datei hochladen</Label>
            <Input
              id="cv-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
              disabled={!isEditable || isUploading}
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              {isEditable && (
                <Button 
                  onClick={triggerFileInput}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Wird hochgeladen...' : 'CV hochladen'}
                </Button>
              )}
              
              {cvUrl && (
                <Button variant="outline" asChild>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    CV anzeigen
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {fileError && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{fileError}</p>
            </div>
          )}
          
          {displayFileName && !fileError && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm flex items-center">
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="font-medium mr-2">Datei:</span>
                <span className="truncate">{displayFileName}</span>
              </p>
            </div>
          )}
          
          {!cvUrl && !displayFileName && !fileError && (
            <p className="text-sm text-muted-foreground">
              Lade deinen Lebenslauf im PDF-Format hoch (max. 5MB). 
              Unternehmen können diesen herunterladen und ansehen.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
