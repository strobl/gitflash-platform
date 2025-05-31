
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicJob } from '@/hooks/usePublicJobs';
import { Upload, Link as LinkIcon, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationModalProps {
  job: PublicJob;
  onClose: () => void;
}

export function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    link: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatSalary = (min: string, max: string) => {
    if (min === '0' && max === '0') return 'Nach Vereinbarung';
    if (min === max) return `${min}€/Std`;
    return `${min}€-${max}€/Std`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Datei zu groß. Maximal 5MB erlaubt.');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Nur PDF, DOC oder DOCX Dateien erlaubt.');
        return;
      }
      
      setCvFile(file);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual application submission to backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast.success('Bewerbung erfolgreich gesendet!');
      onClose();
    } catch (error) {
      toast.error('Fehler beim Senden der Bewerbung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 bg-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gitflash-primary mb-1">
              {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
            </div>
            <div className="text-sm text-gitflash-secondary">
              Stundenbasierter Vertrag
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-4">
          {/* Name Field */}
          <div>
            <Input
              type="text"
              placeholder="Name*"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full h-12 text-base border-gray-200 focus:border-gitflash-primary"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <Input
              type="email"
              placeholder="Email*"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-12 text-base border-gray-200 focus:border-gitflash-primary"
              required
            />
          </div>

          {/* Link Field */}
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="url"
              placeholder="LinkedIn/In..."
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              className="w-full h-12 pl-10 text-base border-gray-200 focus:border-gitflash-primary"
            />
          </div>

          {/* CV Upload */}
          <div className="mt-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gitflash-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <div className="text-base font-medium text-gray-700 mb-1">
                    {cvFile ? cvFile.name : 'Lebenslauf hochladen'}
                  </div>
                  <div className="text-sm text-gray-500">
                    PDF, DOC oder DOCX bis zu 5MB
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 bg-gitflash-primary hover:bg-gitflash-secondary text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></div>
              ) : (
                <>
                  <span>Jetzt bewerben</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
