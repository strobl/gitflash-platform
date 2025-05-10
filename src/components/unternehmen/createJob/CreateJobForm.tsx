
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useJobForm } from '@/hooks/useJobForm';
import { useToast } from '@/hooks/use-toast';

export const CreateJobForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    formData, 
    updateField, 
    validateForm, 
    errors, 
    submitJob,
    isSubmitting
  } = useJobForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validierungsfehler",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitJob();
      toast({
        title: "Erfolg!",
        description: "Ihre Jobanzeige wurde erfolgreich veröffentlicht.",
      });
      navigate("/unternehmen/jobs");
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Veröffentlichen der Jobanzeige.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate('/unternehmen/jobs')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Zurück
          </Button>
          <h2 className="text-xl font-semibold text-gitflash-primary">Neue Jobanzeige erstellen</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Jobtitel</Label>
              <Input 
                id="jobTitle" 
                value={formData.jobTitle} 
                onChange={(e) => updateField('jobTitle', e.target.value)} 
                placeholder="z.B. Bauleiter:in Hochbau"
                className={errors.jobTitle ? "border-red-500" : ""}
                required
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobType">Beschäftigungsart</Label>
                <Select 
                  value={formData.jobType} 
                  onValueChange={(value) => updateField('jobType', value)}
                >
                  <SelectTrigger id="jobType" className={errors.jobType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Beschäftigungsart wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Vollzeit</SelectItem>
                    <SelectItem value="parttime">Teilzeit</SelectItem>
                    <SelectItem value="freelance">Freiberuflich</SelectItem>
                    <SelectItem value="temporary">Befristet</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="location">Standort</Label>
                <Input 
                  id="location" 
                  value={formData.location} 
                  onChange={(e) => updateField('location', e.target.value)} 
                  placeholder="z.B. Berlin oder Remote"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="salary">Gehaltsspanne</Label>
              <Input 
                id="salary" 
                value={formData.salary} 
                onChange={(e) => updateField('salary', e.target.value)} 
                placeholder="z.B. 60.000€ - 75.000€ pro Jahr"
                className={errors.salary ? "border-red-500" : ""}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="description">Stellenbeschreibung</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => updateField('description', e.target.value)} 
                placeholder="Beschreiben Sie die Position, Aufgaben und Anforderungen..." 
                rows={10}
                className={errors.description ? "border-red-500" : ""}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/unternehmen/jobs')}
            >
              Abbrechen
            </Button>
            <Button 
              type="submit" 
              className="bg-gitflash-primary hover:bg-gitflash-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird veröffentlicht..." : "Jobanzeige veröffentlichen"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
