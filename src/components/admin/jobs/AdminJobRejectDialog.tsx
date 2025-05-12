
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AdminJobRejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  jobTitle: string;
}

export const AdminJobRejectDialog: React.FC<AdminJobRejectDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    onClose();
    setReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job ablehnen</DialogTitle>
          <DialogDescription>
            Bitte geben Sie einen Grund für die Ablehnung an
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="font-medium">{jobTitle}</p>
          
          <div className="mt-4">
            <Label htmlFor="rejection-reason">Ablehnungsgrund</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Bitte geben Sie einen Grund für die Ablehnung an..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="bg-red-600 hover:bg-red-700"
            disabled={!reason.trim()}
          >
            Ablehnen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
