
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download } from 'lucide-react';

interface CvUploadProps {
  cvUrl: string | undefined;
  onUpload: (file: File) => Promise<string | null>;
  isEditable: boolean;
}

export const CvUpload: React.FC<CvUploadProps> = ({ cvUrl, onUpload, isEditable }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (file.type !== 'application/pdf') {
      alert('Bitte lade nur PDF-Dateien hoch.');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    await onUpload(file);
    setIsUploading(false);
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
          
          {displayFileName && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm flex items-center">
                <span className="font-medium">Datei:</span>
                <span className="ml-2 truncate">{displayFileName}</span>
              </p>
            </div>
          )}
          
          {!cvUrl && !displayFileName && (
            <p className="text-sm text-muted-foreground">
              Lade deinen Lebenslauf im PDF-Format hoch. 
              Unternehmen können diesen herunterladen und ansehen.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
