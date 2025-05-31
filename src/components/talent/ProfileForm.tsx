
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, FileText, Award } from 'lucide-react';

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Grunddaten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headline">Berufstitel</Label>
            <Input
              id="headline"
              placeholder="z.B. Bauingenieur mit 5 Jahren Erfahrung"
            />
          </div>
          
          <div>
            <Label htmlFor="summary">Zusammenfassung</Label>
            <Textarea
              id="summary"
              placeholder="Beschreiben Sie Ihre Erfahrungen und Kompetenzen..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Fähigkeiten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="skills">Kompetenzen</Label>
            <Textarea
              id="skills"
              placeholder="z.B. Projektmanagement, AutoCAD, Baurecht..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lebenslauf
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="cv">Lebenslauf hochladen</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          Profil speichern
        </Button>
      </div>
    </div>
  );
}
