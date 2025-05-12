
import React from 'react';
import { JobsList } from '@/components/unternehmen/jobs/JobsList';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function UnternehmenJobsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast({
          title: "Nicht angemeldet",
          description: "Bitte melden Sie sich an, um auf die Unternehmensfunktionen zugreifen zu können.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto px-4 py-6">
      <JobsList />
    </div>
  );
}
