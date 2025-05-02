
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

export function InterviewCreator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Tavus
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Interview erfolgreich erstellt');
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neues KI-Interview erstellen</CardTitle>
        <CardDescription>
          Definieren Sie ein KI-gestütztes Interview für Talente über die Tavus API.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="interview-name">Titel des Interviews</Label>
            <Input 
              id="interview-name" 
              placeholder="z.B. Bauingenieur Erstgespräch, Projektmanagement Assessment"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="persona">Interviewer-Persona</Label>
            <Select defaultValue="professional">
              <SelectTrigger id="persona">
                <SelectValue placeholder="Persona auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professioneller Personalmanager</SelectItem>
                <SelectItem value="technical">Technischer Experte</SelectItem>
                <SelectItem value="friendly">Freundlicher Gesprächspartner</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Dies bestimmt das Erscheinungsbild und den Stil des KI-Interviewers.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interview-questions">Interviewfragen/-anweisungen</Label>
            <Textarea 
              id="interview-questions" 
              className="min-h-[200px]" 
              placeholder="Geben Sie hier die Fragen oder Anweisungen für den KI-Interviewer ein. Eine Frage pro Zeile."
              defaultValue={`Stellen Sie sich bitte kurz vor und beschreiben Sie Ihren beruflichen Hintergrund.
Welche Erfahrungen haben Sie mit Bauprojektmanagement gemacht?
Beschreiben Sie eine Herausforderung, der Sie in einem Bauprojekt begegnet sind und wie Sie diese gelöst haben.
Welche Software-Tools nutzen Sie regelmäßig in Ihrer Arbeit?
Wie würden Sie den Fortschritt eines Projekts überwachen und sicherstellen, dass Termine eingehalten werden?`}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Maximale Interviewdauer</Label>
            <Select defaultValue="15">
              <SelectTrigger id="duration">
                <SelectValue placeholder="Dauer auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Minuten</SelectItem>
                <SelectItem value="15">15 Minuten</SelectItem>
                <SelectItem value="20">20 Minuten</SelectItem>
                <SelectItem value="30">30 Minuten</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="record" className="h-4 w-4" defaultChecked />
              <Label htmlFor="record">Aufzeichnung aktivieren</Label>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              Das Interview wird aufgezeichnet und kann später analysiert werden.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="transcript" className="h-4 w-4" defaultChecked />
              <Label htmlFor="transcript">Transkription erstellen</Label>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              Das Interview wird automatisch transkribiert.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Abbrechen</Button>
          <Button type="submit" className="bg-gitflash-accent hover:bg-gitflash-accent/90" disabled={isSubmitting}>
            {isSubmitting ? 'Wird erstellt...' : 'Interview erstellen'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
