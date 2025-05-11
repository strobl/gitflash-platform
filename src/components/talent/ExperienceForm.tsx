
import React, { useState } from 'react';
import { ExperienceEntry } from '@/types/talent-profile';
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

interface ExperienceFormProps {
  experiences: ExperienceEntry[];
  onAdd: (entry: Omit<ExperienceEntry, 'talent_profile_id'>) => Promise<ExperienceEntry | null>;
  onUpdate: (id: string, updates: Partial<ExperienceEntry>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  isEditable: boolean;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
  isEditable
}) => {
  const [newEntry, setNewEntry] = useState<Omit<ExperienceEntry, 'talent_profile_id'>>({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    field: keyof ExperienceEntry, 
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
    if (!newEntry.title || !newEntry.company || !newEntry.start_date) return;
    
    await onAdd(newEntry);
    // Reset form
    setNewEntry({
      title: '',
      company: '',
      start_date: '',
      end_date: '',
      description: ''
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Berufserfahrung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.map(exp => (
          <Card key={exp.id} className="mb-4 bg-muted/30">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${exp.id}`}>Position</Label>
                  <Input
                    id={`title-${exp.id}`}
                    value={exp.title}
                    onChange={(e) => handleInputChange(e, 'title', exp.id)}
                    placeholder="z.B. Senior Frontend Developer"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Unternehmen</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleInputChange(e, 'company', exp.id)}
                    placeholder="z.B. ACME GmbH"
                    disabled={!isEditable}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`start_date-${exp.id}`}>Von</Label>
                  <Input
                    id={`start_date-${exp.id}`}
                    value={exp.start_date}
                    onChange={(e) => handleInputChange(e, 'start_date', exp.id)}
                    placeholder="YYYY-MM"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`end_date-${exp.id}`}>Bis</Label>
                  <Input
                    id={`end_date-${exp.id}`}
                    value={exp.end_date || ''}
                    onChange={(e) => handleInputChange(e, 'end_date', exp.id)}
                    placeholder="YYYY-MM oder 'heute'"
                    disabled={!isEditable}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${exp.id}`}>Beschreibung</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description || ''}
                  onChange={(e) => handleInputChange(e, 'description', exp.id)}
                  placeholder="Beschreibe deine Tätigkeiten und Erfolge"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
              
              {isEditable && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDelete(exp.id!)}
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
                  <Label htmlFor="new-title">Position</Label>
                  <Input
                    id="new-title"
                    value={newEntry.title}
                    onChange={(e) => handleInputChange(e, 'title')}
                    placeholder="z.B. Senior Frontend Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-company">Unternehmen</Label>
                  <Input
                    id="new-company"
                    value={newEntry.company}
                    onChange={(e) => handleInputChange(e, 'company')}
                    placeholder="z.B. ACME GmbH"
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
                    placeholder="YYYY-MM oder 'heute'"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-description">Beschreibung</Label>
                <Textarea
                  id="new-description"
                  value={newEntry.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                  placeholder="Beschreibe deine Tätigkeiten und Erfolge"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddEntry} 
                className="ml-auto"
                disabled={!newEntry.title || !newEntry.company || !newEntry.start_date}
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
