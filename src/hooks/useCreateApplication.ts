
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateApplicationData {
  jobId: string;
  name: string;
  email: string;
  linkedinProfile?: string;
  cvFile?: File;
}

interface CreateApplicationResponse {
  success: boolean;
  application?: any;
  user?: {
    id: string;
    email: string;
    isNewUser: boolean;
    generatedPassword?: string;
  };
  error?: string;
}

export function useCreateApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createApplication = async (data: CreateApplicationData): Promise<CreateApplicationResponse> => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('jobId', data.jobId);
      formData.append('name', data.name);
      formData.append('email', data.email);
      
      if (data.linkedinProfile) {
        formData.append('linkedinProfile', data.linkedinProfile);
      }
      
      if (data.cvFile) {
        formData.append('cvFile', data.cvFile);
      }

      const { data: response, error } = await supabase.functions.invoke('create-application', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!response.success) {
        throw new Error(response.error || 'Failed to create application');
      }

      console.log('Application created successfully:', response);
      return response;

    } catch (error) {
      console.error('Error creating application:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createApplication,
    isSubmitting
  };
}
