
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define the job types to match the Figma design
export type JobType = 'fulltime' | 'parttime' | 'freelance' | 'temporary';
export type BillingType = 'Stunden' | 'Tage' | 'Monat';
export type InterviewType = 'Keine' | 'Telefoninterview' | 'Videointerview' | 'Vor-Ort-Interview';
export type FormType = 'Keins' | 'Standardformular' | 'Benutzerdefinierts Formular';

export interface JobFormData {
  title: string;
  location: string;
  description: string;
  contractType: JobType;
  billingType: BillingType;
  hourlyRateMin: string;
  hourlyRateMax: string;
  referralBonus: string;
  interview: InterviewType;
  form: FormType;
  rejectionEmail: string;
  automaticCommunication: boolean;
  automaticRedirect: boolean;
}

export interface JobFormErrors {
  title?: string;
  location?: string;
  description?: string;
  contractType?: string;
  billingType?: string;
  hourlyRateMin?: string;
  hourlyRateMax?: string;
  referralBonus?: string;
}

export const useJobForm = () => {
  // Initialize form data with default values from Figma design
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: 'Remote',
    description: '',
    contractType: 'fulltime',
    billingType: 'Stunden',
    hourlyRateMin: '0',
    hourlyRateMax: '0',
    referralBonus: '$250',
    interview: 'Keine',
    form: 'Keins',
    rejectionEmail: 'Hallo {{first_name}},\nvielen Dank für Ihr Interesse an dieser Position.\nLeider können wir Ihre Bewerbung in diesem Fall nicht weiter berücksichtigen.\n\nSie können gerne über aktuelle Möglichkeiten auf dem Laufenden bleiben.',
    automaticCommunication: false,
    automaticRedirect: false
  });

  const [errors, setErrors] = useState<JobFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const updateField = <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-save indication
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    // Clear error on field change
    if (errors[field as keyof JobFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: JobFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Jobtitel ist erforderlich';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Standort ist erforderlich';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Stellenbeschreibung ist erforderlich';
    }

    if (!formData.contractType) {
      newErrors.contractType = 'Vertragsart ist erforderlich';
    }

    if (!formData.billingType) {
      newErrors.billingType = 'Abrechnungsart ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitJob = async (): Promise<void> => {
    if (!validateForm()) {
      return Promise.reject('Formular enthält Fehler');
    }

    setIsSubmitting(true);

    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Nicht authentifiziert');
      }

      // Create job with 'draft' status and include user_id
      const { data: job, error } = await supabase
        .from('jobs')
        .insert({
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
          status: 'draft',
          user_id: user.id // Add user_id to job creation
        })
        .select()
        .single();

      if (error) throw error;

      // Create payment session and redirect to Stripe
      const { data, error: paymentError } = await supabase.functions.invoke(
        'create-payment-session',
        {
          body: { jobId: job.id },
        }
      );

      if (paymentError) throw paymentError;

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting job:', error);
      return Promise.reject(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateField,
    validateForm,
    errors,
    isSubmitting,
    submitJob,
    isSaved,
  };
};
