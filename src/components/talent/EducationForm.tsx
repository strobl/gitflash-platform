
import React, { useState } from 'react';
import { EducationEntry } from '@/types/talent-profile';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash, Plus } from 'lucide-react';

interface EducationFormProps {
  education: EducationEntry[];
  onAdd: (entry: Omit<EducationEntry, 'talent_profile_id'>) => Promise<EducationEntry | null>;
  onUpdate: (id: string, updates: Partial<EducationEntry>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  isEditable: boolean;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onUpdate,
  onDelete,
  isEditable
}) => {
  const [newEntry, setNewEntry] = useState<Omit<EducationEntry, 'talent_profile_id'>>({
    institution: '',
    degree: '',
    start_date: '',
    end_date: '',
    description: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    field: keyof EducationEntry, 
    id?: string
  ) => {
    if (id) {
      // Update existing entry
      const updatedValue = e.target.value;
      onUpdate(id, { [field]: updatedValue });
    } else {
      // Update new entry form
      setNewEntry(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.institution || !newEntry.degree || !newEntry.start_date) return;
    
    await onAdd(newEntry);
    // Reset form
    setNewEntry({
      institution: '',
      degree: '',
      start_date: '',
      end_date: '',
      description: ''
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ausbildung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map(edu => (
          <Card key={edu.id} className="mb-4 bg-muted/30">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => handleInputChange(e, 'institution', edu.id)}
                    placeholder="z.B. Technische Universität Berlin"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Abschluss</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => handleInputChange(e, 'degree', edu.id)}
                    placeholder="z.B. M.Sc. Informatik"
                    disabled={!isEditable}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`start_date-${edu.id}`}>Von</Label>
                  <Input
                    id={`start_date-${edu.id}`}
                    value={edu.start_date}
                    onChange={(e) => handleInputChange(e, 'start_date', edu.id)}
                    placeholder="YYYY-MM"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`end_date-${edu.id}`}>Bis</Label>
                  <Input
                    id={`end_date-${edu.id}`}
                    value={edu.end_date || ''}
                    onChange={(e) => handleInputChange(e, 'end_date', edu.id)}
                    placeholder="YYYY-MM"
                    disabled={!isEditable}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${edu.id}`}>Beschreibung</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description || ''}
                  onChange={(e) => handleInputChange(e, 'description', edu.id)}
                  placeholder="Beschreibe dein Studium, Schwerpunkte und Erfolge"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
              
              {isEditable && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDelete(edu.id!)}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Löschen
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {isEditable && (
          <Card className="border-dashed">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="new-institution">Institution</Label>
                  <Input
                    id="new-institution"
                    value={newEntry.institution}
                    onChange={(e) => handleInputChange(e, 'institution')}
                    placeholder="z.B. Technische Universität Berlin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-degree">Abschluss</Label>
                  <Input
                    id="new-degree"
                    value={newEntry.degree}
                    onChange={(e) => handleInputChange(e, 'degree')}
                    placeholder="z.B. M.Sc. Informatik"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="new-start_date">Von</Label>
                  <Input
                    id="new-start_date"
                    value={newEntry.start_date}
                    onChange={(e) => handleInputChange(e, 'start_date')}
                    placeholder="YYYY-MM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-end_date">Bis</Label>
                  <Input
                    id="new-end_date"
                    value={newEntry.end_date}
                    onChange={(e) => handleInputChange(e, 'end_date')}
                    placeholder="YYYY-MM"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-description">Beschreibung</Label>
                <Textarea
                  id="new-description"
                  value={newEntry.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                  placeholder="Beschreibe dein Studium, Schwerpunkte und Erfolge"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddEntry} 
                className="ml-auto"
                disabled={!newEntry.institution || !newEntry.degree || !newEntry.start_date}
              >
                <Plus className="h-4 w-4 mr-1" /> Hinzufügen
              </Button>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
