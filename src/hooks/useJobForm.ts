
import { useState } from 'react';

interface JobFormData {
  jobTitle: string;
  jobType: string;
  location: string;
  salary: string;
  description: string;
}

interface JobFormErrors {
  jobTitle?: string;
  jobType?: string;
  location?: string;
  salary?: string;
  description?: string;
}

export const useJobForm = () => {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobType: '',
    location: '',
    salary: '',
    description: '',
  });

  const [errors, setErrors] = useState<JobFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error on field change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: JobFormErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Jobtitel ist erforderlich';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Beschäftigungsart ist erforderlich';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Standort ist erforderlich';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Stellenbeschreibung ist erforderlich';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Here would be the actual API call, e.g.:
      // await supabase
      //   .from('jobs')
      //   .insert({
      //     title: formData.jobTitle,
      //     job_type: formData.jobType,
      //     location: formData.location,
      //     salary_range: formData.salary,
      //     description: formData.description,
      //     status: 'Aktiv',
      //   });
      
      return Promise.resolve();
    } catch (error) {
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
  };
};
