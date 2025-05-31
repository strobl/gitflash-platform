
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationModalProps {
  job: {
    id: string;
    title: string;
    company: string;
  };
  onClose: () => void;
}

export function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    coverLetter: '',
    expectedSalary: '',
    availableFrom: '',
    cv: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Datei ist zu groß. Maximum 5MB erlaubt.');
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc')) {
        toast.error('Nur PDF und DOC Dateien sind erlaubt.');
        return;
      }
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cv) {
      toast.error('Bitte laden Sie Ihren Lebenslauf hoch.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success('Bewerbung erfolgreich eingereicht!');
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-gitflash-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gitflash-primary mb-2">
              Bewerbung eingereicht!
            </h3>
            <p className="text-gitflash-text mb-6">
              Ihre Bewerbung für <strong>{job.title}</strong> wurde erfolgreich übermittelt. 
              Sie erhalten in Kürze eine Bestätigung per E-Mail.
            </p>
            <Button 
              onClick={onClose}
              className="w-full bg-gitflash-primary hover:bg-gitflash-secondary text-white"
            >
              Schließen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gitflash-primary">
                Bewerbung senden
              </CardTitle>
              <p className="text-gitflash-secondary mt-1">
                {job.title} bei {job.company}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gitflash-secondary hover:text-gitflash-primary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CV Upload */}
            <div>
              <Label className="text-gitflash-primary font-medium mb-2 block">
                Lebenslauf hochladen *
              </Label>
              <div className="border-2 border-dashed border-gitflash-accent/30 rounded-lg p-6 text-center hover:border-gitflash-accent/50 transition-colors">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  {formData.cv ? (
                    <div className="flex items-center justify-center space-x-2 text-gitflash-primary">
                      <FileText className="w-6 h-6" />
                      <span className="font-medium">{formData.cv.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData(prev => ({ ...prev, cv: null }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gitflash-accent mx-auto" />
                      <p className="text-gitflash-primary font-medium">
                        Lebenslauf hochladen
                      </p>
                      <p className="text-sm text-gitflash-secondary">
                        PDF oder DOC, max. 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <Label htmlFor="coverLetter" className="text-gitflash-primary font-medium mb-2 block">
                Anschreiben *
              </Label>
              <Textarea
                id="coverLetter"
                placeholder="Warum sind Sie der/die richtige Kandidat/in für diese Position?"
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                className="min-h-[120px] border-gitflash-accent/30 focus:border-gitflash-accent"
                required
              />
            </div>

            {/* Expected Salary */}
            <div>
              <Label htmlFor="expectedSalary" className="text-gitflash-primary font-medium mb-2 block">
                Gehaltsvorstellung (optional)
              </Label>
              <Input
                id="expectedSalary"
                placeholder="z.B. 65.000€ pro Jahr oder 70€/Stunde"
                value={formData.expectedSalary}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                className="border-gitflash-accent/30 focus:border-gitflash-accent"
              />
            </div>

            {/* Available From */}
            <div>
              <Label htmlFor="availableFrom" className="text-gitflash-primary font-medium mb-2 block">
                Verfügbar ab (optional)
              </Label>
              <Input
                id="availableFrom"
                type="date"
                value={formData.availableFrom}
                onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
                className="border-gitflash-accent/30 focus:border-gitflash-accent"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gitflash-accent/30 text-gitflash-primary hover:bg-gitflash-light"
                disabled={isSubmitting}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-gitflash-primary to-gitflash-secondary hover:from-gitflash-secondary hover:to-gitflash-primary text-white"
                disabled={isSubmitting || !formData.cv || !formData.coverLetter}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Bewerbung senden'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
