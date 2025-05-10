
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JobanzeigeErstellen: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the logic to save the job posting
    console.log({ jobTitle, jobType, location, salary, description });
    navigate('/unternehmen');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate('/unternehmen')}
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
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                placeholder="z.B. Bauleiter:in Hochbau"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobType">Beschäftigungsart</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Beschäftigungsart wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Vollzeit</SelectItem>
                    <SelectItem value="parttime">Teilzeit</SelectItem>
                    <SelectItem value="freelance">Freiberuflich</SelectItem>
                    <SelectItem value="temporary">Befristet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Standort</Label>
                <Input 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="z.B. Berlin oder Remote"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="salary">Gehaltsspanne</Label>
              <Input 
                id="salary" 
                value={salary} 
                onChange={(e) => setSalary(e.target.value)} 
                placeholder="z.B. 60.000€ - 75.000€ pro Jahr"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Stellenbeschreibung</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Beschreiben Sie die Position, Aufgaben und Anforderungen..." 
                rows={10}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/unternehmen')}
            >
              Abbrechen
            </Button>
            <Button type="submit" className="bg-gitflash-primary hover:bg-gitflash-primary/90">
              Jobanzeige veröffentlichen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
