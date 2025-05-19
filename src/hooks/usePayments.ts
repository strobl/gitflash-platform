
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Payment {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
  job_id: string;
}

interface UsePaymentsReturn {
  isLoadingPayments: boolean;
  retryPayment: (paymentId: string) => Promise<boolean>;
  requestRefund: (paymentId: string, reason: string) => Promise<boolean>;
  checkPaymentStatus: (paymentId: string) => Promise<string>;
}

export const usePayments = (): UsePaymentsReturn => {
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);

  const retryPayment = async (paymentId: string): Promise<boolean> => {
    try {
      setIsLoadingPayments(true);
      
      // Get the payment information
      const { data: payment, error: fetchError } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Create a new payment session for this job
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: { jobId: payment.job_id }
      });
      
      if (error) throw error;
      
      // Redirect to the Stripe checkout
      window.location.href = data.url;
      
      return true;
    } catch (error) {
      console.error('Error retrying payment:', error);
      toast.error('Fehler beim erneuten Zahlungsversuch');
      return false;
    } finally {
      setIsLoadingPayments(false);
    }
  };
  
  const requestRefund = async (paymentId: string, reason: string): Promise<boolean> => {
    try {
      setIsLoadingPayments(true);
      
      const { error } = await supabase.functions.invoke('request-refund', {
        body: { 
          paymentId,
          reason
        }
      });
      
      if (error) throw error;
      
      toast.success('Erstattungsanfrage wurde gesendet');
      return true;
    } catch (error) {
      console.error('Error requesting refund:', error);
      toast.error('Fehler bei der Erstattungsanfrage');
      return false;
    } finally {
      setIsLoadingPayments(false);
    }
  };
  
  const checkPaymentStatus = async (paymentId: string): Promise<string> => {
    try {
      setIsLoadingPayments(true);
      
      const { data, error } = await supabase
        .from('payments')
        .select('status')
        .eq('id', paymentId)
        .single();
      
      if (error) throw error;
      
      return data.status;
    } catch (error) {
      console.error('Error checking payment status:', error);
      toast.error('Fehler beim Abrufen des Zahlungsstatus');
      return 'unknown';
    } finally {
      setIsLoadingPayments(false);
    }
  };
  
  return {
    isLoadingPayments,
    retryPayment,
    requestRefund,
    checkPaymentStatus
  };
};
