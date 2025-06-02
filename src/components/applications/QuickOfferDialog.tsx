
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateOffer } from '@/hooks/useCreateOffer';
import { Application } from '@/hooks/useApplications';

interface QuickOfferDialogProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

type SalaryType = 'hourly' | 'monthly' | 'yearly' | 'project';
type ContractType = 'full-time' | 'part-time' | 'freelance' | 'contract';

interface QuickOfferData {
  salary_amount: string;
  salary_type: SalaryType;
  contract_type: ContractType;
  start_date: string;
  additional_terms: string;
}

export function QuickOfferDialog({ application, isOpen, onClose }: QuickOfferDialogProps) {
  const { createOffer, creating } = useCreateOffer();
  
  const [formData, setFormData] = useState<QuickOfferData>({
    salary_amount: '',
    salary_type: 'monthly',
    contract_type: 'full-time',
    start_date: '',
    additional_terms: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createOffer({
        application_id: application.id,
        position_title: application.job?.title || 'Unbenannte Position',
        salary_amount: formData.salary_amount ? Math.round(parseFloat(formData.salary_amount) * 100) : undefined,
        salary_type: formData.salary_type,
        salary_currency: 'EUR',
        contract_type: formData.contract_type,
        start_date: formData.start_date,
        location: application.job?.location,
        additional_terms: formData.additional_terms,
        is_negotiable: true,
        counter_offer_allowed: true,
      });
      onClose();
    } catch (error) {
      console.error('Error creating quick offer:', error);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schnelles Angebot</DialogTitle>
          <DialogDescription>
            Erstellen Sie schnell ein Angebot für {application.applicant_name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_amount">Gehalt ({formatSalaryLabel(formData.salary_type)})</Label>
              <Input
                id="salary_amount"
                type="number"
                placeholder="z.B. 4500"
                value={formData.salary_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_amount: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="salary_type">Typ</Label>
              <Select value={formData.salary_type} onValueChange={(value: SalaryType) => setFormData(prev => ({ ...prev, salary_type: value }))}>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contract_type">Vertragsart</Label>
              <Select value={formData.contract_type} onValueChange={(value: ContractType) => setFormData(prev => ({ ...prev, contract_type: value }))}>
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

          <div>
            <Label htmlFor="additional_terms">Zusätzliche Bedingungen (optional)</Label>
            <Textarea
              id="additional_terms"
              placeholder="Weitere Details zum Angebot..."
              value={formData.additional_terms}
              onChange={(e) => setFormData(prev => ({ ...prev, additional_terms: e.target.value }))}
              rows={2}
            />
          </div>
        </form>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={creating}>
            {creating ? 'Wird erstellt...' : 'Angebot senden'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
