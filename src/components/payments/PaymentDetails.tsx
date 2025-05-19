
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePayments } from '@/hooks/usePayments';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, RefreshCcw, Receipt } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentDetailsProps {
  paymentId: string;
  status: string;
  jobTitle: string;
  amount: number;
  currency: string;
  onStatusChange?: (newStatus: string) => void;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  paymentId,
  status,
  jobTitle,
  amount,
  currency,
  onStatusChange
}) => {
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { retryPayment, requestRefund, isLoadingPayments } = usePayments();
  const [error, setError] = useState<string | null>(null);

  const formatAmount = (amount: number, currency: string) => {
    return (amount / 100).toLocaleString('de-DE', {
      style: 'currency',
      currency: currency,
    });
  };

  const handleRetryPayment = async () => {
    setError(null);
    const success = await retryPayment(paymentId);
    if (success && onStatusChange) {
      onStatusChange('pending');
    }
  };

  const handleRefundSubmit = async () => {
    if (!refundReason.trim()) {
      setError('Bitte geben Sie einen Grund für die Erstattung an');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    const success = await requestRefund(paymentId, refundReason);
    setIsSubmitting(false);
    
    if (success) {
      setIsRefundDialogOpen(false);
      if (onStatusChange) {
        onStatusChange('refund_requested');
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{jobTitle}</h3>
          <p className="text-muted-foreground text-sm">Zahlung ID: {paymentId}</p>
        </div>
        <div className="text-right">
          <div className="font-bold">{formatAmount(amount, currency)}</div>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {status === 'failed' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetryPayment} 
            disabled={isLoadingPayments}
          >
            {isLoadingPayments ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Zahlung wiederholen
          </Button>
        )}

        {status === 'succeeded' && (
          <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Erstattung anfordern
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Erstattung anfordern</DialogTitle>
                <DialogDescription>
                  Bitte geben Sie einen Grund für die Erstattungsanfrage an.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Textarea
                  placeholder="Grund für die Erstattung"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleRefundSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Anfrage senden'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'succeeded':
      return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Erfolgreich</span>;
    case 'pending':
      return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">In Bearbeitung</span>;
    case 'failed':
      return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Fehlgeschlagen</span>;
    case 'refund_requested':
      return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Erstattung beantragt</span>;
    case 'refunded':
      return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Erstattet</span>;
    default:
      return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{status}</span>;
  }
};
