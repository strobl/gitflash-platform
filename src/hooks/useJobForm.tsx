
import { useState } from 'react';

interface JobFormData {
  title: string;
  location: string;
  description: string;
  contractType: string;
  billingType: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  referralBonus: string;
  interview: string;
  form: string;
  rejectionEmail: string;
  automaticCommunication: boolean;
  automaticRedirect: boolean;
}

interface JobFormErrors {
  title?: string;
  location?: string;
  description?: string;
}

export const useJobForm = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    contractType: '',
    billingType: '',
    hourlyRateMin: '0',
    hourlyRateMax: '0',
    referralBonus: '$250',
    interview: 'Keine',
    form: 'Keins',
    rejectionEmail: '',
    automaticCommunication: false,
    automaticRedirect: false,
  });

  const [errors, setErrors] = useState<JobFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof JobFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    setIsSubmitting,
  };
};
