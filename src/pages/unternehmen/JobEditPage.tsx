
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

export default function JobEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Form state
  const [formData, setFormData] = React.useState({
    title: '',
    location: '',
    description: '',
    contractType: '',
    billingType: '',
    hourlyRateMin: '',
    hourlyRateMax: '',
    referralBonus: '$250',
    interview: 'Keine',
    form: 'Keins',
    rejectionEmail: '',
    automaticCommunication: false,
    automaticRedirect: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      
      try {
        const { data: job, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Populate form with existing data
        setFormData({
          title: job.title || '',
          location: job.location || '',
          description: job.description || '',
          contractType: job.contract_type || '',
          billingType: job.billing_type || '',
          hourlyRateMin: job.hourly_rate_min || '',
          hourlyRateMax: job.hourly_rate_max || '',
          referralBonus: job.referral_bonus || '$250',
          interview: job.interview || 'Keine',
          form: job.form || 'Keins',
          rejectionEmail: job.rejection_email || '',
          automaticCommunication: job.automatic_communication || false,
          automaticRedirect: job.automatic_redirect || false,
        });
      } catch (err) {
        console.error('Error loading job:', err);
        toast.error('Fehler beim Laden der Jobanzeige');
        navigate('/unternehmen');
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          contract_type: formData.contractType,
          billing_type: formData.billingType,
          hourly_rate_min: formData.hourlyRateMin,
          hourly_rate_max: formData.hourlyRateMax,
          referral_bonus: formData.referralBonus,
          interview: formData.interview,
          form: formData.form,
          rejection_email: formData.rejectionEmail,
          automatic_communication: formData.automaticCommunication,
          automatic_redirect: formData.automaticRedirect,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Jobanzeige erfolgreich aktualisiert');
      navigate(`/unternehmen/jobanzeigen/${id}`);
    } catch (err) {
      console.error('Error updating job:', err);
      toast.error('Fehler beim Speichern der Änderungen');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex flex-1 overflow-hidden">
          <UnternehmenNavigation />
          <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
            <div className="flex justify-center items-center h-80">
              <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(`/unternehmen/jobanzeigen/${id}`)}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Jobanzeige
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Jobanzeige bearbeiten</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Job-Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Jobtitel *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="z.B. Bauleiter:in Hochbau"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Standort *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="z.B. Berlin, Deutschland"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Stellenbeschreibung *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Beschreiben Sie die Stelle und Anforderungen..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contractType">Vertragsart *</Label>
                    <Select value={formData.contractType} onValueChange={(value) => updateField('contractType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vertragsart wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Vollzeit</SelectItem>
                        <SelectItem value="parttime">Teilzeit</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="temporary">Befristet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="billingType">Abrechnungsart *</Label>
                    <Select value={formData.billingType} onValueChange={(value) => updateField('billingType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Abrechnungsart wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stunden">Stunden</SelectItem>
                        <SelectItem value="Tage">Tage</SelectItem>
                        <SelectItem value="Monat">Monat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRateMin">Stundensatz von (€)</Label>
                    <Input
                      id="hourlyRateMin"
                      type="number"
                      value={formData.hourlyRateMin}
                      onChange={(e) => updateField('hourlyRateMin', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hourlyRateMax">Stundensatz bis (€)</Label>
                    <Input
                      id="hourlyRateMax"
                      type="number"
                      value={formData.hourlyRateMax}
                      onChange={(e) => updateField('hourlyRateMax', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/unternehmen/jobanzeigen/${id}`)}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="bg-gitflash-primary hover:bg-gitflash-primary/90"
                  >
                    {isSubmitting ? 'Speichern...' : 'Änderungen speichern'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
