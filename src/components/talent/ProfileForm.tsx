
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

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Profil erfolgreich aktualisiert');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Informationen</CardTitle>
          <CardDescription>
            Teilen Sie grundlegende Informationen über sich selbst.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input id="firstName" placeholder="Vorname eingeben" defaultValue="Max" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input id="lastName" placeholder="Nachname eingeben" defaultValue="Mustermann" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" placeholder="Ihre E-Mail-Adresse" defaultValue="max@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" placeholder="Ihre Telefonnummer" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Stadt</Label>
              <Input id="city" placeholder="Ihre Stadt" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Land</Label>
              <Select defaultValue="germany">
                <SelectTrigger>
                  <SelectValue placeholder="Land auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="germany">Deutschland</SelectItem>
                  <SelectItem value="austria">Österreich</SelectItem>
                  <SelectItem value="switzerland">Schweiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Kurzbiografie</Label>
            <Textarea 
              id="bio" 
              placeholder="Kurze Beschreibung Ihrer Person und Ihrer beruflichen Ziele"
              className="min-h-[120px]"
              defaultValue="Ich bin ein erfahrener Bauingenieur mit Schwerpunkt auf nachhaltigen Bauprojekten."
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Berufserfahrung</CardTitle>
          <CardDescription>
            Fügen Sie Ihre relevanten Berufserfahrungen hinzu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4 relative space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Position</Label>
                <Input id="jobTitle" placeholder="Ihre Position" defaultValue="Senior Bauingenieur" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Unternehmen</Label>
                <Input id="company" placeholder="Name des Unternehmens" defaultValue="BauProjekt GmbH" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Von</Label>
                <Input id="startDate" type="date" defaultValue="2018-03-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Bis</Label>
                <Input id="endDate" type="date" defaultValue="2023-04-30" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea 
                id="description" 
                placeholder="Beschreiben Sie Ihre Tätigkeiten und Erfolge"
                className="min-h-[100px]"
                defaultValue="Leitung von Bauprojekten im Wert von über 5 Millionen Euro. Verantwortlich für Planung, Ausführung und Qualitätskontrolle."
              />
            </div>
            
            <Button variant="outline" type="button" className="w-full">
              + Weitere Berufserfahrung hinzufügen
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ausbildung</CardTitle>
          <CardDescription>
            Fügen Sie Ihre Bildungsabschlüsse hinzu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4 relative space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Abschluss</Label>
                <Input id="degree" placeholder="Art des Abschlusses" defaultValue="Master of Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Fachrichtung</Label>
                <Input id="field" placeholder="Studiengang/Fachrichtung" defaultValue="Bauingenieurwesen" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school">Bildungseinrichtung</Label>
                <Input id="school" placeholder="Name der Universität/Schule" defaultValue="Technische Universität Berlin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Abschlussjahr</Label>
                <Input id="graduationYear" placeholder="Jahr des Abschlusses" defaultValue="2018" />
              </div>
            </div>
            
            <Button variant="outline" type="button" className="w-full">
              + Weitere Ausbildung hinzufügen
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Fähigkeiten</CardTitle>
          <CardDescription>
            Fügen Sie Ihre relevanten Fähigkeiten und Kenntnisse hinzu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="border rounded-md p-4 grid grid-cols-1 gap-2">
              <div className="flex gap-2">
                <div className="bg-gitflash-primary/20 text-gitflash-primary px-3 py-1 rounded-md text-sm">
                  Statikberechnung
                </div>
                <div className="bg-gitflash-primary/20 text-gitflash-primary px-3 py-1 rounded-md text-sm">
                  Projektmanagement
                </div>
                <div className="bg-gitflash-primary/20 text-gitflash-primary px-3 py-1 rounded-md text-sm">
                  BIM
                </div>
              </div>
              <div className="flex gap-2">
                <div className="bg-gitflash-primary/20 text-gitflash-primary px-3 py-1 rounded-md text-sm">
                  AutoCAD
                </div>
                <div className="bg-gitflash-primary/20 text-gitflash-primary px-3 py-1 rounded-md text-sm">
                  Nachhaltiges Bauen
                </div>
              </div>
              <div className="mt-2">
                <Input placeholder="Neue Fähigkeit hinzufügen und Enter drücken" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lebenslauf hochladen</CardTitle>
          <CardDescription>
            Laden Sie Ihren aktuellen Lebenslauf hoch (PDF, DOC, DOCX).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
            <div className="text-center space-y-2">
              <div className="bg-gitflash-primary/20 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-6 w-6 text-gitflash-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Datei hierher ziehen oder klicken zum Hochladen</p>
                <p className="text-sm text-muted-foreground">Max. 5MB</p>
              </div>
              <Button variant="outline" type="button" className="mt-2">Durchsuchen</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-gitflash-primary hover:bg-gitflash-secondary" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : 'Profil speichern'}
        </Button>
      </div>
    </form>
  );
}
