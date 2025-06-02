
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateOffer } from '@/hooks/useCreateOffer';
import { Application } from '@/hooks/useApplications';

interface CreateOfferDialogProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOfferDialog({ application, isOpen, onClose }: CreateOfferDialogProps) {
  const { createOffer, creating } = useCreateOffer();
  
  const [formData, setFormData] = useState({
    position_title: application.job?.title || '',
    salary_amount: '',
    salary_type: 'monthly' as const,
    salary_currency: 'EUR',
    start_date: '',
    contract_type: 'full-time' as const,
    working_hours: '',
    location: application.job?.location || '',
    remote_work_allowed: false,
    benefits: '',
    additional_terms: '',
    response_deadline: '',
    is_negotiable: true,
    counter_offer_allowed: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createOffer({
        application_id: application.id,
        ...formData,
        salary_amount: formData.salary_amount ? Math.round(parseFloat(formData.salary_amount) * 100) : undefined,
      });
      onClose();
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const formatSalaryLabel = (type: string) => {
    switch (type) {
      case 'hourly': return 'pro Stunde';
      case 'monthly': return 'pro Monat';
      case 'yearly': return 'pro Jahr';
      case 'project': return 'Projektpauschale';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Angebot erstellen</DialogTitle>
          <DialogDescription>
            Erstellen Sie ein strukturiertes Angebot für {application.applicant_name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position_title">Position</Label>
              <Input
                id="position_title"
                value={formData.position_title}
                onChange={(e) => setFormData(prev => ({ ...prev, position_title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="start_date">Startdatum</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salary_amount">Gehalt ({formatSalaryLabel(formData.salary_type)})</Label>
              <Input
                id="salary_amount"
                type="number"
                placeholder="z.B. 65000"
                value={formData.salary_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_amount: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="salary_type">Gehaltstyp</Label>
              <Select value={formData.salary_type} onValueChange={(value) => setFormData(prev => ({ ...prev, salary_type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Stündlich</SelectItem>
                  <SelectItem value="monthly">Monatlich</SelectItem>
                  <SelectItem value="yearly">Jährlich</SelectItem>
                  <SelectItem value="project">Projekt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="contract_type">Vertragsart</Label>
              <Select value={formData.contract_type} onValueChange={(value) => setFormData(prev => ({ ...prev, contract_type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Vollzeit</SelectItem>
                  <SelectItem value="part-time">Teilzeit</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="contract">Zeitvertrag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="working_hours">Arbeitszeiten</Label>
              <Input
                id="working_hours"
                placeholder="z.B. 40h/Woche, flexibel"
                value={formData.working_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, working_hours: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Arbeitsort</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="benefits">Benefits & Zusatzleistungen</Label>
            <Textarea
              id="benefits"
              placeholder="z.B. Firmenwagen, Homeoffice, Weiterbildung..."
              value={formData.benefits}
              onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="additional_terms">Zusätzliche Bedingungen</Label>
            <Textarea
              id="additional_terms"
              placeholder="Weitere Vertragsdetails..."
              value={formData.additional_terms}
              onChange={(e) => setFormData(prev => ({ ...prev, additional_terms: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="response_deadline">Antwort-Deadline</Label>
            <Input
              id="response_deadline"
              type="datetime-local"
              value={formData.response_deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, response_deadline: e.target.value }))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote_work_allowed"
                checked={formData.remote_work_allowed}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remote_work_allowed: !!checked }))}
              />
              <Label htmlFor="remote_work_allowed">Remote-Arbeit möglich</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_negotiable"
                checked={formData.is_negotiable}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_negotiable: !!checked }))}
              />
              <Label htmlFor="is_negotiable">Verhandelbar</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="counter_offer_allowed"
                checked={formData.counter_offer_allowed}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, counter_offer_allowed: !!checked }))}
              />
              <Label htmlFor="counter_offer_allowed">Gegenangebote erlaubt</Label>
            </div>
          </div>
        </form>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={creating}>
            {creating ? 'Wird erstellt...' : 'Angebot erstellen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
