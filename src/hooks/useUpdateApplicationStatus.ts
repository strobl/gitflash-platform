
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UpdateApplicationStatusOptions {
  applicationId: string;
  currentVersion: number;
  newStatus: string;
  notes?: string;
}

export function useUpdateApplicationStatus() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const updateStatus = async ({ 
    applicationId, 
    currentVersion, 
    newStatus, 
    notes 
  }: UpdateApplicationStatusOptions) => {
    try {
      setUpdating(true);
      setError(null);
      
      // Optimistic locking with version
      const { data, error: updateError } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          // Version will be incremented by the trigger
        })
        .eq('id', applicationId)
        .eq('version', currentVersion) // Ensure we're updating the version we expect
        .select('id, status, version');
        
      if (updateError) throw new Error(updateError.message);
      
      if (!data || data.length === 0) {
        throw new Error('Optimistic lock failed. The application was updated by another user. Please refresh and try again.');
      }
      
      toast({
        title: 'Status geändert',
        description: `Bewerbungsstatus erfolgreich zu "${newStatus}" geändert.`,
        variant: 'default',
      });
      
      return data[0];
    } catch (err) {
      console.error('Error updating application status:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating the application');
      
      toast({
        title: 'Fehler',
        description: err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setUpdating(false);
    }
  };
  
  return {
    updateStatus,
    updating,
    error
  };
}
